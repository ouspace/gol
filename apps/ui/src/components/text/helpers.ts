import _ from 'lodash';
import type { Properties } from './types';
import clsx from 'clsx';
import { match, P } from 'ts-pattern';

export type DefaultedProperties = Properties &
	Required<
		Pick<
			Properties,
			'as' | 'color' | 'align' | 'decoration' | 'italic' | 'wrap' | 'unselectable' | 'disabled' | 'onClick'
		>
	>;

export function toDefaults(properties?: Properties): DefaultedProperties {
	return _.defaults({}, properties, {
		as: 'span',
		color: 'black',
		align: 'left',
		decoration: 'none',
		italic: false,
		wrap: true,
		unselectable: false,
		disabled: false,
		onClick: _.noop,
	}) as DefaultedProperties;
}

export function toClass(properties: DefaultedProperties): string {
	return clsx(
		'text',
		properties.scale,
		properties.size === 'normal' ? undefined : properties.size,
		properties.className,
		{
			disabled: properties.disabled,
			italic: properties.italic,
			nowrap: !properties.wrap,
			unselectable: properties.unselectable,
		}
	);
}

export function toSize(size: Properties['size']): string | undefined {
	if (size == null) return undefined;
	return match(size)
		.with(P.number, (value) => `${value}px`)
		.otherwise((value) => value as string);
}
