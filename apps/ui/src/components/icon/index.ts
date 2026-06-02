import './styles/index.css';
import IconComponent from './root';
import { createFrom } from './factory';

export const Icon = Object.assign(IconComponent, { createFrom });
export type { Properties as IconProperties } from './types';
