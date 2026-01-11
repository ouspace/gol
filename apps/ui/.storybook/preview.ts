// Replace your-renderer with the renderer you are using (e.g., react, vue3)
import type { Preview } from '@storybook/react-native-web-vite';

const preview: Preview = {
	// ...rest of preview
	//👇 Enables auto-generated documentation for all stories
	tags: ['autodocs'],
	parameters: {
		docs: {
			controls: { exclude: ['style'] },
			toc: {
				title: 'Table of content'
			},
		},
		facelift: {
      hideStories: true, // Hides sibling stories in Docs view
    },
	}
};

export default preview;
