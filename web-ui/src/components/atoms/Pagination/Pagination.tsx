import { Box } from '@material-ui/core';
import { Pagination as MUIPagination } from '@material-ui/lab';
import React, { FC } from 'react';
import { IPaginationProps } from './pagination.types';

const Pagination: FC<IPaginationProps> = (props) => {
  const { count, limit, page, onPageChange } = props;

  if (count > limit) {
    return (
      <Box
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        mt={4}
        mb={2}
      >
        <MUIPagination
          count={Math.ceil(count / limit) | 0}
          page={page}
          onChange={onPageChange}
        />
      </Box>
    );
  }

  return null;
};

export default Pagination;
