type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

interface ApiOptions<TBody = unknown> {
  method?: HttpMethod; // HTTP method (default is GET)
  headers?: Record<string, string>; // Additional headers
  body?: TBody; // Request body (optional and type-safe)
  queryParams?: Record<string, string | number | boolean>; // Query parameters
}

interface ApiResponse<T> {
  data?: T; // The response data
  error?: string; // The error message, if any
}

export function apiClient<TResponse, TBody = unknown>(
  url: string,
  options: ApiOptions<TBody> = {}
): Promise<ApiResponse<TResponse>> {
  const { method = 'GET', headers = {}, body, queryParams } = options;

  // Build query string if queryParams are provided
  const queryString = queryParams
    ? '?' +
      new URLSearchParams(
        Object.entries(queryParams).reduce((acc, [key, value]) => {
          acc[key] = String(value);
          return acc;
        }, {} as Record<string, string>)
      ).toString()
    : '';

  const fullUrl = url + queryString;

  const fetchOptions: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers
    },
    body: body && method !== 'GET' ? JSON.stringify(body) : undefined
  };

  return fetch(fullUrl, fetchOptions)
    .then(async (response) => {
      if (!response.ok) {
        const errorDetails = await response.json();
        throw new Error(
          `HTTP error! status: ${response.status}, details: ${JSON.stringify(
            errorDetails
          )}`
        );
      }
      const data = (await response.json()) as TResponse;
      return { data };
    })
    .catch((error) => {
      console.error('API call failed:', error);
      return { error: error.message };
    });
}
