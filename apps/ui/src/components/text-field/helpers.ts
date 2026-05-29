import _ from 'lodash';
import { match } from 'ts-pattern';
import clsx from 'clsx';
import { isValidElement } from 'react';

import type { TextProperties } from '../text';
import type { Properties, NativeProperties } from './types';

const BASE_PROPERTY_KEYS = [
	'variant',
	'size',
	'color',
	'fullWidth',
	'label',
	'asterisk',
	'error',
	'errorText',
	'supportingText',
	'prefixText',
	'suffixText',
	'value',
	'defaultValue',
	'readOnly',
	'icon',
	'spinner',
	'textDirection',
	'onChange',
	'className',
	'ref',
	'key',
	'type',
	'maxLength',
	'minLength',
	'pattern',
	'multiple',
	'max',
	'min',
	'step',
	'rows',
	'cols',
] as const;

export type DefaultedProperties = Properties &
	Required<Pick<Properties, 'type' | 'variant' | 'size' | 'fullWidth' | 'disabled' | 'onChange' | 'asterisk'>>;

export function toDefaults(properties?: Properties): DefaultedProperties {
	return _.defaults({}, properties, {
		type: 'text',
		variant: 'filled',
		size: 'normal',
		fullWidth: false,
		disabled: false,
		onChange: _.noop,
		spinner: true,
		asterisk: true,
	}) as DefaultedProperties;
}

export function toNativeProperties(properties?: Properties): NativeProperties {
	if (!properties) return {};
	return _.omit(properties, BASE_PROPERTY_KEYS);
}

export function toInputTypeProperties(properties: Properties) {
	return match(properties)
		.with({ type: 'email' }, (p) => _.pick(p, ['maxLength', 'minLength', 'pattern', 'multiple']))
		.with({ type: 'number' }, (p) => _.pick(p, ['max', 'min', 'step']))
		.with({ type: 'textarea' }, (p) => _.defaults(_.pick(p, ['rows', 'cols', 'maxLength', 'minLength']), { rows: 2 }))
		.otherwise((p) => _.pick(p, ['maxLength', 'minLength', 'pattern']));
}

export function toElement(type: Required<Properties>['type']): 'input' | 'textarea' {
	return type === 'textarea' ? 'textarea' : 'input';
}

export function toLabelContent(label: NonNullable<Properties['label']>) {
	if (typeof label === 'function' || typeof label === 'string' || isValidElement(label)) {
		return label;
	}
	return _.defaults({ className: clsx('label-text', (label as TextProperties).className) }, label);
}

export function toClasses(properties: DefaultedProperties): string {
	return clsx(
		'text-field',
		properties.variant,
		properties.size === 'normal' ? undefined : properties.size,
		{
			error: properties.error,
			disabled: properties.disabled,
			'read-only': properties.readOnly,
			'no-spinner': properties.type === 'number' && !properties.spinner,
			'full-width': properties.fullWidth,
		},
		properties.className
	);
}
