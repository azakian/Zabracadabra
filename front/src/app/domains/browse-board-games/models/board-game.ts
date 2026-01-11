import { Category } from './category';

export interface BoardGame {
  id: number;
  name: string;
  description: string;
  explanation: string;
  categories: Category[];
  price: number;
}
