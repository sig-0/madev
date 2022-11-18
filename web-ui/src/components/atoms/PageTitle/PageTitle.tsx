import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { FC } from 'react';
import { IPageTitleProps } from './pageTitle.types';

const PageTitle: FC<IPageTitleProps> = (props) => {
  const { title } = props;
  const classes = useStyles();

  return <Typography className={classes.pageTitle}>{title}</Typography>;
};

const useStyles = makeStyles(() => {
  return {
    pageTitle: {
      fontWeight: 700,
      fontSize: '1.5rem'
    }
  };
});

export default PageTitle;
