import React from 'react';
import clsx from 'clsx';
import styles from './styles/button.module.css';


export type ButtonVariant = 'filled' | 'elevated' | 'tonal' | 'outlined' | 'text';


export interface ButtonBaseProperties extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: ButtonVariant;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  selected?: boolean; 
  className?: string;
}

const Button: React.FC<ButtonBaseProperties> = ({
	children,
	variant = 'filled',
	fullWidth = false,
	icon,
	selected = false,
	className,
	...properties
}) => {
	const classes = clsx(
		styles.buttonBase,
		styles[variant],
		styles.fadeIn,
		{
			[styles.fullWidth]: fullWidth,
			[styles.selected]: selected,
		},
		className
	);

	return (
		<button className={classes} {...properties}>
			{icon && <span className={styles.icon}>{icon}</span>}
			<span>{children}</span>
		</button>
	);
};

export default Button;


export const FilledButton = (properties: Omit<ButtonBaseProperties, 'variant'>) => (
	<Button variant="filled" {...properties} />
);

export const ElevatedButton = (properties: Omit<ButtonBaseProperties, 'variant'>) => (
	<Button variant="elevated" {...properties} />
);

export const TonalButton = (properties: Omit<ButtonBaseProperties, 'variant'>) => (
	<Button variant="tonal" {...properties} />
);

export const OutlinedButton = (properties: Omit<ButtonBaseProperties, 'variant'>) => (
	<Button variant="outlined" {...properties} />
);

export const TextButton = (properties: Omit<ButtonBaseProperties, 'variant'>) => (
	<Button variant="text" {...properties} />
);

export const IconButton = ({ children, ...properties }: Omit<ButtonBaseProperties, 'variant'>) => (
	<Button variant="text" icon={children} {...properties}>
		{children}
	</Button>
);

export const SegmentedButton = ({
	selected = false,
	className,
	...properties
}: Omit<ButtonBaseProperties, 'variant'> & { selected?: boolean }) => (
	<Button
		variant="outlined"
		selected={selected}
		className={clsx(selected && 'selected', className)}
		{...properties}
	/>
);
