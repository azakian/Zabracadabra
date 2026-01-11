import { inject, Injectable, linkedSignal, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { BoardGameQuery } from '../features/board-games-list/services/board-game-query';
import { IBoardGameService } from '../features/board-games-list/services/board-game.interface';
import { BoardGame } from '../models/board-game';

@Injectable()
export class BoardGameStore {
  readonly #boardGamesService = inject(IBoardGameService);
  readonly #router = inject(Router);
  readonly #clueSubject = new Subject<string>();

  readonly queryParams = signal<BoardGameQuery>({ page: 1, limit: 5 });
  readonly clue = linkedSignal(() => this.queryParams().clue);

  constructor() {
    this.#clueSubject.pipe(debounceTime(300), distinctUntilChanged()).subscribe((newClue) => {
      this.queryParams.update((currentQuery) => ({
        ...currentQuery,
        clue: newClue || undefined,
        page: 1,
      }));
    });
  }

  public readonly boardGamesResource = rxResource({
    params: () => ({ query: this.queryParams() }),
    stream: ({ params }) => this.#boardGamesService.fetchBoardGames(params.query),
    defaultValue: { data: [], meta: { page: 1, limit: 5, totalCount: 0, aggregatedCount: 0 } },
  });

  public readonly topBoardGamesResource = rxResource({
    stream: () => this.#boardGamesService.getTopBoardGames(),
    defaultValue: [],
  });

  public nextPage(): void {
    this.queryParams.update((currentQuery) => {
      return {
        ...currentQuery,
        page: this.boardGamesResource.value().meta.next || currentQuery.page,
      };
    });
  }
  public previousPage(): void {
    this.queryParams.update((currentQuery) => {
      return {
        ...currentQuery,
        page: this.boardGamesResource.value().meta.prev || currentQuery.page,
      };
    });
  }

  public updateClue(newClue: string): void {
    this.#clueSubject.next(newClue);
  }

  public navigateToGameDetail(game: BoardGame): void {
    this.#router.navigate(['games', game.id]);
  }
}
