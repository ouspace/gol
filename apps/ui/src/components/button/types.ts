export type ButtonVariant = 'filled' | 'elevated' | 'tonal' | 'outlined' | 'text';

export interface ButtonProperties extends React.ButtonHTMLAttributes<HTMLButtonElement | HTMLAnchorElement> {
  children?: React.ReactNode;
  variant?: ButtonVariant;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  selected?: boolean;
  layout?: 'horizontal' | 'vertical' | 'centered';
  href?: string;
  as?: 'button' | 'a' | 'div' | 'span';
}
