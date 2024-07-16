'use server';

import { revalidatePath } from 'next/cache';
import { AuthError } from 'next-auth';

import bcrypt from 'bcryptjs';

import { saltAndHashPassword } from '@/utils/helper';
import { User as IUser } from '@/types/user.type';
import { signIn, signOut } from '@/auth';
import { db } from '@/db';
import { ROUTES } from '@/constants';

export const signInAction = async (provider: string) => {
  await signIn(provider, { redirectTo: ROUTES.HOME });
  revalidatePath(ROUTES.HOME);
};

export async function signOutAction() {
  try {
    await signOut({ redirect: false });
    revalidatePath(ROUTES.HOME);
    return { success: true };
  } catch (error) {
    console.error('Error signing out:', error);
    return { success: false, error: 'Failed to sign out' };
  }
}

const getUserByEmail = async (email: string) : Promise<IUser | null> => {
  try {
    await db.read();
    const user = db.data.users.find((user) => user.email === email) as IUser;
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const signInWithCreds = async (formData: FormData) => {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  try {
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      return { error: result.error };
    }

    revalidatePath(ROUTES.HOME);
    return { success: true };
  } catch (error: any) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Invalid credentials!' };
        default:
          return { error: 'Something went wrong!' };
      }
    }
    throw error;
  }
};

export const signUpWithCreds = async (formData: FormData) => {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  try {
    await db.read();
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return { error: 'User already exists' };
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser: IUser = {
      id: (db.data!.users.length + 1).toString(),
      name,
      email,
      hashedPassword,
    };

    db.data!.users.push(newUser);
    await db.write();

    // Automatically sign in the user after successful sign-up
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      return { error: result.error };
    }

    revalidatePath(ROUTES.HOME);
    return { success: true };
  } catch (error) {
    console.error('Sign-up error:', error);
    return { error: 'Failed to create account' };
  }
};
