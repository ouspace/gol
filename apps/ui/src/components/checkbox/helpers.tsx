import _ from 'lodash';
import clsx from 'clsx';
import { match, P } from 'ts-pattern';
import { isValidElement } from 'react';
import type { Properties, TextProperties } from './types';

/**
 *
 * @param properties 
 * @returns 
 */
export function toDefaults(properties?: Properties): Required<Properties> {
	return _.defaults({}, properties, {
		id: generateId(),
		name: '',
		label: null,
		value: false,
		disabled: false,
		icon: null,
		checkedIcon: null,
		size: 'normal',
		color: 'blue',
		circular: false,
		className: '',
		onChange: _.noop,
	}) as Required<Properties>;
}

/**
 *
 * @returns
 */
export const generateId = (): string => {
	return `checkbox-${Math.random().toString(36).slice(2, 9)}`;
};

/**
 *
 * @param label 
 * @returns 
 */
export function toLabelProperties(label?: string | TextProperties | React.ReactNode): TextProperties | null {
	return match(label)
		.with(P.string, (value) => ({
			value,
			position: 'right' as const,
			color: undefined,
			className: undefined,
		}))
		.with(P.nullish, () => null)
		.with(
			P.when((value) => typeof value === 'object' && !isValidElement(value)),
			(textProperties) => _.defaults({}, textProperties as TextProperties, {
				value: '',
				position: 'right',
				color: undefined,
				className: undefined,
			})
		)
		.otherwise(() => null);
}

/**
 *
 * @param properties
 * @returns 
 */
export function toSize(properties: Required<Properties>): number {
	return match({ size: properties.size })
		.with({ size: 'small' }, () => 14)
		.with({ size: 'normal' }, () => 18)
		.with({ size: 'big' }, () => 22)
		.otherwise(() => properties.size as number);
}

/**
 *
 * @param properties
 * @returns
 */
export function toClasses(properties: Required<Properties>): string {
	const hasCustomIcon = properties.icon !== null || properties.checkedIcon !== null;
	const labelProperties = toLabelProperties(properties.label);
	const labelPosition = labelProperties?.position ?? 'right';

	return clsx(
		{
			disabled: properties.disabled,
			circular: properties.circular,
			'has-custom-icon': hasCustomIcon,
		},
		'checkbox',
		properties.size,
		`label-${labelPosition}`,
		properties.className
	);
}