export const BASE_URL = import.meta.env.VITE_API_BASE === 'production'
  ? import.meta.env.VITE_API_BASE
  : 'http://localhost:8000';

export function checkResponse(res: Response) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Error:  ${res.status}`);
  }
}

export async function request(url: string, options?: RequestInit) {
  const response = await fetch(url, options);
  return checkResponse(response);
}
