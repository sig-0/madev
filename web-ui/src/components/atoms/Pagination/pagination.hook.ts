import { UsePaginationProps } from '@material-ui/lab';
import { useState } from 'react';
import { IUsePaginationProps } from './pagination.types';

const usePagination = (props?: IUsePaginationProps) => {
  const [page, setPage] = useState<number>(1);
  const [count, setCount] = useState<number>(0);
  const [limit, setLimit] = useState<number>(props?.limit || 6);

  const handlePageChange: UsePaginationProps['onChange'] = (event, value) => {
    setPage(value);
  };

  return {
    handlePageChange,
    page,
    limit,
    setCount,
    count
  };
};

export default usePagination;
