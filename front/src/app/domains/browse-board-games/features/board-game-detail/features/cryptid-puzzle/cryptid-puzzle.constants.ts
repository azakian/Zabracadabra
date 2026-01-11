import { HexTile, TerrainType } from './model/hex-tile.model';
import { CryptidPuzzleConfig } from './model/puzzle-config.model';

/**
 * Cryptid Puzzle Configuration
 *
 * REAL GAME MAP STRUCTURE:
 * The game uses 6 modular map parts (each 3 rows × 12 cols), arranged in 3 rows:
 *
 *   ┌─────────────────────────────────────────┐
 *   │              Part 1                     │   rows 0-2, cols 0-11
 *   │              (3×12)                     │
 *   ├─────────────────────────────────────────┤
 *   │              Part 2                     │   rows 3-5, cols 0-11
 *   │              (3×12)                     │
 *   ├─────────────────────────────────────────┤
 *   │              Part 3                     │   rows 6-8, cols 0-11
 *   │              (3×12)                     │
 *   └─────────────────────────────────────────┘
 *
 * Total grid: 9 rows × 12 columns = 108 hexes
 *
 * TERRAINS:
 * - forest: Forêt (vert foncé)
 * - water: Eau (bleu)
 * - desert: Désert (jaune)
 * - swamp: Marais (violet)
 * - mountain: Montagne (gris)
 *
 * STRUCTURES (optional):
 * - standing-stone: Pierre levée
 * - abandoned-shack: Cabane abandonnée
 *
 * ANIMAL TERRITORIES (optional):
 * - bear: Territoire de l'ours (noir)
 * - cougar: Territoire du puma (orange)
 */

/**
 * Grid dimensions (for rendering)
 * 6 map parts: each 3 rows × 12 cols
 * Arranged as 1 wide × 3 tall
 * Total: 9 rows × 12 columns
 */
export const GRID_ROWS = 9;
export const GRID_COLS = 12;

// Helper to create a hex tile
const hex = (
  row: number,
  col: number,
  terrain: TerrainType,
  hasStructure?: 'standing-stone' | 'abandoned-shack',
  animalTerritory?: 'bear' | 'cougar',
): HexTile => ({
  coordinate: { row, col },
  terrain,
  hasStructure,
  animalTerritory,
});

/**
 * MAP PART 1 (top): rows 0-2, cols 0-11
 */
const MAP_PART_1: HexTile[] = [
  // Row 0
  hex(0, 0, 'desert', undefined, 'bear'),
  hex(0, 1, 'desert'),
  hex(0, 2, 'swamp'),
  hex(0, 3, 'swamp'),
  hex(0, 4, 'swamp'),
  hex(0, 5, 'forest'),

  // Row 1
  hex(1, 0, 'mountain', undefined, 'bear'),
  hex(1, 1, 'mountain'),
  hex(1, 2, 'swamp'),
  hex(1, 3, 'swamp'),
  hex(1, 4, 'forest'),
  hex(1, 5, 'forest'),
  // Row 2
  hex(2, 0, 'mountain', 'abandoned-shack'),
  hex(2, 1, 'water'),
  hex(2, 2, 'water'),
  hex(2, 3, 'water'),
  hex(2, 4, 'water'),
  hex(2, 5, 'forest'),
];

/**
 * MAP PART 2 (middle): rows 3-5, cols 0-11
 */
const MAP_PART_2: HexTile[] = [
  // Row 3
  hex(3, 0, 'water', undefined, 'bear'),
  hex(3, 1, 'water', undefined, 'bear'),
  hex(3, 2, 'water'),
  hex(3, 3, 'water'),
  hex(3, 4, 'desert', 'abandoned-shack'),
  hex(3, 5, 'desert'),

  // Row 4
  hex(4, 0, 'mountain', undefined, 'bear'),
  hex(4, 1, 'mountain'),
  hex(4, 2, 'water'),
  hex(4, 3, 'desert'),
  hex(4, 4, 'desert'),
  hex(4, 5, 'swamp'),

  // Row 5
  hex(5, 0, 'mountain'),
  hex(5, 1, 'mountain'),
  hex(5, 2, 'mountain'),
  hex(5, 3, 'swamp'),
  hex(5, 4, 'swamp'),
  hex(5, 5, 'swamp'),
];

/**
 * MAP PART 3 (bottom): rows 6-8, cols 0-11
 */
const MAP_PART_3: HexTile[] = [
  // Row 6
  hex(6, 0, 'swamp', undefined, 'cougar'),
  hex(6, 1, 'forest', undefined, 'cougar'),
  hex(6, 2, 'forest', undefined, 'cougar'),
  hex(6, 3, 'forest'),
  hex(6, 4, 'forest'),
  hex(6, 5, 'forest'),

  // Row 7
  hex(7, 0, 'swamp'),
  hex(7, 1, 'swamp', 'standing-stone'),
  hex(7, 2, 'forest'),
  hex(7, 3, 'desert'),
  hex(7, 4, 'desert'),
  hex(7, 5, 'desert'),
  // Row 8
  hex(8, 0, 'swamp'),
  hex(8, 1, 'mountain'),
  hex(8, 2, 'mountain'),
  hex(8, 3, 'mountain'),
  hex(8, 4, 'mountain'),
  hex(8, 5, 'desert'),
];

/**
 * MAP PART 4 (top-right): rows 0-2, cols 6-11
 */
const MAP_PART_4: HexTile[] = [
  // Row 0
  hex(0, 6, 'swamp'),
  hex(0, 7, 'swamp'),
  hex(0, 8, 'forest'),
  hex(0, 9, 'forest'),
  hex(0, 10, 'forest'),
  hex(0, 11, 'water'),

  // Row 1
  hex(1, 6, 'swamp', undefined, 'cougar'),
  hex(1, 7, 'swamp', undefined, 'cougar'),
  hex(1, 8, 'forest'),
  hex(1, 9, 'mountain'),
  hex(1, 10, 'water'),
  hex(1, 11, 'water'),

  // Row 2
  hex(2, 6, 'mountain', undefined, 'cougar'),
  hex(2, 7, 'mountain'),
  hex(2, 8, 'mountain'),
  hex(2, 9, 'mountain'),
  hex(2, 10, 'water', 'abandoned-shack'),
  hex(2, 11, 'water'),
];

/**
 * MAP PART 5 (middle-right): rows 3-5, cols 6-11
 */
const MAP_PART_5: HexTile[] = [
  // Row 3
  hex(3, 6, 'desert'),
  hex(3, 7, 'desert'),
  hex(3, 8, 'mountain'),
  hex(3, 9, 'mountain'),
  hex(3, 10, 'mountain'),
  hex(3, 11, 'mountain'),

  // Row 4
  hex(4, 6, 'desert'),
  hex(4, 7, 'desert'),
  hex(4, 8, 'mountain'),
  hex(4, 9, 'water'),
  hex(4, 10, 'water'),
  hex(4, 11, 'water'),

  // Row 5
  hex(5, 6, 'desert'),
  hex(5, 7, 'desert'),
  hex(5, 8, 'desert'),
  hex(5, 9, 'forest'),
  hex(5, 10, 'forest'),
  hex(5, 11, 'forest', 'standing-stone'),
];

/**
 * MAP PART 6 (bottom-right): rows 6-8, cols 6-11
 */
const MAP_PART_6: HexTile[] = [
  // Row 6
  hex(6, 6, 'forest', undefined, 'bear'),
  hex(6, 7, 'desert', 'standing-stone', 'bear'),
  hex(6, 8, 'desert', undefined, 'bear'),
  hex(6, 9, 'desert'),
  hex(6, 10, 'swamp'),
  hex(6, 11, 'swamp'),

  // Row 7
  hex(7, 6, 'forest'),
  hex(7, 7, 'forest'),
  hex(7, 8, 'desert'),
  hex(7, 9, 'water'),
  hex(7, 10, 'swamp'),
  hex(7, 11, 'swamp'),

  // Row 8
  hex(8, 6, 'forest'),
  hex(8, 7, 'forest'),
  hex(8, 8, 'water'),
  hex(8, 9, 'water'),
  hex(8, 10, 'water'),
  hex(8, 11, 'water'),
];

/**
 * Combined map from all 6 parts
 * Edit the individual MAP_PART arrays above to change specific sections
 */
const MAP_TILES: HexTile[] = [
  ...MAP_PART_1,
  ...MAP_PART_2,
  ...MAP_PART_3,
  ...MAP_PART_4,
  ...MAP_PART_5,
  ...MAP_PART_6,
];

/**
 * The hints for the puzzle
 * - Hints 1-3 are visible immediately
 * - Hint 4 is hidden behind the enigma
 *
 * The solution must satisfy ALL hints
 */
const HINTS = [
  {
    id: 1,
    text: 'Le Cryptide se trouve dans une Forêt ou une Montagne',
    isHidden: false,
  },
  {
    id: 2,
    text: "Le Cryptide se trouve dans, ou jusqu'à 2 cases d'une Pierre dressée",
    isHidden: false,
  },
  {
    id: 3,
    text: "Le Cryptide se trouve dans, ou jusqu'à 2 cases du territoire d'un ours",
    isHidden: false,
  },
  {
    id: 4,
    text: 'Le Cryptide se trouve dans un Marécage ou une Montagne',
    isHidden: true, // This one requires solving the enigma
  },
];

/**
 * The enigma to unlock the 4th hint
 */
const ENIGMA = {
  question: `
  2X3 - 7 <br>
  4XX5 - 31 <br>
  7XXX8 - 97 <br>
  11XL12 - 241 <br>
  ?? - ??
  `,
  hintOnWrong: 'Format attendu : réponse1 - réponse2 (la réponse1 étant celle à gauche)',
};

/**
 * Export the complete puzzle configuration
 */
export const CRYPTID_PUZZLE_CONFIG: CryptidPuzzleConfig = {
  map: MAP_TILES,
  hints: HINTS,
  enigma: ENIGMA,
};
