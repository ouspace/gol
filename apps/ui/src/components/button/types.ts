import type { ReactNode, ReactElement, ButtonHTMLAttributes } from 'react';

/**
 * 
 */
export type Properties = ButtonHTMLAttributes<HTMLButtonElement> & {
  as?: ReactElement;
  className?: string;
  children?: ReactNode;
};
