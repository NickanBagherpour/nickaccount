import { useFormState } from 'react-dom';
import { useTransition } from 'react';

import { ActionResult } from '@/types/action-result.type';

export function useFormAction<T>(
  action: (formData: FormData) => Promise<ActionResult<T>>
) {
  const initialState: ActionResult<T> = {
    success: false,
    data: null,
    error: null,
  };

  const [isPending, startTransition] = useTransition();

  const wrappedAction = async (prevState: ActionResult<T>, formData: FormData) => {
    return new Promise<ActionResult<T>>((resolve) => {
      startTransition(async () => {
        const result = await action(formData);
        resolve(result);
      });
    });
  };

  const [state, formAction] = useFormState(wrappedAction, initialState);

  return {
    state,
    formAction,
    pending: isPending,
  };
}
