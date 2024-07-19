import { AppConfig } from "@/types";

export const APP_NAME = 'NickAccount';

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.nicaccount.com';

export const LOCALE = [
  { code: 'en-US', name: 'English', dir: 'ltr' },
  { code: 'fa-IR', name: 'فارسی', dir: 'rtl' },
] as const;

export const defaultConfig: AppConfig = {
  themeId: 'dark',
  locale: {
    key: 'en-US',
    direction: 'ltr',
    title: 'English',
  },
  // Add other default config properties
};

export const enum LocalStorageKey {
  USER = 'user',
  CONFIG = 'configuration',
}
