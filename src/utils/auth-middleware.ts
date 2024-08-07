import { NextResponse } from 'next/server';
import { verifyToken } from '@/utils/jwt-util';

export interface AuthenticatedRequest extends Request {
  user: {
    email: string;
    userId: string;
    // Add other user properties as needed
  };
}

export function withApiAuth(handler: (request: AuthenticatedRequest) => Promise<NextResponse>) {
  return async (request: Request) => {
    const authHeader = request.headers.get('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'No token provided' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    const decodedToken = verifyToken(token);

    if (!decodedToken) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    // Extend the request object with user information
    const authenticatedRequest: AuthenticatedRequest = Object.assign(request, {
      user: {
        email: decodedToken.email,
        userId: decodedToken.userId,
        // Add other user properties from decodedToken as needed
      },
    });

    // Call the original handler with the authenticated request
    return handler(authenticatedRequest);
  };
}
