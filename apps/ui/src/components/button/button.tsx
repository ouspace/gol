import clsx from 'clsx';
import { toDefaults } from './helpers';
import type { Properties } from './types';

/**
 *
 * @param properties
 * @returns
 */
export default function Button(properties?: Properties) {
	const defaults = toDefaults(properties);

	return <button className={clsx(defaults.className)} />;
}
