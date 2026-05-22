// helpers.ts
import { type Properties } from './types';

export const toDefaults = (properties?: Properties) => ({
  label: properties?.label ?? 'Button',
  variant: properties?.variant ?? 'primary',
  size: properties?.size ?? 'medium',
  disabled: properties?.disabled ?? false,
  onClick: properties?.onClick ?? (() => {}),
  className: properties?.className ?? '',
  style: properties?.style ?? {},
  ref: properties?.ref,
});
