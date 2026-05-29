import TextComponent from './root';
import { createFrom } from './factory';

export const Text = Object.assign(TextComponent, { createFrom });
export type { Properties as TextProperties } from './types';
