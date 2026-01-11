import { HexTile } from './hex-tile.model';

export interface Hint {
  id: number;
  text: string;
  isHidden: boolean;
}

export interface Enigma {
  question: string;
  hintOnWrong: string;
}

export interface CryptidPuzzleConfig {
  map: HexTile[];
  hints: Hint[];
  enigma: Enigma;
}
