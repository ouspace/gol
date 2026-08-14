import type { Meta, StoryObj } from '@storybook/react-vite';

import Text from '../root';

const meta: Meta<typeof Text> = {
	title: 'Components/Text',
	component: Text,
	tags: ['autodocs'],
	argTypes: {
		as: {
			control: 'select',
			options: ['span', 'p', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'label'],
		},
		scale: {
			control: 'select',
			options: [
				'display-large',
				'display-medium',
				'display-small',
				'headline-large',
				'headline-medium',
				'headline-small',
				'title-large',
				'title-medium',
				'title-small',
				'label-large',
				'label-medium',
				'label-small',
				'body-large',
				'body-medium',
				'body-small',
			],
		},
		size: {
			control: 'select',
			options: ['small', 'normal', 'big'],
		},
		weight: {
			control: 'select',
			options: ['normal', 'bold', 'lighter', 'bolder', 'inherit'],
		},
		color: {
			control: 'color',
		},
		lineHeight: {
			control: 'select',
			options: ['normal', 'inherit'],
		},
		align: {
			control: 'select',
			options: ['left', 'center', 'right', 'justify', 'start', 'end', 'inherit'],
		},
		letterSpacing: {
			control: 'select',
			options: ['normal'],
		},
		decoration: {
			control: 'select',
			options: ['none', 'underline', 'overline', 'line-through'],
		},
		italic: {
			control: 'boolean',
		},
		transform: {
			control: 'select',
			options: ['none', 'uppercase', 'lowercase', 'capitalize'],
		},
		wrap: {
			control: 'boolean',
		},
		unselectable: {
			control: 'boolean',
		},
		disabled: {
			control: 'boolean',
		},
	},
};

export default meta;
type Story = StoryObj<typeof Text>;

/**
 * @summary the default text — the simplest typography primitive with content only
 */
export const Default: Story = {
	args: {
		content: 'Default text',
	},
};

/**
 * @summary the full Material 3 type scale (display, headline, title, label, body) for choosing a level
 */
export const TypeScale: Story = {
	render: () => (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
			<Text as='p' scale='display-large'>
				display-large
			</Text>
			<Text as='p' scale='display-medium'>
				display-medium
			</Text>
			<Text as='p' scale='display-small'>
				display-small
			</Text>
			<Text as='p' scale='headline-large'>
				headline-large
			</Text>
			<Text as='p' scale='headline-medium'>
				headline-medium
			</Text>
			<Text as='p' scale='headline-small'>
				headline-small
			</Text>
			<Text as='p' scale='title-large'>
				title-large
			</Text>
			<Text as='p' scale='title-medium'>
				title-medium
			</Text>
			<Text as='p' scale='title-small'>
				title-small
			</Text>
			<Text as='p' scale='label-large'>
				label-large
			</Text>
			<Text as='p' scale='label-medium'>
				label-medium
			</Text>
			<Text as='p' scale='label-small'>
				label-small
			</Text>
			<Text as='p' scale='body-large'>
				body-large
			</Text>
			<Text as='p' scale='body-medium'>
				body-medium
			</Text>
			<Text as='p' scale='body-small'>
				body-small
			</Text>
		</div>
	),
};

/**
 * @summary text states — disabled, italic, no-wrap, and unselectable — that affect appearance and behavior
 */
export const States: Story = {
	render: () => (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
			<Text content='Default' />
			<Text content='Disabled' disabled />
			<Text content='Italic' italic />
			<Text
				content='No wrap — this long text will not wrap no matter how wide or narrow the container is'
				wrap={false}
			/>
			<Text content='Unselectable — try to select this text' unselectable />
		</div>
	),
};

const colorTokens = ['black', 'red', 'green', 'blue', 'orange', 'purple', 'teal', 'pink', 'brown', 'grey'] as const;

/**
 * @summary the preset semantic color tokens available for text
 */
export const Colors: Story = {
	render: () => (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
			{colorTokens.map((color) => (
				<Text key={color} content={color} color={color} />
			))}
		</div>
	),
};

/**
 * @summary numeric and keyword font weights for emphasizing or de-emphasizing text
 */
export const Weights: Story = {
	render: () => (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
			<Text content='weight: 300 (light)' weight={300} />
			<Text content='weight: 400 (normal)' weight={400} />
			<Text content='weight: 600 (semibold)' weight={600} />
			<Text content='weight: 700 (bold)' weight={700} />
			<Text content='weight: bold (keyword)' weight='bold' />
		</div>
	),
};
