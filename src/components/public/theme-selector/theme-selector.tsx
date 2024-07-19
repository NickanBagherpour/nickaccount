'use client';

import React from 'react';
import { FiSun, FiMoon, FiCloud } from 'react-icons/fi';

import { Selector } from '@/ui-kit';
import { useConfig } from '@/providers/config-provider';
import { ThemeId } from '@/types/config.type';

const themes: { value: ThemeId; label: string; icon: React.ComponentType }[] = [
  { value: 'light', label: 'Light', icon: FiSun },
  { value: 'dark', label: 'Dark', icon: FiMoon },
  { value: 'winter', label: 'Winter', icon: FiCloud },
];

export default function ThemeSelector() {
  const { config, updateTheme } = useConfig();

  const ThemeIcon = themes.find((theme) => theme.value === config.themeId)?.icon || FiSun;

  const handleThemeChange = (newTheme: string) => {
    updateTheme(newTheme as ThemeId);
  };

  return (
    <Selector
      size='small'
      options={themes}
      value={config.themeId}
      onChange={handleThemeChange}
      icon={<ThemeIcon />}
      placeholder='Select Theme'
    />
  );
}
