import { Box, Theme, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { FC } from 'react';
import { ILogoProps } from './logo.types';
import LogoImg from '../../../shared/assets/img/logo.png'

const Logo: FC<ILogoProps> = () => {
  const classes = useStyles();
  return (
    <Box
      display={'flex'}
      alignItems={'center'}
      justifyContent={'center'}
      flexDirection={'column'}
    >
      
      <img src={LogoImg} />
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) => {
  return {
    logoImg: {
      width: '150px',
      height: '150px'
    },
    logoText: {
      fontWeight: 600,
      fontSize: theme.typography.pxToRem(18),
      textAlign: 'center'
    }
  };
});

export default Logo;
