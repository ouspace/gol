import React from 'react';
import BaseButton, { ButtonBaseProps } from './button-base';

const TextButton: React.FC<ButtonBaseProps> = (props) => {
  return <BaseButton variant="text" {...props} />;
};

export default TextButton;
