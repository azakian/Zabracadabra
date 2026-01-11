export type TerrainType = 'forest' | 'water' | 'desert' | 'swamp' | 'mountain';
export type AnimalTerritory = 'bear' | 'cougar';

export interface HexCoordinate {
  row: number;
  col: number;
}

export interface HexTile {
  coordinate: HexCoordinate;
  terrain: TerrainType;
  hasStructure?: 'standing-stone' | 'abandoned-shack';
  animalTerritory?: AnimalTerritory;
}

export const TERRAIN_COLORS: Record<TerrainType, string> = {
  forest: '#228B22',
  water: '#4169E1',
  desert: '#F4D03F',
  swamp: '#8B5CF6',
  mountain: '#808080',
};

export const ANIMAL_COLORS: Record<AnimalTerritory, string> = {
  bear: '#000000',
  cougar: '#D2691E',
};

export const TERRAIN_LABELS: Record<TerrainType, string> = {
  forest: 'Forêt',
  water: 'Eau',
  desert: 'Désert',
  swamp: 'Marais',
  mountain: 'Montagne',
};

export const ANIMAL_LABELS: Record<AnimalTerritory, string> = {
  bear: 'Ours',
  cougar: 'Puma',
};
