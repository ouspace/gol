import type { Config } from 'jest';
import path from 'node:path';

export default {
	// ...tsJestPresets,
	displayName: 'ui',
	resolver: '@nx/jest/plugins/resolver',
	preset: 'jest-expo',
	testEnvironment: 'jsdom',
	passWithNoTests: true,
	transformIgnorePatterns: [
		'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)',
	],
	moduleFileExtensions: ['ts', 'js', 'html', 'tsx', 'jsx', 'json'],
	// setupFilesAfterEnv: ['<rootDir>/test-setup.ts'],
	moduleNameMapper: {
		'.svg': '@nx/expo/plugins/jest/svg-mock',
	},
	coverageDirectory: '../../coverage/apps/ui',
	transform: {
		'.[jt]sx?$': ['babel-jest', { configFile: path.join(process.cwd(), '.babelrc.js') }],
		'^.+.(bmp|gif|jpg|jpeg|mp4|png|psd|svg|webp|ttf|otf|m4v|mov|mp4|mpeg|mpg|webm|aac|aiff|caf|m4a|mp3|wav|html|pdf|obj)$': require.resolve('jest-expo/src/preset/assetFileTransformer.js'),
	},
} as Config;
