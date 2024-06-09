export interface IPaginationResponse {
  data: Record<string, unknown>[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
}

export interface IList {
  pageNo?: number;
  limit?: number;
  sortOrder?: number;
  sortBy?: string;
  searchKey?: string;
}
