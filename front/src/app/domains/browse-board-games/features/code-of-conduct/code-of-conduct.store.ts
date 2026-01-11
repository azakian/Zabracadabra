import { inject, Injectable, signal } from '@angular/core';
import { map, take, tap } from 'rxjs';
import { ANSWER_CODE } from '../../service/answer';
import { AnswerService } from '../../service/answer.service';

@Injectable()
export class CodeOfConductStore {
  private readonly _state = signal<{ isValid: boolean; message: string } | null>(null);
  readonly state = this._state.asReadonly();

  readonly answerService = inject(AnswerService);

  public tryAnswer(answer: string): void {
    this.answerService
      .checkAnswer(ANSWER_CODE.CODE_OF_CONDUCT, answer)
      .pipe(
        take(1),
        map((result) => {
          const message = result.is_valid
            ? `Merci pour votre honneur : Réponse ${result.response}`
            : result.hint || 'As tu bien lu ?';
          return { isValid: result.is_valid, message: message };
        }),
        tap((res) => this._state.set(res)),
      )
      .subscribe();
  }

  private checkCodeOfConductAcceptance = (answer: string): boolean => {
    const encoded = btoa(answer);
    return encoded === 'cmVwYWlyZQ==';
  };
}
