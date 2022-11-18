import {Box, Theme, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {FC} from 'react';
import ActionButton from '../../atoms/ActionButton/ActionButton';
import {IHomepageProps} from './homepage.types';

const Homepage: FC<IHomepageProps> = () => {
  const classes = useStyles();

  return (
    <Box
      width={'100%'}
      height={'100%'}
      display={'flex'}
      alignItems={'center'}
      justifyContent={'center'}
    >
      <Box ml={4} display={'flex'} flexDirection={'column'} width={'300px'}>
        <Typography className={classes.logoText}>
          Example
        </Typography>
        <Box mt={4}>
          <ActionButton
            text={'Go to app...'}
            square={true}
          />
        </Box>
      </Box>
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) => {
  return {
    logoImg: {
      width: '190px',
      height: '190px'
    },
    logoText: {
      fontWeight: 700,
      fontSize: theme.typography.pxToRem(36),
      textAlign: 'left'
    }
  };
});

export default Homepage;
