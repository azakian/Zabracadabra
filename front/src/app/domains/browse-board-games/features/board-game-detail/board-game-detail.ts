import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { of } from 'rxjs';
import { injectRouteParam } from '../../../../shared/route-params/route-params';
import { BasketStore } from '../basket/data/basket.store';
import { BasketButton } from '../basket/ui/basket-button/basket-button';
import { CryptidPuzzle } from './features/cryptid-puzzle/cryptid-puzzle';
import { CategoryLabelPipe } from './pipes/category-label.pipe';
import { BoardGameDetailService } from './service/board-game-detail.service';

@Component({
  selector: 'app-board-game-detail',
  imports: [RouterLink, CategoryLabelPipe, BasketButton, CryptidPuzzle, CurrencyPipe],
  styleUrl: './board-game-detail.scss',
  templateUrl: './board-game-detail.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardGameDetail {
  readonly boardGameId = injectRouteParam<number>('id', Number);
  readonly #boardGameDetailService = inject(BoardGameDetailService);
  readonly #sanitizer = inject(DomSanitizer);
  readonly basketStore = inject(BasketStore);

  readonly boardGameDetail = rxResource({
    params: () => ({ id: this.boardGameId() }),
    stream: ({ params }) =>
      params.id ? this.#boardGameDetailService.getBoardGameDetail(params.id) : of(null),
  });

  readonly safeYoutubeUrl = computed(() => {
    return this.#sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube.com/embed/${this.boardGameDetail.value()?.video_id}`,
    );
  });
}
