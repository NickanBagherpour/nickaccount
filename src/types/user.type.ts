import { User as AuthUser} from 'next-auth';

export interface User extends AuthUser {
  hashedPassword: string;
}
