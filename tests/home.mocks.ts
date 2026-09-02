import { Page } from '@playwright/test';

export const HABITS_API_RE = /\/habits(\?.*)?$/;
export const HABITS_API_RE = /\/habits(\?.*)?$/;

export async function mockCreateHabitSuccess(page) { await page.route(HABITS_API_RE, async (route) => { if (route.request().method() !== 'POST') { await route.fallback(); return; } await route.fulfill({ status: 201, contentType: 'application/json', body: JSON.stringify( { id: 1, name: 'Drink water', category: 'General', target_per_week: 1, completed_this_week: 1, streak: 0, completed_today: false, completed_days: []}) }); }); }
