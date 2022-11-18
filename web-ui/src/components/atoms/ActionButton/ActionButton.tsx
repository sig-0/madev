import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { FC } from 'react';
import { IActionButtonProps } from './actionButton.types';

const ActionButton: FC<IActionButtonProps> = (props) => {
  const {
    text,
    onClick,
    startIcon,
    endIcon,
    disabled = false,
    square = false,
    shouldSubmit = true
  } = props;

  const classes = useStyles();

  return (
    <Button
      variant={'contained'}
      onClick={onClick}
      className={clsx('actionButtonRounded', {
        [classes.actionButtonSquare]: square
      })}
      type={shouldSubmit ? 'submit' : 'button'}
      color={'primary'}
      startIcon={startIcon}
      endIcon={endIcon}
      disabled={disabled}
    >
      {text}
    </Button>
  );
};

const useStyles = makeStyles((theme) => {
  return {
    actionButtonSquare: {
      borderRadius: '5px !important'
    }
  };
});

export default ActionButton;
