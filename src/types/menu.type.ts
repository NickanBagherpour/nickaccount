import { ReactNode } from 'react';

export interface MenuItem {
  label: string;
  path: string;
  icon?: ReactNode;
  subItems?: MenuItem[];
}
