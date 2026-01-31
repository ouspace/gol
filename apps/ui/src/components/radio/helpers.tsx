import _ from 'lodash';
import clsx from 'clsx';
import { match, P } from 'ts-pattern';
import { isValidElement, type ReactNode } from 'react';
import type { Properties, TextProperties } from './types';

export const generateId = (): string => {
	return `radio-${Math.random().toString(36).slice(2, 9)}`;
};

export function toDefaults(properties?: Properties): Required<Properties> {
	return _.defaults({}, properties, {
		id: generateId(),
		name: '',
		label: null,
		value: '',
		checked: false,
		disabled: false,
		required: false,
		icon: null,
		checkedIcon: null,
		size: 'normal',
		color: 'blue',
		className: '',
		onChange: _.noop,
		children: null,
	}) as Required<Properties>;
}

export function toNativeProperties(properties?: Properties): Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
	if (!properties) return {};

	const keysToOmit = [
		'id',
		'name',
		'label',
		'value',
		'checked',
		'disabled',
		'required',
		'icon',
		'checkedIcon',
		'size',
		'color',
		'className',
		'onChange',
		'children',
		'ref',
		'key',
	] as const;

	return _.omit(properties, keysToOmit);
}

export function toLabelProperties(label?: string | TextProperties | ReactNode): TextProperties | null {
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
			(textProperties) =>
				_.defaults({}, textProperties as TextProperties, {
					value: '',
					position: 'right',
					color: undefined,
					className: undefined,
				})
		)
		.otherwise(() => null);
}

export function toSize(size: Required<Properties>['size']): number {
	return match({ size })
		.with({ size: 'small' }, () => 16)
		.with({ size: 'normal' }, () => 20)
		.with({ size: 'big' }, () => 24)
		.otherwise(() => size as number);
}

export function toClasses(
	properties: Required<Properties>,
	labelProperties: TextProperties | null | undefined
): string {
	const hasCustomIcon = properties.icon !== null || properties.checkedIcon !== null;
	const labelPosition = labelProperties?.position ?? 'right';

	return clsx('radio', properties.size, `label-${labelPosition}`, properties.className, {
		checked: properties.checked,
		disabled: properties.disabled,
		'has-custom-icon': hasCustomIcon,
	});
}
