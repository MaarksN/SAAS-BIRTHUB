import { test, expect } from '@playwright/test';

test('login flow', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  // Check Title
  await expect(page).toHaveTitle(/SalesOS/);

  // Fill Login
  await page.fill('input[type="email"]', 'admin@salesos.com');
  await page.fill('input[type="password"]', 'password');

  // Click Button
  await page.click('button:has-text("Entrar")');

  // Expect Dashboard Redirect
  await expect(page).toHaveURL(/\/dashboard/);
});

test('tool execution', async ({ page }) => {
  await page.goto('http://localhost:3000/dashboard/sdr');

  // Click on Cold Call Tool
  await page.click('text=Cold Call Script');

  // Fill Form
  await page.fill('input[placeholder="Ex: CEO"]', 'CTO');

  // Generate
  await page.click('button:has-text("Gerar Estratégia")');

  // Expect Result
  await expect(page.locator('text=Resultado Tático')).toBeVisible();
});
