import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../../../../environments/environment';
import { PaginatedResult } from '../../../../../shared/pagination/models/paginated-result';
import { BoardGame } from '../../../models/board-game';
import { BoardGameQuery } from './board-game-query';
import { IBoardGameService } from './board-game.interface';

export class BoardGameService implements IBoardGameService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.supabase.url}/rest/v1/board_games`;
  private readonly headers = new HttpHeaders({
    apikey: environment.supabase.anonKey,
    Authorization: `Bearer ${environment.supabase.anonKey}`,
  });

  private readonly UNKNOWN_GAME: BoardGame = {
    id: 9999,
    name: '???',
    description: '',
    categories: [],
    explanation: '',
    price: 0,
  };

  getTopBoardGames(): Observable<BoardGame[]> {
    const url = `${this.baseUrl}?select=*&limit=4&order=id`;
    return this.http
      .get<BoardGame[]>(url, { headers: this.headers })
      .pipe(map((games) => [this.UNKNOWN_GAME, ...games]));
  }

  fetchBoardGames(query: BoardGameQuery): Observable<PaginatedResult<BoardGame>> {
    const params = this.buildQueryParams(query);
    const url = `${this.baseUrl}?${params}`;

    return this.http
      .get<BoardGame[]>(url, {
        headers: this.headers.set('Prefer', 'count=exact'),
        observe: 'response',
      })
      .pipe(
        map((response) => {
          const contentRange = response.headers.get('Content-Range');
          const totalCount = contentRange ? parseInt(contentRange.split('/')[1], 10) : 0;
          const totalPages = Math.ceil(totalCount / query.limit);
          const data = response.body || [];

          return {
            data,
            meta: {
              page: query.page,
              limit: query.limit,
              totalCount,
              aggregatedCount: Math.min(query.page * query.limit, totalCount),
              prev: query.page > 1 ? query.page - 1 : undefined,
              next: query.page < totalPages ? query.page + 1 : undefined,
            },
          };
        }),
      );
  }

  private buildQueryParams(query: BoardGameQuery): string {
    const params: string[] = ['select=*'];

    // Pagination (PostgREST uses offset/limit)
    const offset = (query.page - 1) * query.limit;
    params.push(`offset=${offset}`);
    params.push(`limit=${query.limit}`);

    // Sorting
    if (query.sort) {
      const direction = query.sort.direction === 'desc' ? '.desc' : '.asc';
      params.push(`order=${query.sort.field}${direction}`);
    } else {
      params.push('order=name.asc');
    }

    // Clue search (searches name OR description)
    if (query.clue) {
      const clue = encodeURIComponent(query.clue);
      params.push(`or=(name.ilike.*${clue}*,description.ilike.*${clue}*)`);
    }

    // Filters
    if (query.filter) {
      if (query.filter.name) {
        params.push(`name=ilike.*${encodeURIComponent(query.filter.name)}*`);
      }
      if (query.filter.categories?.length) {
        // PostgREST: categories contains any of the selected (overlap operator)
        const cats = query.filter.categories.join(',');
        params.push(`categories=ov.{${cats}}`);
      }
    }

    return params.join('&');
  }
}
