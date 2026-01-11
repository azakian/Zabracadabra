import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { GRID_COLS, GRID_ROWS } from '../../cryptid-puzzle.constants';
import {
  ANIMAL_COLORS,
  ANIMAL_LABELS,
  AnimalTerritory,
  HexCoordinate,
  HexTile,
  TERRAIN_COLORS,
  TERRAIN_LABELS,
} from '../../model/hex-tile.model';

@Component({
  selector: 'app-hex-map',
  standalone: true,
  templateUrl: './hex-map.html',
  styleUrl: './hex-map.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HexMap {
  readonly tiles = input.required<HexTile[]>();
  readonly wrongGuesses = input<HexCoordinate[]>([]);
  readonly isDisabled = input<boolean>(false);
  readonly solution = input<HexCoordinate | null>(null);

  readonly hexClicked = output<HexCoordinate>();

  // Hex geometry constants - size for 9x12 grid (3 rows × 4 cols of 3×3 map parts)
  readonly hexSize = 25;
  readonly hexWidth = computed(() => this.hexSize * 2);
  readonly hexHeight = computed(() => Math.sqrt(3) * this.hexSize);

  // SVG viewBox dimensions
  readonly svgWidth = computed(() => {
    const horizSpacing = this.hexSize * 1.5;
    return horizSpacing * GRID_COLS + this.hexSize + 20;
  });

  readonly svgHeight = computed(() => {
    return this.hexHeight() * GRID_ROWS + this.hexHeight() / 2 + 20;
  });

  /**
   * Calculate the center position of a hex tile
   */
  getHexCenter(tile: HexTile): { x: number; y: number } {
    const { row, col } = tile.coordinate;
    const horizSpacing = this.hexSize * 1.5;
    const vertSpacing = this.hexHeight();

    // Offset for odd columns (pointy-top hex grid)
    const yOffset = col % 2 === 1 ? vertSpacing / 2 : 0;

    return {
      x: col * horizSpacing + this.hexSize + 10,
      y: row * vertSpacing + this.hexHeight() / 2 + yOffset + 10,
    };
  }

  /**
   * Generate the points for a pointy-top hexagon
   */
  getHexPoints(centerX: number, centerY: number): string {
    const points: string[] = [];
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i - Math.PI / 6;
      const x = centerX + this.hexSize * Math.cos(angle);
      const y = centerY + this.hexSize * Math.sin(angle);
      points.push(`${x},${y}`);
    }
    return points.join(' ');
  }

  /**
   * Get the fill color for a terrain type
   */
  getTerrainColor(terrain: HexTile['terrain']): string {
    return TERRAIN_COLORS[terrain];
  }

  /**
   * Get the label for a terrain type
   */
  getTerrainLabel(terrain: HexTile['terrain']): string {
    return TERRAIN_LABELS[terrain];
  }

  /**
   * Check if a tile was a wrong guess
   */
  isWrongGuess(tile: HexTile): boolean {
    return this.wrongGuesses().some(
      (g) => g.row === tile.coordinate.row && g.col === tile.coordinate.col,
    );
  }

  /**
   * Check if a tile is the revealed solution
   */
  isSolution(tile: HexTile): boolean {
    const sol = this.solution();
    return sol !== null && sol.row === tile.coordinate.row && sol.col === tile.coordinate.col;
  }

  /**
   * Handle click on a hex tile
   */
  onHexClick(tile: HexTile): void {
    if (!this.isDisabled() && !this.isWrongGuess(tile)) {
      this.hexClicked.emit(tile.coordinate);
    }
  }

  /**
   * Get structure icon position offset
   */
  getStructureIcon(structure: 'standing-stone' | 'abandoned-shack'): string {
    return structure === 'standing-stone' ? '🗿' : '🏚️';
  }

  /**
   * Get animal territory color for border
   */
  getAnimalColor(animal: AnimalTerritory): string {
    return ANIMAL_COLORS[animal];
  }

  /**
   * Get animal territory label
   */
  getAnimalLabel(animal: AnimalTerritory): string {
    return ANIMAL_LABELS[animal];
  }
}
