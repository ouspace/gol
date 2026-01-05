import type { Config } from 'jest';
import path from 'node:path';

const config: Config = {
	displayName: 'ui',
	resolver: '@nx/jest/plugins/resolver',
	// Remove jest-expo preset to avoid window redefinition conflict
	// preset: 'jest-expo',
	testEnvironment: 'jsdom',
	passWithNoTests: true,
	setupFiles: ['<rootDir>/jest-setup-files.js'],
	setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
	transformIgnorePatterns: [
		'node_modules/(?!((jest-)?react-native' +
		'|@react-native(-community)?' +
		'|expo(nent)?' +
		'|@expo(nent)?/.*' +
		'|@expo-google-fonts/.*' +
		'|react-navigation' +
		'|@react-navigation/.*' +
		'|@unimodules/.*' +
		'|unimodules' +
		'|sentry-expo' +
		'|native-base' +
		'|react-native-svg))',
	],
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'html'],
	moduleNameMapper: {
		'\\.svg$': '@nx/expo/plugins/jest/svg-mock',
	},
	coverageDirectory: '../../coverage/apps/ui',
	transform: {
		'^.+\\.[jt]sx?$': ['babel-jest', { configFile: path.join(__dirname, '.babelrc.js') }],
		'^.+\\.(bmp|gif|jpg|jpeg|mp4|png|psd|svg|webp|ttf|otf|m4v|mov|mp4|mpeg|mpg|webm|aac|aiff|caf|m4a|mp3|wav|html|pdf|obj)$': 'jest-expo/src/preset/assetFileTransformer.js',
	},
};

export default config;
