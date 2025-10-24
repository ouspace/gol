import { useState, useEffect, useCallback } from 'react';
import type { ComponentProps, ReactNode } from 'react';
import { TextField as TextFieldComponent } from '../text-field';

export function useControlledString(initial = '') {
  const [value, setValue] = useState(initial);
  return {
    value,
    onChange: setValue,
    setValue,
  };
}

export function TextFieldWithState(props: ComponentProps<typeof TextFieldComponent>) {
  const [localValue, setLocalValue] = useState((props.value as string) ?? '');

  useEffect(() => {
    if (props.value !== undefined && props.value !== localValue) {
      setLocalValue(props.value as string);
    }
  }, [props.value]);

  const handleChange = useCallback(
    (v: string) => {
      setLocalValue(v);
      props.onChange?.(v as never);
    },
    [props],
  );

  return <TextFieldComponent {...props} value={localValue} onChange={handleChange} />;
}

export const createIcon = (icon: ReactNode, className?: string) => (
  <span className={className}>{icon}</span>
);

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const MAX_BIO_LENGTH = 120;

export interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  bio: string;
}

export type ValidationErrors = Partial<Record<keyof FormData, string>>;

export function validateForm(form: FormData): ValidationErrors {
  const errors: ValidationErrors = {};
  if (!form.firstName.trim()) errors.firstName = 'First name is required';
  if (!form.lastName.trim()) errors.lastName = 'Last name is required';
  if (!EMAIL_REGEX.test(form.email)) errors.email = 'Invalid email address';
  if (form.bio.length > MAX_BIO_LENGTH) errors.bio = `Bio must be under ${MAX_BIO_LENGTH} characters`;
  return errors;
}

export function omitKey<T extends object, K extends keyof T>(obj: T, key: K): Omit<T, K> {
  const { [key]: _, ...rest } = obj;
  return rest;
}

export interface InputTypesState {
  text: string;
  email: string;
  password: string;
  tel: string;
  url: string;
  search: string;
  number: string;
}

export interface InteractiveState {
  normal: string;
  focused: string;
  error: string;
  disabled: string;
}