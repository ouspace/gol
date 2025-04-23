export const generateId = (): string => {
	return `checkbox-${Math.random().toString(36).slice(2, 9)}`;
};
