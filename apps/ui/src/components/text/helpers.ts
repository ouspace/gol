import _ from 'lodash';
import type { Properties } from './types';
import clsx from 'clsx';
import { match, P } from 'ts-pattern';

export function toDefaults(properties?: Properties): Required<Properties> {
	return _.defaults({}, properties, {
		children: null,
		content: null,
		scale: null,
		as: 'span',
		size: 'normal',
		weight: null,
		color: 'black',
		lineHeight: null,
		align: 'left',
		letterSpacing: null,
		decoration: 'none',
		italic: false,
		transform: 'none',
		wrap: true,
		unselectable: false,
		disabled: false,
		className: '',
		onClick: _.noop,
	}) as Required<Properties>;
}

export function toClasses(properties: Required<Properties>): string {
	return clsx('text', properties.scale, properties.className, {
		disabled: properties.disabled,
		italic: properties.italic,
		nowrap: !properties.wrap,
		unselectable: properties.unselectable,
	});
}

export function toSize(properties: Required<Properties>): string | null {
	return match({ size: properties.size })
		.with({ size: 'small' }, () => '0.875rem')
		.with({ size: 'normal' }, () => null)
		.with({ size: 'big' }, () => '1.5rem')
		.with({ size: P.number }, ({ size }) => `${size}px`)
		.with({ size: P.string }, ({ size }) => size)
		.otherwise(() => null);
}
