import { isValidElement } from 'react';
import { match, P } from 'ts-pattern';
import Icon from './root';
import type { Properties } from './types';

/**
 * Create an icon element from various input types.
 *
 * @param value - IconProperties, ReactNode, or null/undefined
 *
 * @example
 * Icon.createFrom({ name: "search" })
 * Icon.createFrom(<span>custom</span>)
 * Icon.createFrom(() => ({ name: "search" }))
 * Icon.createFrom(null)
 */
export function createFrom(
	value: Properties | React.ReactNode | (() => Properties | React.ReactNode) | null | undefined,
): React.ReactNode {
	return match(value)
		.with(P.nullish, () => null)
		.with(P.when(isValidElement), (element) => element)
		.with(P.when((v): v is () => Properties | React.ReactNode => typeof v === 'function'), (callback) => {
			const result = callback();
			if (typeof result === 'function') return null;
			return createFrom(result);
		})
		.with(P.when((v): v is Properties => typeof v === 'object' && !Array.isArray(v) && 'name' in v), (properties) => (
			Icon(properties)
		))
		.with(P.string, (s) => s)
		.with(P.number, (n) => n)
		.otherwise((v) => v as React.ReactNode);
}
