'use server'

import { auth } from "@/auth";
import { fetchApi } from "@/utils/api-client";
import { ActionResult } from '@/types/action-result.type';
import { TransactionWithCategory } from '@/types/transaction.type';

export async function addTransactionAction(formData: FormData): Promise<ActionResult<TransactionWithCategory>> {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return { success: false, data: null, error: 'Not authenticated' };
    }

    const amount = formData.get('amount');
    const categoryId = formData.get('categoryId');
    const description = formData.get('description');

    if (!amount || !categoryId) {
      return { success: false, data: null, error: 'Missing required fields' };
    }

    // Call the API to add the transaction
    const newTransaction = await fetchApi<TransactionWithCategory>({
      path: '/api/transactions/add',
      method: 'POST',
      body: JSON.stringify({
        amount: Number(amount),
        categoryId: categoryId.toString(),
        description: description?.toString() || '',
      }),
    });


    return { success: true, data: newTransaction, error: null };
  } catch (error) {
    console.error('Error adding transaction:', error);
    return { success: false, data: null, error: 'Failed to add transaction' };
  }
}
