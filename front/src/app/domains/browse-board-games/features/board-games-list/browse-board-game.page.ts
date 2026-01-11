import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { BoardGameStore } from '../../data/board-game.store';
import { BasketButton } from '../basket/ui/basket-button/basket-button';
import { IBoardGameService } from './services/board-game.interface';
import { BoardGameService } from './services/board-game.service';
import { BoardGameTable } from './ui/board-game-table/board-game-table';
import { Pager } from './ui/pager/pager';
import { Ranking } from './ui/ranking/ranking';

@Component({
  selector: 'app-browse-board-game',
  imports: [BoardGameTable, Pager, FormsModule, BasketButton, Ranking, RouterLink],
  templateUrl: './browse-board-game.page.html',
  styleUrl: './browse-board-game.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: IBoardGameService, useClass: BoardGameService }, BoardGameStore],
})
export class BrowseBoardGamePage {
  readonly store = inject(BoardGameStore);
}
