import { NextRequest, NextResponse } from 'next/server';

import { dbUtils } from '@/utils/db-utils';
import { AuthenticatedRequest, withApiAuth } from '@/utils/auth-middleware';
import { TransactionWithCategory } from '@/types/transaction.type';

async function handler(request: AuthenticatedRequest) {
  try {
    const { userId } = request.user;

    const body = await request.json();
    const { amount, categoryId, description } = body;

    if (!amount || !categoryId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    // Get the category information
    const category = await dbUtils.getCategoryById(categoryId.toString());

    if (!category) {
      return NextResponse.json({ error: 'Invalid category' }, { status: 400 });
    }

    const newTransaction = await dbUtils.addTransaction({
      userId: userId,
      amount,
      categoryId,
      description,
    });

    // Combine the transaction with the category information
    const transactionWithCategory: TransactionWithCategory = {
      ...newTransaction,
      category: category?.name,
    };

    return NextResponse.json(transactionWithCategory);
  } catch (error) {
    console.error('Error adding transaction:', error);
    return NextResponse.json({ error: 'Failed to add transaction' }, { status: 500 });
  }
}

export const POST = withApiAuth(handler);
