import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ImageService } from '../../service/images.service';
import { BasketStore } from './data/basket.store';
import { PromotionStore } from './data/promotion.store';
import { IPromotionService } from './services/promotion.interface';
import { PromotionService } from './services/promotion.service';
import { PaymentModal } from './ui/payment-modal/payment-modal';
import { PromoCodeStatus } from './ui/promo-code-status/promo-code-status';

@Component({
  selector: 'app-basket',
  imports: [RouterLink, FormsModule, PromoCodeStatus, PaymentModal],
  templateUrl: './basket.html',
  styleUrl: './basket.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: IPromotionService, useClass: PromotionService }, PromotionStore],
})
export class Basket {
  readonly basketStore = inject(BasketStore);
  readonly promotionStore = inject(PromotionStore);
  readonly imageService = inject(ImageService);

  readonly #location = inject(Location);

  readonly promoCode = signal('');
  readonly showPaymentModal = signal(false);

  public goBack(): void {
    this.#location.back();
  }

  public applyPromoCode(): void {
    const code = this.promoCode();
    if (!code.trim()) {
      return;
    }

    this.promotionStore.getPromotion(code, () => this.basketStore.addPromoBoardGame());
  }

  public openPaymentModal(): void {
    this.showPaymentModal.set(true);
  }

  public closePaymentModal(): void {
    this.showPaymentModal.set(false);
  }

  public onPaymentConfirmed(cardNumber: string): void {
    this.showPaymentModal.set(false);
    this.basketStore.tryPayment(cardNumber);
  }
}
