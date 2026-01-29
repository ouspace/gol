import { isValidElement } from 'react';
import Text from './text';
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
	properties?: TextProperties | React.ReactNode | (() => TextProperties | React.ReactNode)
): React.ReactElement | null {
	if (properties === undefined || properties === null) return null;
	if (typeof properties === 'string') return <Text content={properties} />;
	if (typeof properties === 'function') {
		const result = properties();
		if (typeof result === 'function') return null;
		return createFrom(result);
	}
	if (isValidElement(properties)) return properties;
	return <Text {...(properties as TextProperties)} />;
}
