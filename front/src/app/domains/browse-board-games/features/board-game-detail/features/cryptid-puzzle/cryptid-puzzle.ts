import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CRYPTID_PUZZLE_CONFIG } from './cryptid-puzzle.constants';
import { CryptidPuzzleStore } from './data/cryptid-puzzle.store';
import { HexCoordinate } from './model/hex-tile.model';
import { EnigmaModal } from './ui/enigma-modal/enigma-modal';
import { HexMap } from './ui/hex-map/hex-map';
import { HintCard } from './ui/hint-card/hint-card';

@Component({
  selector: 'app-cryptid-puzzle',
  standalone: true,
  imports: [HexMap, HintCard, EnigmaModal],
  templateUrl: './cryptid-puzzle.html',
  styleUrl: './cryptid-puzzle.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CryptidPuzzleStore],
})
export class CryptidPuzzle {
  readonly store = inject(CryptidPuzzleStore);

  readonly config = CRYPTID_PUZZLE_CONFIG;
  readonly isEnigmaOpen = signal(false);

  onHexClicked(coordinate: HexCoordinate): void {
    if (!this.store.hiddenHintRevealed()) {
      alert("L'indice wesh");
      return;
    }

    this.store.makeGuess(coordinate);
  }

  openEnigma(): void {
    this.isEnigmaOpen.set(true);
  }

  closeEnigma(): void {
    this.isEnigmaOpen.set(false);
  }

  onEnigmaSolved(): void {
    this.store.revealHiddenHint();
    this.isEnigmaOpen.set(false);
  }

  resetPuzzle(): void {
    this.store.reset();
  }
}
