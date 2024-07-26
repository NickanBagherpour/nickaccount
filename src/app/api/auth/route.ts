import { NextResponse } from 'next/server';

import bcrypt from 'bcryptjs';

import { dbUtils } from '@/utils/db-utils';
import { generateToken } from '@/utils/jwt-util';

export async function POST(request: Request) {
  const { action, ...data } = await request.json();

  switch (action) {
    case 'signin':
      return handleSignIn(data);
    case 'signup':
      return handleSignUp(data);
    case 'signout':
      return handleSignOut();
    default:
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  }
}

async function handleSignIn({ email, password }: { email: string; password: string }) {
  const user = await dbUtils.findUserByEmail(email);

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  const isPasswordValid = await bcrypt.compare(password, user!.hashedPassword as string);
  if (!isPasswordValid) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  // Check if user has necessary properties
  if (!user.id || !user.email) {
    return NextResponse.json({ error: 'Invalid user data' }, { status: 500 });
  }

  // Generate a JWT token using the utility function
  const token = generateToken({
    userId: user.id,
    name: user.name ?? '',
    email: user.email,
  });

  // Return user data without sensitive information and include the token
  const { hashedPassword, ...safeUser } = user;
  return NextResponse.json({ ...safeUser, accessToken: token });
}

async function handleSignUp({ name, email, password }: { name: string; email: string; password: string }) {
  const existingUser = await dbUtils.findUserByEmail(email);

  if (existingUser) {
    return NextResponse.json({ error: 'User already exists' }, { status: 409 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await dbUtils.createUser({ name, email, hashedPassword });

  // Return new user data without sensitive information
  const { hashedPassword: _, ...safeUser } = newUser;
  return NextResponse.json(safeUser);
}

async function handleSignOut() {
  try {
    // await signOut({ redirect: false });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'An error occurred during sign out' }, { status: 500 });
  }
}
