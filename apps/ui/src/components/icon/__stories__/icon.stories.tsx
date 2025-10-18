import type { Meta, StoryObj } from '@storybook/react';
import Icon from '../root';

const meta: Meta<typeof Icon> = {
	title: 'Components/Icon',
	component: Icon,
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Icon>;

// Default
export const Default: Story = {
	render: () => <Icon name='10k' />,
	args: { },
};
