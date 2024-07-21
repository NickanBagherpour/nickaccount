'use server';

import { revalidatePath } from 'next/cache';

import { auth, signIn, signOut } from '@/auth';
import { ROUTES } from '@/constants';
import { ActionResult } from '@/types/action-result.type';
import { fetchApi } from '@/utils/api-client';

// Helper function to handle authentication errors
const handleAuthError = (error: any): ActionResult<null> => {
  console.error('Auth error:', error);
  return { success: false, error: error.message || 'An unexpected error occurred.' };
};

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
    const response = await fetchApi({
      path: '/api/auth',
      method: 'POST',
      body: JSON.stringify({ action: 'signin', email, password }),
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

export async function userProfileAction(): Promise<
  ActionResult<{ name?: string | null; image?: string | null } | null>
> {
  try {
    const session = await auth();

    if (!session || !session.user || !session.user.email) {
      return { success: false, error: 'No active session', data: null };
    }

    const response = await fetchApi({
      path: '/api/user',
      method: 'POST',
      body: JSON.stringify({ email: session.user.email }),
    });

    if (response.error) {
      throw new Error(response.error);
    }

    return { success: true, data: response };
  } catch (error) {
    return handleAuthError(error);
  }
}

