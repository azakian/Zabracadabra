import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BasketStore } from '../../data/basket.store';

@Component({
  selector: 'app-basket-button',
  imports: [RouterLink],
  templateUrl: './basket-button.html',
  styleUrl: './basket-button.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasketButton {
  readonly basketStore = inject(BasketStore);
}
