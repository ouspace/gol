import type { ReactNode, ReactElement, HTMLAttributes, ButtonHTMLAttributes } from 'react';

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
export type Properties = {
	as?: ReactElement;
	/**
	 *
	 */
	children?: ReactNode;
	className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

