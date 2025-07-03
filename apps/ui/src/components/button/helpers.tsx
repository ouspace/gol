import type { Properties } from './types';
import _ from 'lodash';

/**
 *
 * @param properties
 * @returns
 */
export function toDefaults(properties?: Properties): Required<Properties> {
	return _.defaults(properties, {
		as: 'button',
		children: null,
	}) as Required<Properties>;
}
