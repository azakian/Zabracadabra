import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginatedResult } from '../../../../../shared/pagination/models/paginated-result';
import { BoardGame } from '../../../models/board-game';
import { BoardGameQuery } from './board-game-query';

@Injectable()
export abstract class IBoardGameService {
  abstract fetchBoardGames(query: BoardGameQuery): Observable<PaginatedResult<BoardGame>>;
  abstract getTopBoardGames(): Observable<BoardGame[]>;
}
