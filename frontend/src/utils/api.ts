import { BASE_URL, request } from "./index";
import { BookInput } from "../contexts/AuthContext";

export interface BookResponse extends BookInput {
  owner: string; // added by backend
}

export function getDefaultBooks(): Promise<BookResponse[]> {
  return request(`${BASE_URL}/`, {
    headers: {
      Accept: "application/json",

      "Content-Type": "application/json",
    },
  });
}

export function getBookCollection(token: string): Promise<BookResponse[]> {
  return request(`${BASE_URL}/collection`, {
    headers: {
      Accept: "application/json",
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
}

// Create book
export function createBookAPI(
  book: BookInput,
  token: string
): Promise<BookResponse> {
  return request(`${BASE_URL}/`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(book),
  });
}

// Update book
export function updateBook(
  _id: string,
  updatedBook: Partial<BookInput>,
  token: string
): Promise<BookResponse> {
  return request(`${BASE_URL}/${_id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedBook),
  });
}

// Delete book
export function deleteBook(_id: string, token: string): Promise<BookResponse> {
  return request(`${BASE_URL}/${_id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
}

// Add to collection
export function addToCollection(
  book: BookInput,
  token: string
): Promise<BookResponse> {
  return request(`${BASE_URL}/collection`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(book),
  });
}

// Remove from collection
export function removeFromCollection(
  _id: string,
  token: string
): Promise<BookResponse[]> {
  return request(`${BASE_URL}/collection`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ _id }),
  });
}
