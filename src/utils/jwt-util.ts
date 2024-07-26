import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secret-key';

 interface TokenPayload {
  userId: string;
  name: string;
  email: string;
  exp?: number;
  iat?: number; 
  // other fields inside the token
}
 
export const generateToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, JWT_SECRET, /* {
    expiresIn: '1h', // Token expires in 1 hour
  } */);
};

export const verifyToken = (token: string): TokenPayload | null => {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  } catch (error) {
    console.error('Error verifying token:', error);
    return null;
  }
};

export const decodeToken = (token: string): TokenPayload | null => {
  try {
    return jwt.decode(token) as TokenPayload;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

export const generateRefreshToken = (userId: string): string => {
  return jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: '7d', // Refresh token expires in 7 days
  });
};

export const isTokenExpired = (token: string): boolean => {
  const payload = decodeToken<TokenPayload>(token);
  if (!payload || !payload.exp) return true;
  const currentTime = Math.floor(Date.now() / 1000);
  return payload.exp < currentTime;
};

export const isTokenPayload = <T>(payload: any): payload is T => {
  return payload !== null && typeof payload === 'object';
};