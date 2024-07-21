import { NextResponse } from 'next/server';

import { dbUtils } from '@/utils/db-utils';

export async function POST(request: Request) {
  try {
    // const session = await getServerSession(authOptions);

    // if (!session || !session.user || !session.user.email) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }

    const { email } = await request.json();


    const user = await dbUtils.findUserByEmail(email);

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({
      name: user.name,
      email: user.email,
      image: user?.image,
    });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return NextResponse.json({ error: 'Failed to fetch user profile' }, { status: 500 });
  }
}
