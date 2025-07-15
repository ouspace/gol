import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './apps/ui-tests/tests',
  timeout: 10000,
  retries: 0,
  use: {
    headless: true,
    baseURL: 'http://localhost:51505',
    viewport: { width: 1280, height: 720 },
    actionTimeout: 0,
    ignoreHTTPSErrors: true,
  },
});
