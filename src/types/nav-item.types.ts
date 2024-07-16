import { ROUTES } from '@/constants/routes';

export interface NavItem {
  name: string;
  href: ROUTES;
  protected?: boolean;
}
