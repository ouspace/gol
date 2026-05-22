import { type Properties } from './types';

/**
 * Normalizes properties and applies default values.
 */
export const toDefaults = (properties?: Properties) => ({
  className: properties?.className ?? '',
  style: properties?.style ?? {},
  children: properties?.children ?? null,
});
