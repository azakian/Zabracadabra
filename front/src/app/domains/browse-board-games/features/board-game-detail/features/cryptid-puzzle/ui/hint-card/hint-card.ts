import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Hint } from '../../model/puzzle-config.model';

@Component({
  selector: 'app-hint-card',
  standalone: true,
  templateUrl: './hint-card.html',
  styleUrl: './hint-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HintCard {
  readonly hint = input.required<Hint>();
  readonly isRevealed = input<boolean>(false);

  readonly unlockRequested = output<void>();

  onUnlockClick(): void {
    this.unlockRequested.emit();
  }
}
