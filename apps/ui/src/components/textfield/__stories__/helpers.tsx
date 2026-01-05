import { useState } from 'react';
import type { ReactNode } from 'react';

/**
 * Custom hook for controlled string input
 */
export function useControlledString(initial = '') {
  const [value, setValue] = useState(initial);
  return {
    value,
    onChange: setValue,
    setValue,
  };
}

/**
 * Regular expression for email validation
 */
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Maximum length for bio field
 */
export const MAX_BIO_LENGTH = 120;

/**
 * Interface for form data used in examples
 */
export interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  bio: string;
}

/**
 * State interface for input types example
 */
export interface InputTypesState {
  text: string;
  email: string;
  password: string;
  tel: string;
  url: string;
  search: string;
  number: string;
}

/**
 * State interface for interactive states example
 */
export interface InteractiveState {
  normal: string;
  focused: string;
  error: string;
  disabled: string;
}