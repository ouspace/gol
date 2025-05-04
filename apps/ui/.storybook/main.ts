import type { StorybookConfig } from '@storybook/react-vite';

import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { mergeConfig } from 'vite';
import react from '@vitejs/plugin-react';

const config: StorybookConfig = {
	stories: ['../src/**/*.@(mdx|stories.@(js|jsx|ts|tsx))'],
	addons: ['@storybook/addon-essentials', '@storybook/addon-interactions'],
	framework: {
		name: '@storybook/react-vite',
		options: {},
	},
	docs: {
		defaultName: 'Documentation',
	},
	viteFinal: async (config) =>
		mergeConfig(config, {
			define: {
				global: 'window',
			},
			resolve: {
				extensions: [
					'.mjs',
					'.web.tsx',
					'.tsx',
					'.web.ts',
					'.ts',
					'.web.jsx',
					'.jsx',
					'.web.js',
					'.js',
					'.css',
					'.json',
					...(config.resolve?.extensions ?? []),
				],
				alias: {
					'react-native': 'react-native-web',
				},
			},
			plugins: [react(), nxViteTsPaths()],
		}),
};

export default config;

// To customize your Vite configuration you can use the viteFinal field.
// Check https://storybook.js.org/docs/react/builders/vite#configuration
// and https://nx.dev/recipes/storybook/custom-builder-configs
