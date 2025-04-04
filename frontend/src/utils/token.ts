const JWT_SECRET = "jwt";

// with localStorage the key TOKEN_KEY.
export const setToken = (token: string) => {
  return localStorage.setItem(JWT_SECRET, token)
};

// getToken retrieves and returns the value associated with TOKEN_KEY from localStorage.
export const getToken = () => {
  return localStorage.getItem(JWT_SECRET);
};

export const removeToken = () => {
  return localStorage.removeItem(JWT_SECRET);
};
