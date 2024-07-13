import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';

import { db } from '@/db';
import { saltAndHashPassword } from '@/utils/helper';
import { User as IUser } from '@/types/user.type';

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
  session: { strategy: 'jwt' },
  providers: [
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

        const hash = saltAndHashPassword(password);

        await db.read(); // Ensure the database is read before accessing
        const existingUser = db.data?.users.find((user) => user.email === email) as IUser;

        if (existingUser) {
          const isMatch = bcrypt.compareSync(password, existingUser.hashedPassword);
          if (!isMatch) {
            throw new Error('Incorrect password.');
          }
          return existingUser;
        } else {
          const newUser: IUser = {
            id: (db.data!.users.length + 1).toString(),
            email,
            hashedPassword: hash,
          };

          db.data!.users.push(newUser);
          await db.write();
          return newUser;
        }
      },
    }),
  ],
});
