import { NextResponse } from 'next/server';

import { db } from '@/db';

export async function POST(request: Request) {
  try {
    // const session = await getServerSession(authOptions);

    // if (!session || !session.user || !session.user.email) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }

    const { email } = await request.json();

    await db.read();

    const user = db.data?.users.find((u) => u?.email?.toLowerCase() === email.toLowerCase());

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
