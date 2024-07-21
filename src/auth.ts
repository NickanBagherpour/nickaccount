import NextAuth from 'next-auth';
import Github from 'next-auth/providers/github';
import Credentials from 'next-auth/providers/credentials';

import { fetchApi } from './utils/api-client';

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
  session: { strategy: 'jwt' },
  providers: [
    Github({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.password) {
          return null;
        }

        try {
          const user = await fetchApi({
            path: '/api/auth',
            method: 'POST',
            body: JSON.stringify({ action: 'signin', email: credentials.email, password: credentials.password }),
          });

          return user;
        } catch (error) {
          console.error('Authentication error:', error);
          return null;
        }
      },
    }),
  ],
  // Add callbacks or other configuration as needed
});
