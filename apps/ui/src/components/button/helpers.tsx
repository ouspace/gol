import type { Properties } from './types';

/**
 *
 * @param properties
 * @returns
 */
// after
export function toDefaults(properties?: Properties): Required<Properties> {
	return {
		as: 'button',
		children: properties?.children ?? null,
		...properties,
	} as Required<Properties>;
}