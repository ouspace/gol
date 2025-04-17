import React from 'react';
import BaseButton, { ButtonBaseProps } from './button-base';

const IconButton: React.FC<ButtonBaseProps> = ({ children, ...props }) => {
  return (
    <BaseButton variant="text" icon={children} {...props}>
      {children}
    </BaseButton>
  );
};

export default IconButton;