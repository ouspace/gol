import * as React from 'react';
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

type ElementTag = 'button' | 'a' | 'div' | 'span';

/**
 * Button component
 *
 * Polymorphic action element: renders a semantic `<button>` (or an `<a>` when
 * `href` is provided) with five Material-style variants. Use for in-page
 * interactions only; for route navigation prefer a Link.
 *
 * @summary polymorphic action button (5 variants) for in-page interactions
 *
 * @example
 * <Button variant="filled" onClick={handler}>Save</Button>
 * <Button variant="text" href="/dashboard">Go to Dashboard</Button>
 *
 * @param {ButtonProperties} properties - refers to button properties
 * @returns {React.JSX.Element} element
 */
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
	const TagComponent = Tag as any;

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
		<TagComponent ref={reference} {...elementProperties}>
			{icon && <span className='button__icon'>{icon}</span>}
			{children && <span className='button__label'>{children}</span>}
			{!icon && !children && (
				<span className='button__label'>Button</span>
			)}
		</TagComponent>
	);
});

Button.displayName = 'Button';

export default Button;
