import { makeStyles, Typography } from '@material-ui/core';
import clsx from 'clsx';
import { FC } from 'react';
import { ISectionTitleProps } from './sectionTitle.types';

const SectionTitle: FC<ISectionTitleProps> = (props) => {
  const { large = false, title } = props;

  const classes = useStyles();

  return (
    <Typography
      className={clsx(classes.sectionTitle, {
        [classes.sectionTitleLarge]: large
      })}
    >
      {title}
    </Typography>
  );
};

const useStyles = makeStyles((theme) => {
  return {
    sectionTitle: {
      color: theme.palette.custom.darkGray,
      fontFamily: 'Poppins',
      fontWeight: 700,
      fontSize: theme.typography.pxToRem(16)
    },
    sectionTitleLarge: {
      fontSize: theme.typography.pxToRem(20)
    }
  };
});

export default SectionTitle;