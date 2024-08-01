import { NextResponse } from 'next/server';
import { dbUtils } from '@/utils/db-utils';
import { AuthenticatedRequest, withApiAuth } from '@/utils/auth-middleware';

async function handler(request: AuthenticatedRequest) {
  try {

    console.log("✌️ ~ handler ~ request:", request)

    const { userId } = request.user;

    const transactions = await dbUtils.getTransactionsByUserId(userId);
    return NextResponse.json(transactions);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return NextResponse.json({ error: 'Failed to fetch transactions' }, { status: 500 });
  }
}

export const GET = withApiAuth(handler);
