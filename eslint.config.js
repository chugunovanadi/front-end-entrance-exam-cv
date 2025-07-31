import globals from 'globals';
import js from '@eslint/js';
import prettierRecommended from 'eslint-plugin-prettier/recommended';

export default [
	{
		files: ['**/*.js'],
	},
	{
		ignores: ['dist/', 'node_modules/', '**/*.d.ts'],
	},
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node,
			},
		},
	},
	js.configs.recommended,
	prettierRecommended,
	{
		rules: {
			'no-unused-vars': ['error'],
			'no-console': 'warn',
			quotes: ['error', 'single', { avoidEscape: true }],
			semi: ['error', 'always'],
			curly: ['error', 'all'],
			eqeqeq: ['error', 'always'],
			'comma-dangle': ['error', 'always-multiline'],
			'eol-last': ['error', 'always'],
			'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
			'no-trailing-spaces': 'error',
			'max-depth': ['error', 2],
			'no-var': 'error',
			'prefer-const': 'error',
			'no-undef': 'error',
			camelcase: ['error', { properties: 'always' }],

			'prettier/prettier': [
				'warn',
				{
					semi: true,
					trailingComma: 'all',
					useTabs: true,
					tabWidth: 2,
					printWidth: 90,
					singleQuote: true,
					arrowParens: 'avoid',
					endOfLine: 'lf',
				},
			],
		},
	},
];
