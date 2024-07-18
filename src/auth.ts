import NextAuth from 'next-auth';

import Github from 'next-auth/providers/github';
import Credentials from 'next-auth/providers/credentials';

import { comparePasswords } from './utils/helper';
import { db } from '@/db';

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
        email: {
          label: 'Email',
          type: 'email',
          //   placeholder: "email@example.com",
        },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        if (!credentials || !credentials.email || !credentials.password) {
          return null;
        }

        const email = credentials.email as string;
        const password = credentials.password as string;

        await db.read();
        const existingUser = db.data?.users.find((user) => user.email === email);

        if (existingUser) {
          const isMatch = comparePasswords(password, existingUser.hashedPassword);
          if (!isMatch) {
            throw new Error('Incorrect password.');
          }
          return existingUser;
        } else {
          throw new Error('User not found.');
        }
      },
    }),
  ],
});
