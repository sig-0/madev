import {Box} from '@material-ui/core';
import {FC} from 'react';
import {IHomepageProps} from './homepage.types';

const Homepage: FC<IHomepageProps> = () => {
  return (
    <Box
      width={'100%'}
      height={'100%'}
      display={'flex'}
    >
      Hello world
    </Box>
  );
};

export default Homepage;
