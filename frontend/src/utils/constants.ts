export const BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:3001"
    : "https://futureproductionurl.com";

export function checkResponse(res: Response) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Error:  ${res.status}`);
  }
}

export async function request(url: string, options?: RequestInit) {
  const response = await fetch(url, options)
  return checkResponse(response);
}
