export interface PaginatedQuery<TSort extends string = string, TFilter = unknown> {
  page: number;
  limit: number;
  clue?: string;
  sort?: SortConfig<TSort>;
  filter?: TFilter;
}

export interface SortConfig<T extends string = string> {
  field: T;
  direction: 'asc' | 'desc';
}
