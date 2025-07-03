import nx from '@nx/eslint-plugin';
import pluginCSpell from '@cspell/eslint-plugin/configs';
import pluginComments from 'eslint-plugin-eslint-comments';
import pluginImportX from 'eslint-plugin-import-x';
import pluginJson from 'eslint-plugin-jsonc';
import pluginMarkdown from 'eslint-plugin-markdown';
import pluginN from 'eslint-plugin-n';
import pluginPromise from 'eslint-plugin-promise';
import pluginUnicorn from 'eslint-plugin-unicorn';
import eslintConfigPrettier from 'eslint-config-prettier';
import tsEslint from 'typescript-eslint';

const tsConfigs = tsEslint.config(
	tsEslint.configs.recommendedTypeChecked,
	tsEslint.configs.strictTypeChecked,
	tsEslint.configs.stylisticTypeChecked,
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
		extends: [tsEslint.configs.disableTypeChecked],
	},
	{
		files: ['**/*.module.ts'],
		rules: {
			'@typescript-eslint/no-extraneous-class': 'off',
		},
	}
);

export default [
	...nx.configs['flat/base'],
	...nx.configs['flat/typescript'],
	...nx.configs['flat/javascript'],
	...tsConfigs,
	...pluginJson.configs['flat/recommended-with-json'],
	...pluginMarkdown.configs['recommended'],
	pluginCSpell.recommended,
	pluginPromise.configs['flat/recommended'],
	pluginN.configs['flat/recommended'],
	pluginUnicorn.configs.recommended,
	pluginImportX.flatConfigs.recommended,
	pluginImportX.flatConfigs.typescript,
	{
		plugins: {
			'eslint-comments': pluginComments,
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
	eslintConfigPrettier,
	{
		ignores: [
			'**/.vscode',
			'**/.idea',
			'**/.nx',
			'**/node_modules',
			'**/dist',
			'**/.custom',
			'jest.config.ts',
			'**/eslint.config.cjs',
			'**/postcss.config.cjs',
			'**/rollup.config.cjs',
			'**/webpack.config.cjs',
			'**/vite.config.*.timestamp*',
			'**/vitest.config.*.timestamp*',
		],
	},
	{
		files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
		rules: {
			'@nx/enforce-module-boundaries': [
				'error',
				{
					enforceBuildableLibDependency: true,
					allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?js$'],
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
		files: ['**/*.ts', '**/*.tsx'],
		rules: {
			'@typescript-eslint/restrict-template-expressions': [
				'error',
				{
					allowNumber: true,
				},
			],
		},
	},
	{
		files: ['**/*.ts', '**/*.tsx', '**/*.cts', '**/*.mts', '**/*.js', '**/*.jsx', '**/*.cjs', '**/*.mjs'],
		// Override or add rules here
		rules: {
			indent: ['error', 'tab', { SwitchCase: 1, ignoredNodes: ['PropertyDefinition'] }],
			'n/no-missing-import': [
				'error',
				{
					tryExtensions: ['.js', '.ts', '.jsx', '.tsx', '.json', '.css'],
					ignoreTypeImport: true,
				},
			],
			'n/no-extraneous-import': [
				'error',
				{
					allowModules: ['lodash', 'react', 'react-dom', 'react-router-dom'],
				},
			],
			'unicorn/prefer-top-level-await': ['warn'],
			'unicorn/no-null': ['off'],
		},
	},
];
