// types.ts
export type Variant = 'primary' | 'secondary' | 'outline';
export type Size = 'small' | 'medium' | 'large';

export interface Properties {
  label?: string;
  variant?: Variant;
  size?: Size;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
  ref?: React.Ref<HTMLButtonElement>;
}
