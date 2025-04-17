import React from 'react';
import BaseButton, { ButtonBaseProps } from './button-base';

const ElevatedButton: React.FC<ButtonBaseProps> = (props) => {
  return <BaseButton variant="elevated" {...props} />;
};

export default ElevatedButton;
