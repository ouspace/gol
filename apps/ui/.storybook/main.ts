import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import type { StorybookConfig } from '@storybook/react-vite';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { mergeConfig } from 'vite';
import { getCodeEditorStaticDirs } from 'storybook-addon-code-editor/getStaticDirs';

const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config: StorybookConfig = {
	stories: ['../src/**/*.@(mdx|stories.@(js|jsx|ts|tsx))'],
	addons: [
		getAbsolutePath('storybook-addon-code-editor'),
		getAbsolutePath('@storybook/addon-docs'),
		getAbsolutePath('@storybook/addon-a11y'),
		getAbsolutePath('@storybook/addon-vitest'),
		{
			name: getAbsolutePath('@storybook/addon-mcp'),
			options: {
				toolsets: {
					dev: true,
					docs: true,
					test: true,
				},
			},
		},
	],
	framework: {
		name: getAbsolutePath('@storybook/react-native-web-vite'),
		options: {},
	},
	docs: {
		defaultName: 'Documentation',
	},
	build: {
		test: {
			disableBlocks: false,
			disableDocgen: false,
		},
	},
	typescript: {
		reactDocgen: 'react-docgen-typescript',
		reactDocgenTypescriptOptions: {
			shouldExtractLiteralValuesFromEnum: true,
			propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
		},
	},
	features: {
		experimentalTestSyntax: true,
	},
	staticDirs: [...getCodeEditorStaticDirs(__filename)],
	viteFinal: async (config) =>
		mergeConfig(config, {
			define: {
				global: 'window',
			},
			resolve: {
				alias: {
					util: path.resolve(__dirname, 'mock-util.ts'),
				},
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
			},
			plugins: [nxViteTsPaths()],
		}),
};

export default config;

// To customize your Vite configuration you can use the viteFinal field.
// Check https://storybook.js.org/docs/react/builders/vite#configuration
// and https://nx.dev/recipes/storybook/custom-builder-configs

function getAbsolutePath(value: string): string {
	return path.dirname(require.resolve(path.join(value, 'package.json')));
}
