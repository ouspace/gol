import React from 'react';
import clsx from 'clsx';

export type ButtonVariant = 'filled' | 'elevated' | 'tonal' | 'outlined' | 'text';

export interface ButtonBaseProperties extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: ButtonVariant;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  selected?: boolean; 
  className?: string;
}

const Button: React.FC<ButtonBaseProperties> = ({
	children,
	variant = 'filled',
	fullWidth = false,
	icon,
	selected = false,
	className,
	...properties
}) => {
	const classes = clsx(
		'button',
		`button--${variant}`,
		fullWidth && 'button--fullWidth',
		selected && 'button--selected',
		'fade-in',
		className
	);

	return (
		<button className={classes} {...properties}>
			{icon && <span className="button__icon">{icon}</span>}
			<span>{children}</span>
		</button>
	);
};

export default Button;
