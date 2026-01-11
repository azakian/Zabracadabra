import { computed, inject, Injectable, signal } from '@angular/core';
import { take, tap } from 'rxjs';
import { Promotion } from '../model/promotion';
import { IPromotionService } from '../services/promotion.interface';

@Injectable()
export class PromotionStore {
  private readonly _promotion = signal<Promotion | null>(null);
  private readonly promotionService = inject(IPromotionService);

  public readonly promotion = this._promotion.asReadonly();

  public readonly isPromoCodeInvalid = computed(() => {
    const promotion = this.promotion();
    return promotion !== null && !promotion.isValid;
  });

  public readonly isPromoCodeValid = computed(() => {
    const promotion = this.promotion();
    return promotion !== null && promotion.isValid;
  });

  public getPromotion(code: string, successCallback: () => void): void {
    this.promotionService
      .applyPromotion(code)
      .pipe(
        take(1),
        tap((promotion) => this._setPromotion(promotion)),
        tap((promotion) => {
          if (promotion.isValid) {
            successCallback();
          }
        }),
      )
      .subscribe();
  }

  private _setPromotion(promotion: Promotion): void {
    this._promotion.set(promotion);
  }
}
