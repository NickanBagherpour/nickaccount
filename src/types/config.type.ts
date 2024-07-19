
export type ThemeId = 'light' | 'dark' | 'winter';
export type LocaleKey = 'en-US' | 'fa-IR' ;
export type Direction = 'ltr' | 'rtl';

export interface LocaleConfig {
  key: LocaleKey;
  direction: Direction;
  title: string;
}

export interface AppConfig {
  themeId: ThemeId;
  locale: LocaleConfig;
  // Add other config properties as needed
}
