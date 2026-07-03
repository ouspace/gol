import _ from 'lodash';
import clsx from 'clsx';
import { match, P } from 'ts-pattern';
import type { AnchorHTMLAttributes } from 'react';

import type { Properties } from './types';

const BASE_PROPERTY_KEYS = [
	'role',
	'children',
	'label',
	'color',
	'variant',
	'size',
	'radius',
	'icon',
	'avatar',
	'href',
	'target',
	'selected',
	'disabled',
	'className',
	'style',
	'onClick',
	'onRemove',
	'onToggle',
	'ref',
	'key',
] as const;

export type DefaultedProperties = Properties &
	Required<Pick<Properties, 'variant' | 'selected' | 'disabled' | 'className' | 'onClick' | 'onRemove' | 'onToggle'>>;

export type NativeAnchorProperties = Omit<Properties, (typeof BASE_PROPERTY_KEYS)[number]> &
	AnchorHTMLAttributes<HTMLAnchorElement>;

export function toDefaults(properties?: Properties): DefaultedProperties {
	return _.defaults({}, properties, {
		variant: 'filled',
		selected: false,
		disabled: false,
		className: '',
		onClick: _.noop,
		onRemove: _.noop,
		onToggle: _.noop,
	}) as DefaultedProperties;
}

export function toNativeAnchorProperties(properties?: Properties): NativeAnchorProperties {
	if (!properties) return {} as NativeAnchorProperties;
	return _.omit(properties, BASE_PROPERTY_KEYS) as NativeAnchorProperties;
}

export function toClass(properties: DefaultedProperties, original?: Properties): string {
	const { role, variant, disabled, selected, className } = properties;
	return clsx('chip', role, variant, original?.color, original?.size, original?.radius, className, {
		selected,
		disabled,
	});
}

export function toRadius(radius: DefaultedProperties['radius']): string | undefined {
	if (radius == null) return undefined;
	return match(radius)
		.with(P.number, (value) => `${value}px`)
		.otherwise((value) => value as string);
}

export function toColor(color: DefaultedProperties['color']): string | undefined {
	if (color == null) return undefined;
	return color as string;
}

export function toSize(size: DefaultedProperties['size']): string | undefined {
	if (size == null) return undefined;
	return match(size)
		.with(P.number, (value) => `${value}px`)
		.otherwise((value) => value as string);
}
