import { Box, CircularProgress, useMediaQuery } from '@material-ui/core';
import React, { FC } from 'react';
import theme from '../../../theme/theme';
import { ILoadingIndicatorProps } from './loadingIndicator.types';

const LoadingIndicator: FC<ILoadingIndicatorProps> = (props) => {
  const { size = 96, margin = 'auto' } = props;

  const isMobile = useMediaQuery(theme.breakpoints.only('xs'));

  return (
    <Box
      margin={margin}
      display="flex"
      justifyContent="center"
      alignItems={'center'}
    >
      <CircularProgress size={isMobile ? +size / 2 : size} {...props} />
    </Box>
  );
};

LoadingIndicator.defaultProps = {
  color: 'primary'
};

export default LoadingIndicator;
