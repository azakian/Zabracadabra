import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Promotion } from '../model/promotion';

@Injectable()
export abstract class IPromotionService {
  abstract applyPromotion(code: string): Observable<Promotion>;
}
