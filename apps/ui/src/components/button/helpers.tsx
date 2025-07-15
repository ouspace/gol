import clsx from 'clsx';
import type { ButtonProperties } from './types';

export function generateButtonClassNames({
	variant,
	fullWidth,
	selected,
	layout,
	className,
}: Partial<ButtonProperties>) {
	return clsx(
		'button',
		variant && `button--${variant}`,
		{
			'button--fullWidth': fullWidth,
			'button--selected': selected,
		},
		layout && `layout--${layout}`,
		className
	);
}
