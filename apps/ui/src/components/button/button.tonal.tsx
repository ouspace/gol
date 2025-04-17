import React from 'react';
import BaseButton, { ButtonBaseProps } from './button-base';

const TonalButton: React.FC<ButtonBaseProps> = (props) => {
  return <BaseButton variant="tonal" {...props} />;
};

export default TonalButton;
