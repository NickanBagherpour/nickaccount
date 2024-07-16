import { ReactNode } from 'react';

export interface TabItem {
  key: string;
  label: string;
  content: ReactNode;
}

export interface TabProps {
  items: TabItem[];
  activeKey: string;
  onChange: (key: string | number | object) => void;
  fullWidth?: boolean;
}