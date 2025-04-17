import React from 'react';
import BaseButton, { ButtonBaseProps } from './button-base';

const FABButton: React.FC<ButtonBaseProps> = ({ icon, children, ...props }) => {
  return (
    <BaseButton
      variant="filled"
      className="fab"
      icon={icon}
      aria-label="Floating Action Button"
      {...props}
    >
      {children}
    </BaseButton>
  );
};

export default FABButton;
