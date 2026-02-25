import _ from 'lodash'
import { match, P } from 'ts-pattern';

import { type Properties, type Options, Mode } from './types';

/**
 *
 * @param properties
 * @returns
 */
export function toDefaults(properties?: Properties): Required<Properties> {
	const defaults = _.defaults({}, properties, {
		variant: 'outlined',
		// fill: false,
		disabled: false,
		// INFO: This viewBox value applies to Google Icons only
		viewBox: '120 -840 720 720',
		onClick: _.noop,
	}) as Required<Properties>;

	return defaults;
}

/**
 *
 * @param properties
 * @returns
 */
export function toFill(properties: Required<Properties>): string {
	return match({ fill: properties.fill })
		.with({ fill: true }, () => 'fillest')
		.with({ fill: false }, () => 'filless')
		.otherwise(() => 'filless');
}

export function isSizeEnum(properties: Required<Properties>): boolean {
	return match(properties.size)
		.with(P.union('small', 'smallless', 'bigless', 'big'), () => true)
		.otherwise(() => false);
}

/**
 *
 * @param properties
 * @returns
 */
export function toSize(properties: Required<Properties>): string | undefined {
	const criteria = { size: properties.size };

	return match(criteria)
		.with({ size: { value: P.number, unit: P.union('px', 'rem', 'em', 'vw', 'vh') } }, ({ size }) => `${size.value}${size.unit}`)
		.with({ size: { value: P.number } }, ({ size }) => `${size.value}px`)
		.with({ size: P.number }, () => `${properties.size}px`)
		.otherwise(() => undefined);
}

/**
 *
 * @param properties
 * @returns
 */
export function toWeight(properties: Required<Properties>, options?: Options): Properties['weight'] {
	// if (_.isUndefined(properties.weight)) return undefined;

	const criteria = {
		weight: properties.weight,
		mode: options?.mode,
	};

	return match(criteria)
		// .with({ mode: Mode.Init, weight: 100 }, () => 'extra light')
		.with({ mode: Mode.Init, weight: 200 }, () => 'lightest')
		.with({ mode: Mode.Init, weight: 300 }, () => 'light')
		.with({ mode: Mode.Init, weight: 400 }, () => 'lightless')
		.with({ mode: Mode.Init, weight: 500 }, () => 'normal')
		.with({ mode: Mode.Init, weight: 600 }, () => 'boldless')
		.with({ mode: Mode.Init, weight: 700 }, () => 'bold')
		.with({ mode: Mode.Init, weight: 800 }, () => 'boldest')
		// .with({ mode: Mode.Init, weight: 900 }, () => 'extra bold')
		.with({ mode: Mode.Init, weight: P.union('lightest', 'light', 'lightless', 'normal', 'boldless', 'bold', 'boldest') }, ({ weight }) => weight)
		.with({ mode: Mode.Init, weight: P.union(P.string, P.number, P.nullish) }, () => 'normal')
		// .with({ weight: 'extra light' }, () => 100)
		.with({ weight: 'lightest' }, () => 200)
		.with({ weight: 'light' }, () => 300)
		.with({ weight: 'lightless' }, () => 400)
		.with({ weight: 'normal' }, () => 500)
		.with({ weight: 'boldless' }, () => 600)
		.with({ weight: 'bold' }, () => 700)
		.with({ weight: 'boldest' }, () => 800)
		// .with({ weight: 'extra bold' }, () => 900)
		.with({ weight: P.union(200, 300, 400, 500, 600, 700, 800) }, ({ weight }) => weight)
		.otherwise(() => undefined) as Properties['weight'];
}

/**
 *
 * @param properties
 * @returns
 */
export function toRotate(properties: Required<Properties>): string | undefined {
	if (_.isUndefined(properties.rotated)) return undefined;

	const value = match(properties.rotated)
		.with(P.boolean.and(true), () => 180)
		.with(P.string.and('east'), () => 90)
		.with(P.string.and('south'), () => 180)
		.with(P.string.and('west'), () => 270)
		.with(P.shape({ value: P.number }), (rotate) => rotate.value)
		.otherwise(() => 0); // by default when: false | 'north'

	const unit = match(properties.rotated)
		.with(P.shape({ unit: P.string }), (rotate) => rotate.unit)
		.otherwise(() => 'deg');

	const direction = match(properties.rotated)
		.with(P.shape({ direction: P.string.and('counter-clockwise') }), () => -1)
		.otherwise(() => 1);

	return `${value * direction}${unit}`;
}
