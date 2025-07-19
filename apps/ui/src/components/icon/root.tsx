import { useRef, useLayoutEffect, useMemo, type RefObject } from 'react';
import clsx from 'clsx';
import { SvgXml } from 'react-native-svg';
import _ from 'lodash';

import icons from './icon.list.lfs';
import type { Properties } from './types';
import { toDefaults, toFill, toSize, toWeight, toRotate } from './helpers';
import './styles/index.css';

/**
 * Icon component
 *
 * @param {Properties} properties - refers to icon properties
 *
 * @example
 * <Icon name="1k" size="small" color="black" variant="outlined" />
 *
 * @returns {React.JSX.Element} element
 */
export default function Icon(properties?: Properties) {
	const defaults = toDefaults(properties);
	const iconKey = `${defaults.name}__${defaults.variant}_${toFill(defaults)}_${defaults.weight}`;
	const reference = (defaults.ref ?? useRef<HTMLElement>(null)) as RefObject<HTMLElement | null>;
	const svg = useMemo(() => {
		const dictionary = icons as Record<string, string>;
		const size = toSize(defaults);

		return {
			xml: dictionary[iconKey],
			color: defaults.color,
			height: size,
			width: size,
		}
	}, [iconKey, defaults.color]);

	useLayoutEffect(() => {
		if (!reference.current) return;
		if (defaults.weight) { reference.current.style.setProperty('--icon-weight-inject', `${toWeight(defaults)}`); }
		if (!_.isUndefined(defaults.rotated)) { reference.current.style.setProperty('--icon-rotate-inject', toRotate(defaults)); }

		reference.current.style.setProperty('--icon-color-inject', defaults.color);
	}, [reference.current]);

	return (
		<i ref={reference}
			key={defaults.key}
			className={clsx({
				circular: defaults.circular,
				bordered: defaults.bordered,
				disabled: defaults.disabled,
				inverted: defaults.inverted,
				rotated: !_.isUndefined(defaults.rotated),
			}, 'icon')}
			onClick={(event) => {
				if (defaults.disabled) return;

				defaults.onClick(event, defaults);
			}}
		>
			<SvgXml xml={svg.xml} color={svg.color} height={svg.height} width={svg.width} disabled={defaults.disabled} />
		</i>
	);
}
