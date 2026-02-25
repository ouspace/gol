import { useRef, useLayoutEffect, useMemo, type RefObject } from 'react';
import clsx from 'clsx';
import { SvgXml } from 'react-native-svg';
import _ from 'lodash';

import icons from './icon.list.lfs';
import { type Properties, Mode } from './types';
import { toDefaults, toFill, toWeight, toRotate, toSize, isSizeEnum } from './helpers';
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
	const size = toSize(defaults);
	const weight = toWeight(defaults, { mode: Mode.Init });
	const rotate = toRotate(defaults);

	const iconKey = `${defaults.name}__${defaults.variant}_${toFill(defaults)}_${weight}`;

	console.log('::iconKey::', iconKey);

	const reference = (defaults.ref ?? useRef<HTMLElement>(null)) as RefObject<HTMLElement | null>;
	const dictionary = useMemo(() => icons as Record<string, string>, []);
	const svg = useMemo(() => {

		return {
			xml: dictionary[iconKey],
			color: defaults.color,
			fill: defaults.color,
			viewBox: defaults.viewBox,
			height: size,
			width: size,
		}
	}, [iconKey, defaults]);
	const style = useMemo(() => {
		return {
			'--icon-size-inject': size,
			'--icon-rotate-inject': rotate,
			'--icon-weight-inject': toWeight(defaults),
			'--icon-color-inject': defaults.color,
		}
	}, [defaults]);

	return (
		<i ref={reference}
			key={defaults.key}
			// // @ts-expect-error unsupported `name` attribute for <i> element.
			name={defaults.name}
			role='icon'
			// @ts-expect-error unsupported `style` attribute for <i> element.
			style={style}
			className={clsx({
				[defaults.size as string]: isSizeEnum(defaults),
				circular: defaults.circular,
				bordered: defaults.bordered,
				disabled: defaults.disabled,
				inverted: defaults.inverted,
				rotated: !_.isUndefined(defaults.rotated),
			}, 'icon')}
			onClick={(event) => {
				if (defaults.disabled) return;

				defaults.onClick(event, _.omit(defaults, ['onClick']));
			}}
		>
			<SvgXml
				xml={svg.xml}
				viewBox={svg.viewBox}
				color={svg.color}
				fill={svg.fill}
				height={svg.height}
				width={svg.width}
				disabled={defaults.disabled}
			/>
		</i>
	);
}
