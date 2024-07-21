type FetchOptions = RequestInit & {
  baseUrl?: string;
  path: string;
};

const defaultBaseUrl = process.env.NEXT_PUBLIC_LOCAL_API_URL || '';

export async function fetchApi<T = any>({ baseUrl = defaultBaseUrl, path, ...options }: FetchOptions): Promise<T> {
  const url = new URL(path, baseUrl);
  const response = await fetch(url.toString(), {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
  }

  return response.json();
}
