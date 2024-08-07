import { auth } from "@/auth";
import { getSession } from "next-auth/react";

type FetchOptions = RequestInit & {
  baseUrl?: string;
  path: string;
};

const defaultBaseUrl = process.env.NEXT_PUBLIC_LOCAL_API_URL || '';

export async function fetchApi<T = any>({ baseUrl = defaultBaseUrl, path, ...options }: FetchOptions): Promise<T> {
  const url = new URL(path, baseUrl);

  let session: any;
  
  if (typeof window === 'undefined') {
    // Server-side
     session = await auth();
  } else {
    // Client-side
    session = await getSession();
  } 
  
  let headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...options.headers as Record<string, string>,
  };


  if (session?.user?.accessToken) {
    headers['Authorization'] = `Bearer ${session.user.accessToken}`;
  }
  
    const response = await fetch(url.toString(), {
      ...options,
      headers,
    });
    

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
  }

  return response.json();
}