import React from 'react';
import BaseButton, { ButtonBaseProps } from './button-base';

const OutlinedButton: React.FC<ButtonBaseProps> = (props) => {
  return <BaseButton variant="outlined" {...props} />;
};

export default OutlinedButton;
