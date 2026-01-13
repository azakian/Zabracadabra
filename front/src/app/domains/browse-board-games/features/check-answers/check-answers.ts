import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ANSWER_CODE, AnswerResult } from '../../service/answer';
import { AnswerService } from '../../service/answer.service';

interface AnswerCheck {
  code: string;
  label: string;
  userAnswer: string;
  result: AnswerResult | null;
  loading: boolean;
}

@Component({
  selector: 'app-check-answers',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, RouterLink],
  templateUrl: './check-answers.html',
  styleUrl: './check-answers.scss',
})
export class CheckAnswers {
  private readonly answerService = inject(AnswerService);

  readonly answers = signal<AnswerCheck[]>([
    {
      code: ANSWER_CODE.NANTES,
      label: 'Réponse 1',
      userAnswer: '',
      result: null,
      loading: false,
    },
    {
      code: ANSWER_CODE.GR20,
      label: 'Réponse  2',
      userAnswer: '',
      result: null,
      loading: false,
    },
  ]);

  updateAnswer(code: string, value: string): void {
    this.answers.update((answers) =>
      answers.map((a) => (a.code === code ? { ...a, userAnswer: value, result: null } : a)),
    );
  }

  checkAnswer(code: string): void {
    const answer = this.answers().find((a) => a.code === code);
    if (!answer || !answer.userAnswer) return;

    this.answers.update((answers) =>
      answers.map((a) => (a.code === code ? { ...a, loading: true } : a)),
    );

    this.answerService.checkAnswer(code, answer.userAnswer).subscribe({
      next: (result) => {
        this.answers.update((answers) =>
          answers.map((a) => (a.code === code ? { ...a, result, loading: false } : a)),
        );
      },
      error: () => {
        this.answers.update((answers) =>
          answers.map((a) =>
            a.code === code
              ? {
                  ...a,
                  result: { is_valid: false, hint: 'Erreur de connexion', response: null },
                  loading: false,
                }
              : a,
          ),
        );
      },
    });
  }
}
