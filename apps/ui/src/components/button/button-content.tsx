import React from 'react';

interface ButtonContentProperties {
	icon?: React.ReactNode;
	children?: React.ReactNode;
}

export const ButtonContent: React.FC<ButtonContentProperties> = ({ icon, children }) => (
	<>
		{icon && <span className='button__icon'>{icon}</span>}
		{children && <span className='button__label'>{children}</span>}
	</>
);
