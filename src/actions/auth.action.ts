'use server';

import { revalidatePath } from 'next/cache';
import { AuthError } from 'next-auth';
import bcrypt from 'bcryptjs';
import { User as IUser } from '@/types/user.type';
import { signIn, signOut, auth } from '@/auth';
import { db } from '@/db';
import { ROUTES } from '@/constants';

// Helper function to handle authentication errors
const handleAuthError = (error: any) => {
  if (error instanceof AuthError) {
    switch (error.type) {
      case 'CredentialsSignin':
        return { error: 'Invalid credentials!' };
      default:
        return { error: 'Something went wrong!' };
    }
  }
  throw error;
};

// Helper function to revalidate and return success
const revalidateAndReturnSuccess = () => {
  revalidatePath(ROUTES.HOME);
  return { success: true };
};

export const signInAction = async (provider: string) => {
  await signIn(provider, { redirectTo: ROUTES.HOME });
  return revalidateAndReturnSuccess();
};

export async function signOutAction() {
  try {
    await signOut({ redirect: false });
    return revalidateAndReturnSuccess();
  } catch (error) {
    console.error('Error signing out:', error);
    return { success: false, error: 'Failed to sign out' };
  }
}

const getUserByEmail = async (email: string): Promise<IUser | null> => {
  try {
    await db.read();
    return (db.data.users.find((user) => user.email === email) as IUser) || null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const authenticateUser = async (email: string, password: string) => {
  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: ROUTES.HOME,
    });
    return revalidateAndReturnSuccess();
  } catch (error: any) {
    return handleAuthError(error);
  }
};

export const signInWithCredsAction = async (formData: FormData) => {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  return authenticateUser(email, password);
};

export const signUpWithCredsAction = async (formData: FormData) => {
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

    // Authenticate the user after successful sign-up
    return authenticateUser(email, password);
  } catch (error) {
    console.error('Sign-up error:', error);
    return { error: 'Failed to create account' };
  }
};

export const userProfileAction = async () => {
  const session = await auth();

  if (!session || !session.user) {
    return null;
  }

  return {
    name: session.user.name,
    image: session.user.image,
  };
};
