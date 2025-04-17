import React from 'react';
import BaseButton, { ButtonBaseProps } from './button-base';

const FilledButton: React.FC<ButtonBaseProps> = (props) => {
  return <BaseButton variant="filled" {...props} />;
};

export default FilledButton;
