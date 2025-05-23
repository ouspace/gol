import * as React from 'react';
import clsx from 'clsx';
import './styles/core.css';
import './styles/animations.css';
import './styles/layouts.css';


import { filled } from './variants/filled';
import { elevated } from './variants/elevated';
import { tonal } from './variants/tonal';
import { outlined } from './variants/outlined';
import { text } from './variants/text';

import './styles/core.css';
import './styles/animations.css';
import './styles/layouts.css';
import './styles/variants/filled.css';
import './styles/variants/elevated.css';
import './styles/variants/tonal.css';
import './styles/variants/outlined.css';
import './styles/variants/text.css';

import type { ButtonProperties } from './types';

type ElementTag = 'button' | 'a' | 'div' | 'span';

const Button = React.forwardRef<HTMLElement, ButtonProperties>(({
	as,
	href,
	children,
	variant = 'filled',
	fullWidth = false,
	icon,
	selected = false,
	className,
	layout,
	...rest
}, reference) => {
	const isLink = typeof href === 'string';
	const Tag = (as ?? (isLink ? 'a' : 'button')) as ElementTag;

	const classes = clsx(
		'button',
		`button--${variant}`,
		{
			'button--fullWidth': fullWidth,
			'button--selected': selected,
		},
		layout && `layout--${layout}`,
		className
	);

	const elementProperties = {
		className: classes,
		'aria-pressed': selected || undefined,
		...(isLink ? { href } : {}),
		...(Tag === 'button' && !('type' in rest) ? { type: 'button' as const } : {}),
		...rest,
	};

	if (process.env.NODE_ENV === 'development') {
		if (!children && !icon) {
			console.warn('[Button]: Se recomienda incluir al menos texto o ícono.');
		}
		if (typeof (rest as Record<string, unknown>).onClick === 'string') {
			console.warn('[Button]: onClick debe ser una función, no una cadena.');
		}
	}

	return (
		<Tag ref={reference} {...elementProperties}>
			{icon && <span className="button__icon">{icon}</span>}
			{children && <span className="button__label">{children}</span>}
			{!icon && !children && (
				<span className="button__label">Button</span>
			)}
		</Tag>
	);
});

Button.displayName = 'Button';

export default Button;
