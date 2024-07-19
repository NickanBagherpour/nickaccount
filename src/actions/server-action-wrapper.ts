import { ActionResult } from '@/types/action-result.type';

export async function serverActionWrapper<T>(
  action: () => Promise<T>
): Promise<ActionResult<T>> {
  try {
    const data = await action();
    return { success: true, data };
  } catch (error: any) {
    // Check if the error indicates a redirect
    if (error && error.success === false && error.error === 'NEXT_REDIRECT') {
      // Treat NEXT_REDIRECT as a successful action
      return { success: true, data: null }; // or return any relevant data if needed
    }

    console.error('Action error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : error?.error || 'An unknown error occurred',
    };
  }
}
