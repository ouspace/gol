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
		size: 'normal',
		radius: 'rounded',
		icon: null,
		avatar: null,
		href: null,
		target: null,
		selected: false,
		disabled: false,
		className: '',
		onClick: _.noop,
		onRemove: _.noop,
		onToggle: _.noop,
	}) as Required<Properties>;
}

export function toClasses(properties: Required<Properties>): string {
	const { role, variant, disabled, selected, icon,className } = properties;
	return clsx(
		'chip',
		role,
		variant,
		className,
		{
			selected: selected,
			disabled: disabled,
			icon: icon,
		}
	);
}

export function toRadius (properties: Required<Properties>): string {
  	return match(properties.radius)
  		.with('rounded', () => '15px')
  		.with('square', () => '0px')
  		.with(P.number, (value) => `${value}px`)
  		.with(P.string, (value) => value)
  		.otherwise(() => `${properties.radius}px`);
}

export function toColor(properties: Required<Properties>): string {
  	return match(properties.color)
  		.with('default', () => '#6B7280')
  		.with('primary', () => '#3B82F6')
  		.with('secondary', () => '#6366F1')
  		.with('error', () => '#EF4444')
  		.with('success', () => '#10B981')
  		.with('warning', () => '#F59E0B')
  		.otherwise(() => properties.color);
}

export function toSize(properties: Required<Properties>): number {
  	return match({ size: properties.size })
  		.with({ size: 'small' }, () => 24)
  		.with({ size: 'normal' }, () => 32)
  		.with({ size: 'big' }, () => 40)
  		.otherwise(() => properties.size as number);
  }
