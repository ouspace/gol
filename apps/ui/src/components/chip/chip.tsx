import { useRef, useLayoutEffect, useMemo } from 'react';
import _ from 'lodash';

import type { ChipsProperties } from "./types";
import { toDefaults, toClasses, toRadius, toColor,toSize } from "./helpers";
import { Icon } from '../icon/index';
import "./styles/index.css";

/**
 * chip component
 *
 * @param {Properties} properties - refers to chip properties
 *
 * @example
 * <Chip role="assist" color="primary" variant="outlined"  onClick={handler}>Content</Chip>
 *
 * @returns {React.JSX.Element} element
 */

export default function Chip(properties?: ChipsProperties) {
	const defaults = toDefaults(properties);
	const reference = useRef<HTMLElement | null>(null);
	const Element = defaults.href ? 'a' : 'span';
	const { radius, color, size } = useMemo(() => ({
  		radius: toRadius(defaults),
  		color: toColor(defaults),
		size: toSize(defaults)
  	}), [defaults]);
	
	useLayoutEffect(() => {
		if (!reference.current) return;
		if (defaults.disabled) {reference.current.setAttribute('aria-disabled', 'true');}
		if (defaults.selected) {reference.current.setAttribute('aria-pressed', 'true');}
		if (radius) {reference.current.style.setProperty('--chip-border-radius-inject', radius);}
  		reference.current.style.setProperty('--chip-color-inject', color);	
		reference.current.style.setProperty('--chip-size-inject', `${size}px`);
	}, [defaults.disabled, defaults.selected, radius, color, size]);
	
	return (
		<Element
			ref={(element: HTMLElement | null) => {reference.current = element;}}
			className={toClasses(defaults)}
			href={defaults.href}
			target={defaults.target}
			tabIndex={0}
			onClick={(event) => {
				if (defaults.disabled) return;
				if (defaults.role === 'filter' && defaults.onToggle !== _.noop) {
					defaults.onToggle(event, !defaults.selected, defaults);
				} else {
					defaults.onClick(event, defaults);
				}
			}}
		>
			{defaults.avatar && (
				<span className="chip__avatar">
					{defaults.avatar}
				</span>
			)}
			
			{!defaults.avatar && defaults.icon && defaults.role !== 'suggestion' && (
				<span className="chip__icon">
					{defaults.icon}
				</span>
			)}

			<span className="chip__content">
				{defaults.children}
			</span>
			
			{defaults.role === 'input' && defaults.onRemove !== _.noop && (
				<button
					className="chip__remove"
					type="button"
					onClick={(event) => {
						event.stopPropagation();
						if (defaults.disabled) return;
						defaults.onRemove(event, defaults);
					}}
					disabled={defaults.disabled}
					aria-label="Remove"
				>
					<Icon 
						name="close" 
						size="small" 
						variant="outlined"
						color="black"
					/>
				</button>
			)}
		</Element>
	);
}

