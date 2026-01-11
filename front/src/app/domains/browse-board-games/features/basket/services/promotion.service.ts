import { inject } from '@angular/core';
import { map, Observable, take } from 'rxjs';
import { ANSWER_CODE } from '../../../service/answer';
import { AnswerService } from '../../../service/answer.service';
import { Promotion } from '../model/promotion';
import { IPromotionService } from './promotion.interface';

export class PromotionService implements IPromotionService {
  readonly answerService = inject(AnswerService);

  applyPromotion(code: string): Observable<Promotion> {
    return this.answerService.checkAnswer(ANSWER_CODE.PROMO, code).pipe(
      take(1),
      map((result) => {
        return {
          isValid: result.is_valid,
          bonus: result.is_valid ? 10 : 0,
          hint: result.is_valid ? result.response! : result.hint! || '',
        };
      }),
    );
  }
}
