'use client';

import { useState } from 'react';
import { FiSun, FiMoon, FiCloud } from 'react-icons/fi';

import { Selector } from '@/ui-kit';

const themes = [
  { value: 'light', label: 'Light', icon: FiSun },
  { value: 'dark', label: 'Dark', icon: FiMoon },
  { value: 'winter', label: 'Winter', icon: FiCloud },
];

export default function ThemeSelector() {
  const [currentTheme, setCurrentTheme] = useState('dark');

  const ThemeIcon = themes.find((theme) => theme.value === currentTheme)?.icon || FiSun;

  return (
    <Selector
      size='small'
      options={themes}
      value={currentTheme}
      onChange={setCurrentTheme}
      icon={<ThemeIcon />}
      placeholder='Select Theme'
    />
  );
}
