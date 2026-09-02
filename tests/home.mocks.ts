import { Page } from '@playwright/test';

export const HABITS_API_RE = /\/habits$/;
export const CREATE_HABIT_API_RE = /\/habits$/;
export const HABIT_DELETE_API_RE = /\/habits\/[0-9]+$/;

export async function mockCreateHabitSuccess(page) { await page.route(HABITS_API_RE, async (route) => { if (route.request().method() === 'POST') { await route.fulfill({ status: 201, contentType: 'application/json', body: JSON.stringify({ id: 1, name: 'Drink more water', category: 'Health', target_per_week: 7, completed_this_week: 7, streak: 6, completed_today: false, completed_days: [] }); }); return; } await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify([]) }); }); }
export async function mockListHabitsSuccess(page) { await page.route(HABITS_API_RE, async (route) => { if (route.request().method() !== 'GET') { await route.fallback(); return; } await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify([{ id: 1, name: 'Drink water', category: 'Health', target_per_week: 5, completed_this_week: 5, streak: 1, completed_today: true, completed_days: [] }]) }); }); }
export async function mockDeleteHabitSuccess(page) { await page.route(HABIT_DELETE_API_RE, async (route) => { if (route.request().method() !== 'DELETE') { await route.fallback(); return; } await route.fulfill({ status: 204 }); }); }
