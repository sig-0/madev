import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { FC } from 'react';
import theme from '../../../theme/theme';
import { IFormTitleProps } from './formTitle.types';

const FormTitle: FC<IFormTitleProps> = (props) => {
  const { title } = props;
  const classes = useStyles();

  return <Typography className={classes.formTitle}>{title}</Typography>;
};

const useStyles = makeStyles(() => {
  return {
    formTitle: {
      fontWeight: 600,
      fontSize: theme.typography.pxToRem(18)
    }
  };
});

export default FormTitle;
