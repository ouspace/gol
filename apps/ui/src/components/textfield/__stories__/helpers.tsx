import React, { useState } from "react";
import type { ComponentProps, ReactNode } from "react";
import { TextField as TextFieldComponent } from "../text-field";

/**
 * Hook para manejar un estado controlado de string.
 */
export function useControlledString(initial = "") {
  const [value, setValue] = useState(initial);
  const setValueSafe = (v: string) => setValue(v);
  return {
    value,
    onChange: setValueSafe,
    setValue: setValueSafe,
  };
}

/**
 * Envuelve TextField para que Storybook lo controle con estado interno.
 */
export function TextFieldWithState(
  properties: ComponentProps<typeof TextFieldComponent>
) {
  const { value, onChange } = useControlledString(
    (properties.value as string) ?? ""
  );

  return (
    <TextFieldComponent
      {...properties}
      value={value}
      onChange={onChange}
    />
  );
}

/**
 * Utilidad para agregar íconos en los stories sin acoplarlos.
 */
export const createIcon = (icon: ReactNode, className?: string) => (
  <span className={className}>{icon}</span>
);

// =======================
// Constantes y helpers extras
// =======================

/** Regex simple para validar emails */
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Límite de caracteres para biografía */
export const MAX_BIO_LENGTH = 120;

/** Tipos para formularios */
export interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  bio: string;
}

export type ValidationErrors = Partial<Record<keyof FormData, string>>;

/** Valida un formulario de ejemplo */
export function validateForm(form: FormData): ValidationErrors {
  const errors: ValidationErrors = {};
  if (!form.firstName.trim()) errors.firstName = "First name is required";
  if (!form.lastName.trim()) errors.lastName = "Last name is required";
  if (!EMAIL_REGEX.test(form.email)) errors.email = "Invalid email address";
  if (form.bio.length > MAX_BIO_LENGTH)
    errors.bio = `Bio must be under ${MAX_BIO_LENGTH} characters`;
  return errors;
}

/** Omite una key de un objeto */
export function omitKey<T extends object, K extends keyof T>(
  obj: T,
  key: K
): Omit<T, K> {
  const { [key]: _, ...rest } = obj;
  return rest;
}

/** Estados para demos */
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
