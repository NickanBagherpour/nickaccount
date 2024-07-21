import { NextResponse } from 'next/server';

import bcrypt from 'bcryptjs';

import { signIn, signOut } from '@/auth';

import { db } from '@/db';

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
  await db.read();
  const user = db.data?.users.find((u) => u?.email?.toLowerCase() === email.toLowerCase());

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);
  if (!isPasswordValid) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  // Return user data without sensitive information
  const { hashedPassword, ...safeUser } = user;
  return NextResponse.json(safeUser);
}

async function handleSignUp({ name, email, password }: { name: string; email: string; password: string }) {
  await db.read();
  const existingUser = db.data?.users.find((user) => user?.email?.toLowerCase() === email.toLowerCase());

  if (existingUser) {
    return NextResponse.json({ error: 'User already exists' }, { status: 409 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = {
    id: (db.data!.users.length + 1).toString(),
    name,
    email,
    hashedPassword,
  };

  db.data!.users.push(newUser);
  await db.write();

  // Return new user data without sensitive information
  const { hashedPassword: _, ...safeUser } = newUser;
  return NextResponse.json(safeUser);
}

async function handleSignOut() {
  try {
    await signOut({ redirect: false });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'An error occurred during sign out' }, { status: 500 });
  }
}
