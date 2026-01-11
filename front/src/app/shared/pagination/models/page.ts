export interface Page<T> {
  data: T[];
}

export interface PageMeta {
  page: number;
  limit: number;
  totalCount: number;
  aggregatedCount: number;
  next?: number;
  prev?: number;
}
