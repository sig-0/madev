import { UsePaginationProps } from '@material-ui/lab';

export interface IPaginationProps {
  count: number;
  page: number;
  limit: number;
  onPageChange: UsePaginationProps['onChange'];
}

export interface IUsePaginationProps {
  limit?: number;
}
