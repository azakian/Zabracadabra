import { PageMeta } from './page';

export interface PaginatedResult<T> {
  data: T[];
  meta: PageMeta;
}
