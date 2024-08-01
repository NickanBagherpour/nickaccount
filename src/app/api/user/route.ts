import { NextResponse } from 'next/server';

import { dbUtils } from '@/utils/db-utils';
import { AuthenticatedRequest, withApiAuth } from '@/utils/auth-middleware';

async function handler(request: AuthenticatedRequest) {
  try {
    const { email } = request.user;
    
    const user = await dbUtils.findUserByEmail(email);

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Remove sensitive information before sending the response
    const { hashedPassword, ...safeUser } = user;

    return NextResponse.json(safeUser);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return NextResponse.json({ error: 'Failed to fetch user profile' }, { status: 500 });
  }
}

export const GET = withApiAuth(handler);