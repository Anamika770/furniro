type BaseState<T> = {
  loading?: boolean | null;
  addEditLoading?: boolean | null;
  exportLoading?: boolean | null;
  searchLoading?: boolean | null;
  resetLoading?: boolean | null;
  error?: any;
  data?: T;
};

  
type PaginationState<T> = BaseState<T> & {
  pagination: {
    page: number;
    pageSize: number;
    totalCount: number;
  };
};

type BaseModel = {
  active?: boolean;
  _id?: string;
  createdAt?: string;
  updatedAt?: string;
};
