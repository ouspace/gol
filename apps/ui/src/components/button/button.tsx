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

import type { ButtonProperties } from './types';

const Button = ({
	children,
	variant = 'filled',
	fullWidth = false,
	icon,
	selected = false,
	className,
	layout,
	...rest
}: ButtonProperties): JSX.Element => {
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
			aria-pressed={selected || undefined}
			{...rest}
		>
			{icon && <span className="button__icon">{icon}</span>}
			<span className="button__label">{children}</span>
		</button>
	);
};

export default Button;
