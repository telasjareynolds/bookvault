const JWT_SECRET = "jwt";

// with localStorage, gets the key JWT_SECRET.
export const setToken = (token: string) => {
  return localStorage.setItem(JWT_SECRET, token)
};

// getToken retrieves and returns the value associated with JWT_SECRET from localStorage.
export const getToken = () => {
  return localStorage.getItem(JWT_SECRET);
};

export const removeToken = () => {
  return localStorage.removeItem(JWT_SECRET);
};
