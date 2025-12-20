import type { ReactNode, RefAttributes, SyntheticEvent } from 'react'

type Size<TValue extends string> = TValue | number;
type Color<TValue extends string> = TValue | `rgb(${string})` | `rgba(${string})` | `hsl(${string})` | `hsla(${string})` | `#${string}`;
type NameColor = 'orange' | 'yellow' | 'olive' | 'teal' | 'violet' | 'purple' | 'pink' | 'brown' | 'grey' | 'red' | 'green' | 'blue' | 'black';

export type TextProperties = {
    value?: string,
    position?: 'top' | 'right' | 'bottom' | 'left';
    color?: Color<NameColor>;
    className?: string;
}

export type Properties = RefAttributes<HTMLElement> & {

    id?: string;

    name?: string;

    label?: string | TextProperties | ReactNode;

    value?: string;

    checked?: boolean;

    disabled?: boolean;

    required?: boolean;

    icon?: ReactNode;

    checkedIcon?: ReactNode;

    size?: Size<'normal' | 'small' | 'big'>;

    color?: Color<NameColor>;

    className?: string;

    onChange?: (event: SyntheticEvent, properties: Properties) => void;
}