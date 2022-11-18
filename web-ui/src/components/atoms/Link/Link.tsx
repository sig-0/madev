import {Link as MUILink} from '@material-ui/core';
import React, {FC} from 'react';
import {Link as RouterLink} from 'react-router-dom';
import {ILinkProps} from './link.types';

const Link: FC<ILinkProps> = (props) => {
  const {
    children,
    ...otherProps
  } = props;

  return (
    <MUILink
      {...otherProps}
      component={RouterLink}
    >
      {children}
    </MUILink>
  );
};

export default Link;