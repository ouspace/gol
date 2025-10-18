import { defineConfig } from '@playwright/test';

export default defineConfig({
	testDir: './src/components',
	testMatch: /.*\.test\.tsx/,
	fullyParallel: true,
	retries: 1,
	reporter: [
		['list'],
		['html', { outputFolder: '__tests__/reports/html', open: 'never' }],
		['json', { outputFile: '__tests__/reports/playwright-report.json' }],
	],
	use: {
		trace: 'on-first-retry',
		headless: true,
		viewport: { width: 1280, height: 720 },
	},
	projects: [
		{
			name: 'Chromium',
			use: { browserName: 'chromium' },
		},
		{
			name: 'Firefox',
			use: { browserName: 'firefox' },
		},
		{
			name: 'WebKit',
			use: { browserName: 'webkit' },
		},
	],
});