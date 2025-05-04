const pluginCSpell = require('@cspell/eslint-plugin/configs');
const nx = require('@nx/eslint-plugin');
const configPrettier = require('eslint-config-prettier');
const pluginCommentsEslint = require('eslint-plugin-eslint-comments');
const pluginImportX = require('eslint-plugin-import-x');
const pluginJson = require('eslint-plugin-jsonc');
const pluginMarkdown = require('eslint-plugin-markdown');
const nPlugin = require('eslint-plugin-n');
const promisePlugin = require('eslint-plugin-promise');
const pluginUnicorn = require('eslint-plugin-unicorn');
const tseslint = require('typescript-eslint');

const tseslintConfigs = tseslint.config(
	tseslint.configs.recommendedTypeChecked,
	tseslint.configs.strictTypeChecked,
	tseslint.configs.stylisticTypeChecked,
	{
		languageOptions: {
			parserOptions: {
				projectService: true,
			},
		},
	},
	{
		files: ['**/*.ts', '**/*.tsx'],
		rules: {
			'@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
			'@typescript-eslint/require-await': ['warn'],
		},
	},
	{
		files: ['*.{cjs,js,mjs}', '**/*.{cjs,js,mjs}', '*.json', '**/*.json'],
		extends: [tseslint.configs.disableTypeChecked],
	},
	{
		files: ['**/*.module.ts'],
		rules: {
			'@typescript-eslint/no-extraneous-class': 'off',
		},
	}
);

/** @type {import('eslint').Linter.Config[]} */
const importConfigs = [
	pluginImportX.flatConfigs.typescript,
	pluginImportX.flatConfigs.recommended,
	pluginImportX.flatConfigs.errors,
	pluginImportX.flatConfigs.warnings,
	{
		settings: {
			'import-x/resolver': {
				typescript: {
					project: [
						'./tsconfig.base.json',
						'tsconfig?(.*).json',
						'*/apps/*/tsconfig?(.*).json',
						'*/libs/*/tsconfig?(.*).json',
					],
				},
			},
		},
		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module',
		},
		rules: {
			'import-x/no-rename-default': 'off',
			'import-x/no-named-as-default': 'off',
			'import-x/no-absolute-path': ['error', { esmodule: true, commonjs: true, amd: false }],
			'import-x/no-duplicates': ['error'],
			'import-x/no-named-default': ['error'],
			'import-x/no-webpack-loader-syntax': ['error'],
			'import-x/no-unresolved': [
				'error',
				{
					commonjs: true,
					amd: true,
				},
			],
			'import-x/named': 'warn',
			'import-x/namespace': 'error',
			'import-x/default': 'error',
			'import-x/export': 'error',
			'import-x/order': [
				'error',
				{
					alphabetize: {
						caseInsensitive: true,
						order: 'asc',
					},
					groups: ['builtin', 'external', 'internal', ['sibling', 'parent'], 'index', 'unknown'],
					'newlines-between': 'always',
				},
			],
			'import-x/no-dynamic-require': 'warn',
			'import-x/no-nodejs-modules': 'warn',
			'n/no-extraneous-import': [
				'warn',
				{
					allowModules: ['react', 'axios'],
					resolvePaths: [],
				},
			],
			'n/no-extraneous-require': [
				'error',
				{
					resolverConfig: { modules: ['node_modules'] },
				},
			],
		},
	},
];

/** @type {import('eslint').Linter.Config[]} */
const commentsConfigs = [
	{
		plugins: {
			'eslint-comments': pluginCommentsEslint,
		},
		rules: {
			// Recommended rules
			'eslint-comments/disable-enable-pair': 'error',
			'eslint-comments/no-aggregating-enable': 'error',
			'eslint-comments/no-duplicate-disable': 'error',
			'eslint-comments/no-unlimited-disable': 'error',
			'eslint-comments/no-unused-enable': 'error',
			// Additional rules
			'eslint-comments/require-description': [
				'error',
				{
					ignore: ['eslint-enable', 'eslint-env'],
				},
			],
		},
	},
];

/** @type {import('eslint').Linter.Config[]} */
const unicornConfigs = [
	pluginUnicorn.configs['flat/recommended'],
	{
		files: ['**/*.json'],
		rules: {
			'unicorn/prevent-abbreviations': 'off',
		},
	},
	{
		files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx', '**/*.cjs', '**/*.mjs'],
		rules: {
			'unicorn/prefer-module': 'off',
			'unicorn/no-null': 'off',
			'unicorn/no-array-reduce': 'off',
			'unicorn/no-useless-promise-resolve-reject': 'off',
			'unicorn/no-array-callback-reference': 'off',
			'unicorn/prefer-top-level-await': 'off',
			'unicorn/prefer-string-slice': 'off',
			'unicorn/prefer-spread': ['warn'],
			'unicorn/prefer-string-replace-all': ['warn'],
			'unicorn/prevent-abbreviations': [
				'error',
				{
					allowList: {
						fn: true,
						id: true,
					},
				},
			],
		},
	},
	{
		files: ['**/*.ts', '**/*.js', '**/*.cjs', '**/*.mjs'],
		rules: {
			'unicorn/filename-case': [
				'warn',
				{
					case: 'kebabCase',
				},
			],
		},
	},
	{
		files: ['**/*.jsx', '**/*.tsx'],
		rules: {
			'unicorn/filename-case': [
				'warn',
				{
					case: 'pascalCase',
				},
			],
		},
	},
	{
		files: ['digital_manifest.json'],
		rules: {
			'unicorn/filename-case': 'off',
		},
	},
];

/** @type {import('eslint').Linter.Config[]} */
const configCSpell = [
	pluginCSpell.recommended,
	{
		files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx', '**/*.json'],
		rules: {
			'@cspell/spellchecker': ['warn'],
		},
	},
	{
		files: ['**/package.json', '**/package-lock.json'],
		rules: {
			'@cspell/spellchecker': ['off'],
		},
	},
];

module.exports = [
	...nx.configs['flat/base'],
	...nx.configs['flat/typescript'],
	...tseslintConfigs,
	...nx.configs['flat/javascript'],
	...nx.configs['flat/react'],
	...pluginJson.configs['flat/recommended-with-json'],
	...pluginMarkdown.configs['recommended'],
	...configCSpell,
	promisePlugin.configs['flat/recommended'],
	{
		rules: {
			'promise/avoid-new': ['error'],
		},
	},
	nPlugin.configs['flat/recommended'],
	...importConfigs,
	...commentsConfigs,
	...unicornConfigs,
	{
		ignores: [
			'**/.vscode',
			'**/.idea',
			'**/.nx',
			'**/node_modules',
			'**/dist',
			'**/.custom',
			'**/secrets.ts',
			'jest.config.ts',
			'**/vite.config.*.timestamp*',
			'**/vitest.config.*.timestamp*',
		],
	},
	{
		files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx', '**/*.json'],
		rules: {
			indent: ['error', 'tab', { SwitchCase: 1, ignoredNodes: ['PropertyDefinition'] }],
			'@typescript-eslint/no-explicit-any': ['warn'],
			'@nx/enforce-module-boundaries': [
				'error',
				{
					enforceBuildableLibDependency: true,
					allow: [String.raw`^.*/eslint(\.base)?\.config\.[cm]?js$`],
					depConstraints: [
						{
							sourceTag: '*',
							onlyDependOnLibsWithTags: ['*'],
						},
					],
				},
			],
		},
	},
	{
		files: ['**/*.{js,mjs,cjs}'],
		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module',
		},
		rules: {
			'no-unused-vars': 'off',
		},
	},
	{
		files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx', '**/*.cjs', '**/*.mjs'],
		// Override or add rules here
		rules: {
			'no-magic-numbers': ['error', { ignore: [0, 1] }],
		},
	},
	{
		files: ['**/*.ts', '**/*.js', '**/*.cjs', '**/*.mjs'],
		rules: {
			'import-x/no-nodejs-modules': 'off',
		},
	},
	{
		files: ['**/*.ts', '**/*.tsx'],
		rules: {
			'@typescript-eslint/consistent-type-definitions': ['error', 'type'],
			'@typescript-eslint/unbound-method': 'warn',
			'@typescript-eslint/use-unknown-in-catch-callback-variable': ['warn'],
			'@typescript-eslint/restrict-template-expressions': [
				'error',
				{
					allowNumber: true,
				},
			],
		},
	},
	{
		rules: {
			'n/no-missing-import': 'off',
			'n/no-unpublished-require': ['warn'],
			'n/no-extraneous-require': [
				'warn',
				{
					resolverConfig: { modules: ['node_modules'] },
				},
			],
		},
	},
	{
		files: ['tools/seki/**/files/**/*.ts', 'tools/seki/**/files/**/*.tsx', 'tools/seki/**/files/**/*.js'],
		rules: {
			'n/no-extraneous-require': 'off',
			'n/no-extraneous-import': 'off',
			'import-x/no-unresolved': 'off',
			'@typescript-eslint/no-unsafe-member-access': 'off',
			'@typescript-eslint/no-unsafe-call': 'off',
			'@typescript-eslint/no-unsafe-argument': 'off',
			'@typescript-eslint/no-unsafe-return': 'off',
			'@nx/enforce-module-boundaries': 'off',
		},
	},
	configPrettier,
];
