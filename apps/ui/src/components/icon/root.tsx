import React, { useRef, useMemo, type RefObject } from 'react';
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
	const dictionary = useMemo(() => icons as Record<string, string>, []);
	const svg = useMemo(() => {
		return {
			xml: dictionary[iconKey],
			color: defaults.color,
			fill: defaults.color,
			viewBox: defaults.viewBox,
		}
	}, [iconKey, defaults, dictionary]);

	const style = useMemo(() => {
		return {
			'--icon-size-inject': size,
			'--icon-rotate-inject': rotate,
			'--icon-weight-inject': toWeight(defaults),
			'--icon-color-inject': defaults.color,
		}
	}, [defaults, size, rotate]);

	return (
		<span ref={defaults.ref}
			key={defaults.key}
			name={defaults.name}
			role='icon'
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
				height={'100%'}
				width={'100%'}
				disabled={defaults.disabled}
			/>
		</span>
	);
}
