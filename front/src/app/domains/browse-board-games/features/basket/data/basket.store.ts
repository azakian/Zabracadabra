import { computed, inject, Injectable, signal } from '@angular/core';
import { take, tap } from 'rxjs';
import { BoardGame } from '../../../models/board-game';
import { ANSWER_CODE, AnswerResult } from '../../../service/answer';
import { AnswerService } from '../../../service/answer.service';
import { BoardGameDetailService } from '../../board-game-detail/service/board-game-detail.service';

export interface BasketItem {
  game: BoardGame;
  quantity: number;
}

@Injectable({ providedIn: 'root' })
export class BasketStore {
  readonly #detailService = inject(BoardGameDetailService);
  readonly #answerService = inject(AnswerService);

  private readonly items = signal<Record<number, BasketItem>>({});
  readonly basketItems = computed(() => Object.values(this.items()));

  readonly totalItems = computed(() => Object.keys(this.items()).length);

  readonly isEmpty = computed(() => Object.keys(this.items()).length === 0);

  readonly paymentResult = signal<AnswerResult | null>(null);

  public getItemQuantity(gameId: number): number {
    return this.items()[gameId]?.quantity ?? 0;
  }

  public hasItem(gameId: number): boolean {
    return gameId in this.items();
  }

  public addItem(game: BoardGame, quantity = 1): void {
    this.items.update((items) => {
      const existingItem = items[game.id];

      if (existingItem) {
        return {
          ...items,
          [game.id]: { ...existingItem, quantity: existingItem.quantity + quantity },
        };
      }

      return { ...items, [game.id]: { game, quantity } };
    });
  }

  public removeItem(gameId: number): void {
    this.items.update((items) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [gameId]: _, ...rest } = items;
      return rest;
    });
  }

  public removeGameId(gameId: number): void {
    const quantityUpdated = this.getItemQuantity(gameId) - 1;
    this.#updateQuantity(gameId, quantityUpdated);
  }

  public addGameId(gameId: number): void {
    const quantityUpdated = this.getItemQuantity(gameId) + 1;
    this.#updateQuantity(gameId, quantityUpdated);
  }

  clearBasket(): void {
    this.items.set({});
  }

  #updateQuantity(gameId: number, quantity: number): void {
    this.items.update((items) => {
      const existingItem = items[gameId];
      if (!existingItem) return items;

      return { ...items, [gameId]: { ...existingItem, quantity } };
    });
  }

  public tryPayment(cardNumber: string): void {
    this.paymentResult.set(null);
    this.#answerService
      .checkAnswer(ANSWER_CODE.FINAL_ANSWER, cardNumber)
      .pipe(
        take(1),
        tap((response) => {
          this.paymentResult.set(response);
          if (response.is_valid) {
            this.clearBasket();
          }
        }),
      )
      .subscribe();
  }

  public clearPaymentResult(): void {
    this.paymentResult.set(null);
  }

  public addPromoBoardGame() {
    if (this.hasItem(102)) {
      return;
    }

    this.#detailService
      .getBoardGameDetail(102)
      .pipe(
        take(1),
        tap((game) => {
          return this.addItem({ ...game } as BoardGame);
        }),
      )
      .subscribe();
  }
}
