import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BoardGame } from '../../../../models/board-game';
import { CategoryLabelPipe } from '../../../board-game-detail/pipes/category-label.pipe';

@Component({
  selector: 'app-ranking',
  imports: [RouterLink, CategoryLabelPipe],
  templateUrl: './ranking.html',
  styleUrl: './ranking.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Ranking {
  readonly topGames = input<BoardGame[]>([]);
}
