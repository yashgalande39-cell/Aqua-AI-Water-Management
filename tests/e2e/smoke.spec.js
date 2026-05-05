import { test, expect } from '@playwright/test';

test('loads dashboard and sidebar navigation', async ({ page }) => {
  await page.goto('/dashboard');

  await expect(page.getByRole('heading', { name: /aquaai conservation system/i })).toBeVisible();
  await expect(page.getByRole('button', { name: /smart dashboard/i })).toBeVisible();
});
