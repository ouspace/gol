import React from 'react';

export default function Text(properties: { children?: React.ReactNode; content?: React.ReactNode }) {
	return <span>{properties.children ?? properties.content}</span>;
}
