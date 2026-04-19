import React from 'react';
import type { Properties } from '../types';

export default function Icon(properties: Properties) {
	return <span>{properties.name}</span>;
}
