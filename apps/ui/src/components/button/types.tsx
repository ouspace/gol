import type { ReactNode, HTMLAttributes, Ref, ReactElement } from 'react';

/**
 *
 */
export type Properties = HTMLAttributes<{
	/**
	 *
	 */
	as?: ReactElement;

	/**
	 *
	 */
	ref?: Ref<HTMLElement> | undefined;

	/**
	 *
	 */
	children?: ReactNode | null;
}>;
