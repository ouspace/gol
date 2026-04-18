import customProperties from 'postcss-custom-properties';
import atRulesVariables from 'postcss-at-rules-variables';

export default {
	plugins: {
		'postcss-import': {},
		'@tailwindcss/postcss': {},
		'postcss-each': {
			plugins: {
				beforeEach: [customProperties],
				afterEach: [atRulesVariables],
			},
		},
		'postcss-normalize': {},
		'postcss-preset-env': {
			stage: 2,
			features: {
				'nesting-rules': true,
			},
		},
		'postcss-custom-media': { preserve: true },
		'postcss-url': [{ filter: '**/*.svg', url: 'inline' }],
		'postcss-svgo': {},
		cssnano: { preset: 'default' },
	},
};
