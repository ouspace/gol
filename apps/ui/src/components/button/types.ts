import type { ReactNode, HTMLAttributes, Ref, ReactElement } from 'react';

export type IconProperties = HTMLAttributes<{
	/**
	 *
	 */
	children?: ReactNode | null;
}>;

export type TextProperties = HTMLAttributes<{
	/**
	 *
	 */
	children?: ReactNode | null;
}>

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
