import { Pipe, PipeTransform } from '@angular/core';
import { Category, CATEGORY } from '../../../models/category';

const CATEGORY_LABELS: Record<Category, string> = {
  [CATEGORY.STRATEGY]: 'Stratégie',
  [CATEGORY.FAMILY]: 'Famille',
  [CATEGORY.COOPERATIVE]: 'Coopératif',
  [CATEGORY.DRAFT]: 'Draft',
  [CATEGORY.ABSTRACT]: 'Abstrait',
  [CATEGORY.PARTY]: 'Ambiance',
  [CATEGORY.RESOURCE_MANAGEMENT]: 'Gestion de ressources',
  [CATEGORY.DECK_BUILDING]: 'Deck building',
  [CATEGORY.WORKER_PLACEMENT]: "Placement d'ouvriers",
  [CATEGORY.ADVENTURE]: 'Aventure',
  [CATEGORY.CARD_GAME]: 'Jeu de cartes',
  [CATEGORY.DEDUCTION]: 'Déduction',
};

@Pipe({
  name: 'categoryLabel',
})
export class CategoryLabelPipe implements PipeTransform {
  transform(category: Category): string {
    return CATEGORY_LABELS[category] ?? category;
  }
}
