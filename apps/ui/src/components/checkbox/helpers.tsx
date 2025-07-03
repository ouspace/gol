import _ from 'lodash';
import clsx from 'clsx';
import { Properties } from './types';

/**
 * 
 * @returns 
 */
export const generateId = (): string => {
	return `checkbox-${Math.random().toString(36).slice(2, 9)}`;
};

/**
 * 
 * @param properties
 * @returns
 */
export function toDefaults(properties?: Properties): Required<Properties> {
	return _.defaults({}, properties, {
		id: generateId(),
		label: '',
		value: undefined,
		disabled: false,
		variant: 'primary',
		onChange: _.noop,
	}) as Required<Properties>;
}

/**
 * 
 * @param variant
 * @param disabled
 * @returns
 */
export function getContainerClass(variant: string, disabled: boolean): string {
	return clsx(
		'checkbox',
		'wrapper',
		variant,
		{
			disabled
		}
	);
}

/**
 * 
 * @param disabled
 * @returns
 */
export function getLabelClass(disabled: boolean): string {
	return clsx(
		'label',
		{
			'label-disabled': disabled
		}
	);
}