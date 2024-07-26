'use server';

import { revalidatePath } from 'next/cache';

import { auth, signIn, signOut } from '@/auth';
import { ROUTES } from '@/constants';
import { ActionResult } from '@/types/action-result.type';
import { fetchApi } from '@/utils/api-client';
import { User } from '@/types';
import { Nullable } from '@/types/utility.type';

function handleAuthError(error: unknown): ActionResult<null> {
  
  if (error instanceof Error) {
    if (error.message === 'No authentication token available') {
      return { success: false, error: 'Not authenticated', data: null };
    }
    return { success: false, error: error.message, data: null };
  }
  
  return { success: false, error: 'An unknown error occurred', data: null };
}

// Helper function to revalidate and return success
const revalidateAndReturnSuccess = (): ActionResult<null> => {
  revalidatePath(ROUTES.HOME);
  return { success: true, data: null };
};

export const signInAction = async (provider: string) => {
  await signIn(provider, { redirectTo: ROUTES.HOME });
  return revalidateAndReturnSuccess();
};

export async function signInWithCredsAction(formData: FormData): Promise<ActionResult<null>> {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  try {

    await signIn('credentials', { email, password, redirect: false });

    return revalidateAndReturnSuccess();
  } catch (error) {
    return handleAuthError(error);
  }
}

export async function signUpWithCredsAction(formData: FormData): Promise<ActionResult<null>> {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  try {
    const response = await fetchApi({
      path: '/api/auth',
      method: 'POST',
      body: JSON.stringify({ action: 'signup', name, email, password }),
    });

    if (response.error) {
      throw new Error(response.error);
    }

    // If API call is successful, call signIn to create a session
    await signIn('credentials', { email, password, redirect: false });

    return revalidateAndReturnSuccess();
  } catch (error) {
    return handleAuthError(error);
  }
}

export async function signOutAction(): Promise<ActionResult<null>> {
  try {
    const response = await fetchApi({
      path: '/api/auth',
      method: 'POST',
      body: JSON.stringify({ action: 'signout' }),
    });

    if (response.error) {
      throw new Error(response.error);
    }

    await signOut({ redirect: false });
    return revalidateAndReturnSuccess();
  } catch (error) {
    return handleAuthError(error);
  }
}

export async function userProfileAction(): Promise<ActionResult<Nullable<User>>> {
  try {
  
    const response = await fetchApi({
      path: '/api/user',
      method: 'GET',
    });

    return { success: true, data: response };
  } catch (error) {
    return handleAuthError(error);
  }
}