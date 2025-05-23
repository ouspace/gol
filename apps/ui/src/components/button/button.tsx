import React from 'react';
import clsx from 'clsx';
import './styles/core.css';
import './styles/animations.css';
import './styles/layouts.css';


import { filled } from './variants/filled';
import { elevated } from './variants/elevated';
import { tonal } from './variants/tonal';
import { outlined } from './variants/outlined';
import { text } from './variants/text';

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

const variantClassMap: Record<ButtonVariant, () => string> = {
	filled,
	elevated,
	tonal,
	outlined,
	text,
};

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
	const variantClass = variantClassMap[variant]();

	const classes = clsx(
		'button',
		variantClass,
		fullWidth && 'button--fullWidth',
		selected && 'button--selected',
		layout && `layout--${layout}`,
		'fade-in',
		className
	);

	return (
		<button className={classes} {...properties}>
			{icon && <span className="button__icon">{icon}</span>}
			<span className="button__label">{children}</span>
		</button>
	);
};

export default Button;
