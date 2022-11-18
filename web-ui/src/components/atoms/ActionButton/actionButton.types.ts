import React from 'react';

export interface IActionButtonProps {
  text: string;
  onClick?: () => void;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  disabled?: boolean;

  square?: boolean;
  shouldSubmit?: boolean;
}
