import React from 'react';
import clsx from 'clsx';


import './styles/core.css';
import './styles/animations.css';
import './styles/layouts.css';

import './styles/variants/filled.css';
import './styles/variants/elevated.css';
import './styles/variants/tonal.css';
import './styles/variants/outlined.css';
import './styles/variants/text.css';

export type ButtonVariant = 'filled' | 'elevated' | 'tonal' | 'outlined' | 'text';

export interface ButtonBaseProperties extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: ButtonVariant;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  selected?: boolean;
  className?: string;
  layout?: 'horizontal' | 'vertical' | 'centered';
}

const Button: React.FC<ButtonBaseProperties> = ({
	children,
	variant = 'filled',
	fullWidth = false,
	icon,
	selected = false,
	className,
	layout,
	...properties
}) => {
	const classes = clsx(
		'button fade-in',
		`button--${variant}`,
		{
			'button--fullWidth': fullWidth,
			'button--selected': selected,
		},
		layout && `layout--${layout}`,
		className
	);

	return (
		<button
			className={classes}
			{...(selected ? { 'aria-pressed': true } : {})}
			{...properties}
		>
			{icon && <span className="button__icon">{icon}</span>}
			<span className="button__label">{children}</span>
		</button>
	);
};

export default Button;
