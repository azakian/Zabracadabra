import { PaginatedQuery } from '../../../../../shared/pagination/models/paginated-query';
import { Category } from '../../../models/category';

export type BoardGameSortField = 'name' | 'id';

export interface BoardGameFilter {
  name?: string;
  categories?: Category[];
}

export type BoardGameQuery = PaginatedQuery<BoardGameSortField, BoardGameFilter>;
