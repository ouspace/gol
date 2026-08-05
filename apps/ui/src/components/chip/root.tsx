import { useRef, type Ref, type SyntheticEvent } from 'react';
import _ from 'lodash';

import type { Properties } from './types';
import {
	toDefaults,
	toClass,
	toRadius,
	toColor,
	toSize,
	toNativeAnchorProperties,
} from './helpers';
import { Icon } from '../icon';
import { Text } from '../text';
import './styles/index.css';

/**
 * Chip component
 *
 * Renders an anchor when `href` is provided, otherwise a semantic `<button>`.
 * Inherits keyboard activation (Space/Enter) from the native element.
 *
 * @summary compact tag for input/attribute/action; polymorphic anchor|button in 4 roles
 *
 * @example
 * <Chip role="assist" color="primary" variant="outlined" onClick={handler}>Content</Chip>
 *
 * @param {Properties} properties - refers to chip properties
 * @returns {React.JSX.Element} element
 */
export default function Chip(properties?: Properties) {
	const defaults = toDefaults(properties);
	const reference = (properties?.ref ?? useRef<HTMLElement | null>(null)) as Ref<HTMLElement>;

	const size = toSize(properties?.size);
	const color = toColor(properties?.color);
	const radius = toRadius(properties?.radius);

	const style = {
		...properties?.style,
		...(size && { '--chip-size-inject': size }),
		...(color && { '--chip-color-inject': color }),
		...(radius && { '--chip-border-radius-inject': radius }),
	} as React.CSSProperties;

	const handleClick = (event: SyntheticEvent) => {
		if (defaults.disabled) return;
		if (defaults.role === 'filter' && defaults.onToggle !== _.noop) {
			defaults.onToggle(event, !defaults.selected, defaults);
		} else {
			defaults.onClick(event, defaults);
		}
	};

	const handleRemove = (event: SyntheticEvent) => {
		event.stopPropagation();
		if (defaults.disabled) return;
		defaults.onRemove(event, defaults);
	};

	const handleRemoveKeyDown = (event: React.KeyboardEvent) => {
		if (event.key !== 'Enter' && event.key !== ' ') return;
		event.preventDefault();
		event.stopPropagation();
		if (defaults.disabled) return;
		defaults.onRemove(event, defaults);
	};

	const showIcon = !defaults.avatar && !!defaults.icon && defaults.role !== 'suggestion';
	const showRemove = defaults.role === 'input' && properties?.onRemove != null;

	const body = (
		<>
			{defaults.avatar && <span className='avatar'>{defaults.avatar}</span>}

			{showIcon && <span className='icon'>{defaults.icon}</span>}

			<span className='content'>
				{_.isEmpty(defaults.children)
					? Text.createFrom(defaults.label ?? undefined)
					: defaults.children}
			</span>

			{showRemove && (
				<span
					className='remove'
					role='button'
					tabIndex={defaults.disabled ? -1 : 0}
					aria-label='Remove'
					aria-disabled={defaults.disabled || undefined}
					onClick={handleRemove}
					onKeyDown={handleRemoveKeyDown}>
					<Icon name='close' size='small' variant='outlined' color='black' />
				</span>
			)}
		</>
	);

	const isAnchor = defaults.href != null;
	const Element = (isAnchor ? 'a' : 'button') as React.ElementType;
	const elementProperties = isAnchor
		? {
				ref: reference as Ref<HTMLAnchorElement>,
				href: defaults.href,
				target: defaults.target,
				tabIndex: defaults.disabled ? -1 : 0,
				'aria-disabled': defaults.disabled || undefined,
				...toNativeAnchorProperties(properties),
			}
		: {
				ref: reference as Ref<HTMLButtonElement>,
				type: 'button' as const,
				disabled: defaults.disabled,
			};

	return (
		<Element
			style={style}
			className={toClass(defaults, properties)}
			aria-pressed={defaults.selected}
			onClick={handleClick}
			{...elementProperties}>
			{body}
		</Element>
	);
}
