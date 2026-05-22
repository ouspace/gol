import { useMemo } from 'react';
import clsx from 'clsx';
import { SvgXml } from 'react-native-svg';
import _ from 'lodash';

import icons from './icon.list.lfs';
import { type Properties, type IconStyle } from './types';
import { toDefaults, toWeight, toRotate, toSize, isSizeEnum, toKey } from './helpers';
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
	const iconKey = toKey(defaults);
	const dictionary = useMemo(() => icons as Record<string, string>, []);
	const svg = useMemo(() => {
		return {
			xml: defaults.svg || dictionary[iconKey],
			color: 'currentColor',
			fill: 'currentColor',
			viewBox: defaults.viewBox,
		}
	}, [iconKey, defaults.svg, defaults.viewBox, dictionary]);

	const style = useMemo<IconStyle>(() => {
		const rules: IconStyle = {};
		if (properties?.size) {
			const sizeValue = toSize(defaults);
			if (sizeValue) {
				rules['--icon-size'] = sizeValue;
			}
		}
		if (properties?.rotated) {
			const rotateValue = toRotate(defaults);
			if (rotateValue) {
				rules['--icon-rotate'] = rotateValue;
			}
		}
		if (properties?.weight) {
			rules['--icon-weight'] = toWeight(defaults);
		}
		if (properties?.color) {
			rules['--icon-color'] = defaults.color;
		}

		return _.defaults({}, defaults.style, rules);
	}, [properties?.size, properties?.rotated, properties?.weight, properties?.color, defaults]);

	const isClickable = defaults.onClick !== _.noop || defaults.role === 'button';
	const role = isClickable ? 'button' : 'img';
	const tabIndex = isClickable ? (defaults.disabled ? -1 : 0) : undefined;
	const ariaHidden = isClickable ? undefined : 'true';
	const ariaDisabled = defaults.disabled ? 'true' : undefined;

	const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
		if (defaults.disabled) {
			event.preventDefault();
			return;
		}
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			defaults.onClick(event as unknown as React.SyntheticEvent, _.omit(defaults, ['onClick']));
		}
		properties?.onKeyDown?.(event);
	};

	const omit = [
		'svg',
		'size',
		'color',
		'weight',
		'fill',
		'variant',
		'disabled',
		'bordered',
		'flipped',
		'inverted',
		'rotated',
		'circular',
		'viewBox',
		'onClick',
		'ref',
		'key',
		'className',
	];

	return (
		<span
			{..._.omit(defaults, omit)}
			ref={defaults.ref}
			key={defaults.key}
			// name={defaults.name}
			role={role}
			tabIndex={tabIndex}
			aria-hidden={ariaHidden}
			aria-disabled={ariaDisabled}
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
			onKeyDown={isClickable ? handleKeyDown : properties?.onKeyDown}
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

