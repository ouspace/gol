import _ from 'lodash';
import clsx from 'clsx';
import { P, match } from 'ts-pattern';

import type { Properties } from './types';

/**
 * 
 * @param properties
 * @returns
 */
export function toDefaults(properties?: Properties): Required<Properties> {
	return _.defaults({}, properties, {
		role: 'assist',
		children: '',
		color: 'default',
		variant: 'filled',
		radius: 'rounded',
		icon: null,
		avatar: null,
		href: null,
		target: null,
		selected: false,
		disabled: false,
		onClick: _.noop,
		onRemove: _.noop,
		onToggle: _.noop,
	}) as Required<Properties>;
}

export function toClasses(properties: Required<Properties>): string {
	const { role, variant, color, disabled, selected, icon } = properties;
	return clsx(
		'chip',
		role,
		variant,
		color,
		{
			selected: selected,
			disabled: disabled,
			icon: icon,
		}
	);
}

export function toRadius (properties: Required<Properties>): number | string {
	return match(properties.radius)
		.with('rounded', () => '15px')
		.with('square', () => '0px')
		.with(P.number, (value) => `${value}px`)
		.with(P.string, (value) => value)
		.otherwise(() => properties.radius as number);
}