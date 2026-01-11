import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../../../../environments/environment';
import { BoardGame } from '../../../models/board-game';

export type BoardGameDetail = BoardGame & { video_id?: string };

@Injectable({ providedIn: 'root' })
export class BoardGameDetailService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.supabase.url}/rest/v1/board_games`;
  private readonly headers = new HttpHeaders({
    apikey: environment.supabase.anonKey,
    Authorization: `Bearer ${environment.supabase.anonKey}`,
  });

  public getBoardGameDetail(boardGameId: number): Observable<BoardGameDetail | null> {
    const url = `${this.baseUrl}?id=eq.${boardGameId}&select=*`;

    return this.http.get<BoardGame[]>(url, { headers: this.headers }).pipe(
      map((games) => {
        if (!games.length) return null;
        const boardGame = games[0];
        return boardGame;
      }),
    );
  }
}
