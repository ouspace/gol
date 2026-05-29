import { isValidElement } from 'react';
import { match, P } from 'ts-pattern';
import Text from './root';
import type { Properties as TextProperties } from './types';

/**
 * Create a text element from the input type.
 *
 * @param properties
 *
 * @example
 * Text.createFrom("Hello")
 * Text.createFrom({ content: "Hello", color: "red" })
 * Text.createFrom(<span>Hello</span>)
 * Text.createFrom(() => "Hello")
 */
export function createFrom(
	properties?: TextProperties | React.ReactNode | (() => TextProperties | React.ReactNode),
): React.ReactNode {
	return match(properties)
		.with(P.nullish, () => null)
		.with(P.string, (s) => <Text content={s} />)
		.with(P.when((v): v is () => TextProperties | React.ReactNode => typeof v === 'function'), (callback) => {
			const result = callback();
			if (typeof result === 'function') return null;
			return createFrom(result);
		})
		.with(P.when(isValidElement), (element) => element)
		.with(P.when((v): v is TextProperties => typeof v === 'object' && !Array.isArray(v)), (properties) => (
			<Text {...properties} />
		))
		.with(P.number, (n) => <Text content={String(n)} />)
		.otherwise((v) => v as React.ReactNode);
}
