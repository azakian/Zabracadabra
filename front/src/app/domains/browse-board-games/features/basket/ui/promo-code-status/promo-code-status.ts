import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Promotion } from '../../model/promotion';

@Component({
  selector: 'app-promo-code-status',
  templateUrl: './promo-code-status.html',
  styleUrl: './promo-code-status.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PromoCodeStatus {
  readonly promotion = input<Promotion | null>(null);
}
