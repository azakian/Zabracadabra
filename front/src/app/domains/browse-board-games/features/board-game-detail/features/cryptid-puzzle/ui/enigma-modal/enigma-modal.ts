import { ChangeDetectionStrategy, Component, inject, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { take, tap } from 'rxjs';
import { ANSWER_CODE } from '../../../../../../service/answer';
import { AnswerService } from '../../../../../../service/answer.service';
import { Enigma } from '../../model/puzzle-config.model';

@Component({
  selector: 'app-enigma-modal',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './enigma-modal.html',
  styleUrl: './enigma-modal.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EnigmaModal {
  private readonly answerService = inject(AnswerService);

  readonly enigma = input.required<Enigma>();
  readonly isOpen = input<boolean>(false);

  readonly solved = output<void>();
  readonly closed = output<void>();

  readonly userAnswer = signal('');
  readonly showHint = signal(false);
  readonly isWrong = signal(false);

  onSubmit(): void {
    const answer = this.userAnswer().trim().toLowerCase();

    this.answerService
      .checkAnswer(ANSWER_CODE.CRYPTID_HINT, answer)
      .pipe(
        take(1),
        tap((response) => {
          if (response.is_valid) {
            this.solved.emit();
            this.resetState();
          } else {
            this.isWrong.set(true);
            this.showHint.set(true);
            setTimeout(() => this.isWrong.set(false), 500);
          }
        }),
      )
      .subscribe();
  }

  onClose(): void {
    this.closed.emit();
    this.resetState();
  }

  onBackdropClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('modal-backdrop')) {
      this.onClose();
    }
  }

  private resetState(): void {
    this.userAnswer.set('');
    this.showHint.set(false);
    this.isWrong.set(false);
  }
}
