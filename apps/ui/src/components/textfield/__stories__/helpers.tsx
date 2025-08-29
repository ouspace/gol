import React, { useState } from "react";
import type { ComponentProps, ReactNode } from "react";
import { TextField as TextFieldComponent } from "../text-field"; // ⚠️ Ajusta según tu ruta real

/**
 * Hook para manejar un estado controlado de string.
 */
export function useControlledString(initial = "") {
	const [value, setValue] = useState(initial);
	return {
		value,
		onChange: (newValue: string) => { setValue(newValue); },
	};
}

/**
 * Envuelve TextField para que Storybook lo controle con estado interno.
 */
export function TextFieldWithState(properties: ComponentProps<typeof TextFieldComponent>) {
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
export const withIcon = (icon: ReactNode) => ({
	startIcon: icon,
});
