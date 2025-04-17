import React from 'react';
import BaseButton, { ButtonBaseProps } from './button-base';

interface SegmentedButtonProps extends ButtonBaseProps {
  selected?: boolean;
}

const SegmentedButton: React.FC<SegmentedButtonProps> = ({
  selected = false,
  className,
  ...props
}) => {
  return (
    <BaseButton
      variant="outlined"
      className={`${selected ? 'selected' : ''} ${className || ''}`}
      {...props}
    />
  );
};

export default SegmentedButton;
