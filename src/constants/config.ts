export const APP_NAME = 'NickAccount';

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.nicaccount.com';

export const THEME_ID = ['light', 'dark', 'winter'] as const;

export const LOCALE = [
  { code: 'en-US', name: 'English', dir: 'ltr' },
  { code: 'fa-IR', name: 'فارسی', dir: 'rtl' },
] as const;
