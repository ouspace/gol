import { NxAppWebpackPlugin } from '@nx/webpack/app-plugin.js';
import path from 'node:path';

export default {
	output: {
		path: path.join(import.meta.dirname, '../../dist/apps/api'),
	},
	plugins: [
		new NxAppWebpackPlugin({
			target: 'node',
			compiler: 'tsc',
			main: './src/main.ts',
			tsConfig: './tsconfig.app.json',
			assets: ['./src/assets'],
			optimization: false,
			outputHashing: 'none',
			generatePackageJson: true,
		}),
	],
};
