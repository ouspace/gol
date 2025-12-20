import _ from 'lodash';
import clsx from 'clsx';
import { match, P } from 'ts-pattern';
import { isValidElement } from 'react';
import type { Properties, TextProperties } from './types';

export function toDefaults(properties?: Properties): Required<Properties> {
    return _.defaults({}, properties, {
        id: generateId(),
        name: '',
        label: null,
        value: '',
        checked: false,
        disabled: false,
        required: false,
        icon: null,
        checkedIcon: null,
        size: 'normal',
        color: 'blue',
        className: '',
        onChange: _.noop,
    }) as Required<Properties>;
}

export const generateId = (): string => {
    return `radio-${Math.random().toString(36).slice(2, 9)}`;
};

export function toLabelProperties(label?: string | TextProperties | React.ReactNode): TextProperties | null {
    return match(label)
        .with(P.string, (value) => ({
            value,
            position: 'right' as const,
            color: undefined,
            className: undefined,
        }))
        .with(P.nullish, () => null)
        .with(
            P.when((value) => typeof value === 'object' && !isValidElement(value)),
            (textProperties) => _.defaults({}, textProperties as TextProperties, {
                value: '',
                position: 'right',
                color: undefined,
                className: undefined,
            })
        )
        .otherwise(() => null);
}

export function toSize(properties: Required<Properties>): number {
    return match({ size: properties.size })
        .with({ size: 'small' }, () => 16)
        .with({ size: 'normal' }, () => 20)
        .with({ size: 'big' }, () => 24)
        .otherwise(() => properties.size as number);
}

export function toClasses(properties: Required<Properties>): string {
    const hasCustomIcon = properties.icon !== null || properties.checkedIcon !== null;
    const labelProperties = toLabelProperties(properties.label);
    const labelPosition = labelProperties?.position ?? 'right';

    return clsx(
        'radio',
        properties.size,
        `label-${labelPosition}`,
        properties.className,
        {
            checked: properties.checked,
            disabled: properties.disabled,
            'has-custom-icon': hasCustomIcon,
        }
    )
}


