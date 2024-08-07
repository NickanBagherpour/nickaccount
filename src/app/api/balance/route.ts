import { NextResponse } from 'next/server';

import { dbUtils } from '@/utils/db-utils';
import { AuthenticatedRequest, withApiAuth } from '@/utils/auth-middleware';

async function handler(request: AuthenticatedRequest) {
  try {
    const { userId } = request.user;

    const balance = await dbUtils.getUserBalance(userId);
    return NextResponse.json({ balance });
  } catch (error) {
    console.error('Error fetching balance:', error);
    return NextResponse.json({ error: 'Failed to fetch balance' }, { status: 500 });
  }
}

export const GET = withApiAuth(handler);
