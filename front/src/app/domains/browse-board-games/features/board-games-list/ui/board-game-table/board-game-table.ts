import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { BoardGame } from '../../../../models/board-game';
import { CategoryLabelPipe } from '../../../board-game-detail/pipes/category-label.pipe';

@Component({
  selector: 'app-board-game-table',
  imports: [CurrencyPipe, CategoryLabelPipe],
  styleUrl: './board-game-table.scss',
  templateUrl: './board-game-table.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardGameTable {
  public readonly boardGames = input.required<BoardGame[]>();
  public readonly selectGame = output<BoardGame>();
}
