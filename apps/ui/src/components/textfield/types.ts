import type { InputHTMLAttributes, ReactNode } from 'react';

/**
 * TextField variant types following Material Design 3
 */
export type TextFieldVariant = 'filled' | 'outlined';

/**
 * TextField input modes for better mobile UX
 */
export type TextFieldInputMode =
  | 'text'
  | 'decimal'
  | 'numeric'
  | 'tel'
  | 'search'
  | 'email'
  | 'url';

/**
 * TextField input types
 */
export type TextFieldType =
  | 'text'
  | 'password'
  | 'email'
  | 'tel'
  | 'url'
  | 'search'
  | 'number';

/**
 * Generated IDs for TextField elements
 */
export interface TextFieldIds {
  input?: string;
  label?: string;
  supporting?: string;
  error?: string;
  counter?: string;
  prefix?: string;
  suffix?: string;
}

/**
 * Properties for TextField ARIA attributes
 */
export interface TextFieldAriaProperties {
  /** Label text */
  label?: string;
  /** Required state */
  required?: boolean;
  /** Error state */
  error?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Supporting text */
  supportingText?: string;
  /** Error text */
  errorText?: string;
  /** Maximum character length */
  max?: number;
  /** Current value */
  value?: string;
  /** ARIA properties */
  'aria-label'?: string;
  'aria-required'?: boolean;
  'aria-invalid'?: boolean;
  [key: string]: unknown;
}

/**
 * Properties for TextField validation
 */
export interface TextFieldValidationProperties {
  /** Current input value */
  value?: string | number | undefined;
  /** Maximum character length */
  max?: number;
  /** Whether field is required */
  required?: boolean;
  /** Regex pattern for validation */
  pattern?: string;
  /** Input type */
  type?: TextFieldType;
}

/**
 * Properties for generating TextField class names
 */
export interface TextFieldClassNameProperties {
  /** Visual variant */
  variant?: TextFieldVariant;
  /** Error state */
  error?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Focused state */
  focused?: boolean;
  /** Hovered state */
  hovered?: boolean;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Main TextField component properties
 */
export interface TextFieldProperties extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
  /** Unique identifier */
  id?: string;

  /** Input value (controlled) */
  value?: string | number | undefined;

  /** Default input value (uncontrolled) */
  defaultValue?: string | number | undefined;

  /** Change handler */
  onChange?: (value: string) => void;

  /** Label text */
  label?: string;

  /** Placeholder text */
  placeholder?: string;

  /** Required field indicator */
  required?: boolean;

  /** Disabled state */
  disabled?: boolean;

  /** Read-only state */
  readOnly?: boolean;

  /** Visual variant following Material Design 3 */
  variant?: TextFieldVariant;

  /** Error state */
  error?: boolean;

  /** Error message text */
  errorText?: string;

  /** Supporting/helper text */
  supportingText?: string;

  /** Leading icon element */
  leadingIcon?: ReactNode;

  /** Trailing icon element */
  trailingIcon?: ReactNode;

  /** Accessible label for trailing icon */
  trailingIconLabel?: string;

  /** Text prefix */
  prefix?: string;

  /** Accessible label for prefix */
  prefixLabel?: string;

  /** Text suffix */
  suffix?: string;

  /** Accessible label for suffix */
  suffixLabel?: string;

  /** Maximum character length */
  max?: number;

  /** Show character counter */
  showCounter?: boolean;

  /** Additional CSS classes */
  className?: string;

  /** Input type */
  type?: TextFieldType;

  /** Autocomplete attribute */
  autoComplete?: string;

  /** Auto focus on mount */
  autoFocus?: boolean;

  /** Form field name */
  name?: string;

  /** Validation pattern */
  pattern?: string;

  /** Input mode for mobile keyboards */
  inputMode?: TextFieldInputMode;

  /** ARIA label override */
  'aria-label'?: string;

  /** ARIA described-by override */
  'aria-describedby'?: string;

  /** Focus event handler */
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;

  /** Blur event handler */
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;

  /** Forced focused state (for testing/Storybook) */
  focused?: boolean;

  /** Forced hovered state (for testing/Storybook) */
  hovered?: boolean;
}