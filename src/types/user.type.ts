import { User as AuthUser } from 'next-auth';

export interface User extends AuthUser {
  hashedPassword?: string;
  accessToken?: string;
}

/* export interface UserToken {
  email?: string;
  image?: number;
  exp: number;
  accessToken: string;
}

export interface UserSession extends UserToken {}
 */