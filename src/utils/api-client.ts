import { auth } from "@/auth";

type FetchOptions = RequestInit & {
  baseUrl?: string;
  path: string;
};

const defaultBaseUrl = process.env.NEXT_PUBLIC_LOCAL_API_URL || '';

export async function fetchApi<T = any>({ baseUrl = defaultBaseUrl, path, ...options }: FetchOptions): Promise<T> {
  const url = new URL(path, baseUrl);
  
  let headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...options.headers as Record<string, string>,
  };

  const session = await auth();

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
