import { BASE_URL, request } from "./index";
import { User } from "../contexts/AuthContext";
import { BookResponse } from "./index";

const AUTH_BASE_URL = `${BASE_URL}/api/auth`;

export interface LoginResponse {
  message: string;
  token: string;
  user: User;
}

export interface BookUser {
  id: string;
  email: string;
  name: string;
  savedBooks: BookResponse[];
}

export const login = ({
  email,
  password,
}: Partial<User>): Promise<LoginResponse> => {
  return request(`${AUTH_BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
};

export const register = ({
  email,
  password,
  name,
}: Partial<User>): Promise<LoginResponse> => {
  return request(`${AUTH_BASE_URL}/register`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  });
};

// get current user
// Check for user token
export function getUserProfile(token: string): Promise<BookUser> {
  return request(`${AUTH_BASE_URL}/profile`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
}

// Add to collection
export function addToCollectionAPI(
  _id: string,
  token: string
): Promise<BookResponse> {
  return request(`${AUTH_BASE_URL}/savedBooks/${_id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
}

// Remove from collection
export function removeFromCollectionAPI(
  _id: string,
  token: string
): Promise<BookResponse[]> {
  return request(`${AUTH_BASE_URL}/savedBooks/${_id}`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
}
