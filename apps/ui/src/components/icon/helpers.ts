import _ from 'lodash'
import { match, P } from 'ts-pattern';

import { type Properties } from './types';

/**
 *
 * @param properties
 * @returns
 */
export function toDefaults(properties?: Properties): Required<Properties> {
	return _.defaults({}, properties, {
		color: 'black',
		variant: 'outlined',
		weight: 'normal',
		size: 'normal',
		fill: false,
		disabled: false,
		onClick: _.noop,
	}) as Required<Properties>;
}

/**
 *
 * @param properties
 * @returns
 */
export function toFill(properties: Required<Properties>): string {
	return match({ fill: properties.fill })
		.with({ fill: true }, () => 'fillest')
		.otherwise(() => 'filless');
}

/**
 *
 * @param properties
 * @returns
 */
export function toSize(properties: Required<Properties>): number {
	return match({ size: properties.size })
		.with({ size: 'smallest' }, () => 8)
		.with({ size: 'small' }, () => 12)
		.with({ size: 'smallless' }, () => 16)
		.with({ size: 'normal' }, () => 20)
		.with({ size: 'bigless' }, () => 24)
		.with({ size: 'big' }, () => 28)
		.with({ size: 'biggest' }, () => 32)
		.otherwise(() => properties.size as number);
}

/**
 *
 * @param properties
 * @returns
 */
export function toWeight(properties: Required<Properties>): number {
	return match({ weight: properties.weight })
		.with({ weight: 'lightest' }, () => 100)
		.with({ weight: 'light' }, () => 200)
		.with({ weight: 'lightless' }, () => 300)
		.with({ weight: 'normal' }, () => 400)
		.with({ weight: 'boldless' }, () => 500)
		.with({ weight: 'bold' }, () => 600)
		.with({ weight: 'boldest' }, () => 700)
		.otherwise(() => properties.weight as number);
}

/**
 *
 * @param properties
 * @returns
 */
export function toRotate(properties: Required<Properties>): string {
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
