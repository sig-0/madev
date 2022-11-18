import { Box, IconButton, Typography } from '@material-ui/core';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import RemoveRoundedIcon from '@material-ui/icons/RemoveRounded';
import { FC } from 'react';
import { ICounterProps } from './counter.types';

const Counter: FC<ICounterProps> = (props) => {
  const { title, minimum = 0, setValue, count } = props;

  const handleDecrease = () => {
    if (count > minimum) {
      setValue(count - 1);
    }
  };

  const handleIncrease = () => {
    setValue(count + 1);
  };

  return (
    <Box display={'flex'} alignItems={'center'}>
      <Typography>{title}</Typography>
      <Box ml={2} display={'flex'} alignItems={'center'}>
        <IconButton color={'primary'} onClick={() => handleDecrease()}>
          <RemoveRoundedIcon />
        </IconButton>
        <Typography>{count}</Typography>
        <IconButton color={'primary'} onClick={() => handleIncrease()}>
          <AddRoundedIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Counter;
