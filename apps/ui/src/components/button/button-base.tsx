import React from 'react';
import clsx from 'clsx';
import styles from './styles/button.module.css';

export type ButtonVariant = 'filled' | 'elevated' | 'tonal' | 'outlined' | 'text';

export interface ButtonBaseProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: ButtonVariant;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  className?: string;
}

const ButtonBase: React.FC<ButtonBaseProps> = ({
  children,
  variant = 'filled',
  fullWidth = false,
  icon,
  className,
  ...props
}) => {
  const classes = clsx(
    styles.buttonBase,
    styles[variant],
    styles.fadeIn,
    {
      [styles.fullWidth]: fullWidth,
    },
    className
  );

  return (
    <button className={classes} {...props}>
      {icon && <span className={styles.icon}>{icon}</span>}
      <span>{children}</span>
    </button>
  );
};

export default ButtonBase;