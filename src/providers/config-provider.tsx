'use client';

import React, { createContext, useContext, ReactNode, useCallback, useMemo } from 'react';
import { AppConfig, ThemeId, LocaleConfig } from '@/types/config.type';
import { defaultConfig, LocalStorageKey } from '@/constants/config';
import { useLocalStorage } from '@/hooks';

interface ConfigContextType {
  config: AppConfig;
  updateTheme: (themeId: ThemeId) => void;
  updateLocale: (locale: LocaleConfig) => void;
}

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

export const ConfigProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [config, setConfig, removeConfig] = useLocalStorage<AppConfig>(LocalStorageKey.CONFIG, defaultConfig);

  const applyConfig = useCallback((newConfig: AppConfig) => {
    document.documentElement.classList.remove('light', 'dark', 'winter');
    document.documentElement.classList.add(newConfig.themeId);
    document.documentElement.dir = newConfig.locale.direction;
  }, []);

  // Apply config whenever it changes
  React.useEffect(() => {
    if (config) {
      applyConfig(config);
    }
  }, [config, applyConfig]);

  const updateTheme = useCallback(
    (themeId: ThemeId) => {
      setConfig((prev) => (prev ? { ...prev, themeId } : { ...defaultConfig, themeId }));
    },
    [setConfig],
  );

  const updateLocale = useCallback(
    (locale: LocaleConfig) => {
      setConfig((prev) => (prev ? { ...prev, locale } : { ...defaultConfig, locale }));
    },
    [setConfig],
  );

  const contextValue = useMemo(
    () => ({
      config: config || defaultConfig,
      updateTheme,
      updateLocale,
    }),
    [config, updateTheme, updateLocale],
  );

  return <ConfigContext.Provider value={contextValue}>{children}</ConfigContext.Provider>;
};

export const useConfig = (): ConfigContextType => {
  const context = useContext(ConfigContext);
  if (context === undefined) {
    throw new Error('useConfig must be used within a ConfigProvider');
  }
  return context;
};
