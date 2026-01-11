import { computed, inject, Injectable, signal } from '@angular/core';
import { take, tap } from 'rxjs';
import { ANSWER_CODE } from '../../../../../service/answer';
import { AnswerService } from '../../../../../service/answer.service';
import { CRYPTID_PUZZLE_CONFIG } from '../cryptid-puzzle.constants';
import { HexCoordinate } from '../model/hex-tile.model';
import { Hint } from '../model/puzzle-config.model';

export type PuzzleStatus = 'playing' | 'won' | 'lost';

@Injectable()
export class CryptidPuzzleStore {
  private readonly MAX_ATTEMPTS = 3;
  readonly #answerService = inject(AnswerService);

  // State
  private readonly _wrongGuesses = signal<HexCoordinate[]>([]);
  private readonly _hiddenHintRevealed = signal(false);
  private readonly _status = signal<PuzzleStatus>('playing');
  private readonly _hints = signal<Hint[]>(CRYPTID_PUZZLE_CONFIG.hints);

  // Public selectors
  readonly wrongGuesses = this._wrongGuesses.asReadonly();
  readonly hiddenHintRevealed = this._hiddenHintRevealed.asReadonly();
  readonly status = this._status.asReadonly();
  readonly hints = this._hints.asReadonly();

  readonly attemptsRemaining = computed(() => this.MAX_ATTEMPTS - this._wrongGuesses().length);

  readonly isGameOver = computed(() => this._status() === 'won' || this._status() === 'lost');

  readonly solution = signal<HexCoordinate | null>(null);
  readonly response = signal<string | null>(null);
  /**
   * Make a guess at the cryptid's location
   */
  makeGuess(coordinate: HexCoordinate) {
    if (this.isGameOver()) {
      return;
    }

    this.#answerService
      .checkAnswer(ANSWER_CODE.CRYPTID, `${coordinate.row}${coordinate.col}`)
      .pipe(
        take(1),
        tap((response) => {
          if (response.is_valid) {
            this._status.set('won');
            this.solution.set(coordinate);
            this.response.set(response.response);
            return;
          }
          this._wrongGuesses.update((guesses) => [...guesses, coordinate]);

          if (this._wrongGuesses().length >= this.MAX_ATTEMPTS) {
            this._status.set('lost');
          }
        }),
      )
      .subscribe();
  }

  /**
   * Reveal the hidden hint (after solving enigma)
   */
  revealHiddenHint(): void {
    this._hiddenHintRevealed.set(true);
  }

  /**
   * Reset the puzzle to initial state
   */
  reset(): void {
    this._wrongGuesses.set([]);
    this._hiddenHintRevealed.set(false);
    this._status.set('playing');
  }
}
