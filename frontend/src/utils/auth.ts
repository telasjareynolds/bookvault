import { BASE_URL, request } from "./index";
import { User } from "../contexts/AuthContext";

const AUTH_BASE_URL = `${BASE_URL}/api/auth`;

export interface LoginResponse {
  message: string;
  token: string;
  user: User;
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
export function getUserProfile(token: string): Promise<User> {
  return request(`${AUTH_BASE_URL}/profile`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
}
