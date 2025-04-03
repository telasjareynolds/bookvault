export const BASE_URL = "http://localhost:3001";

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
