import React from "react";

interface User {
  email: string;
  name: string;
  _id: string;
}

export const CurrentUserContext = React.createContext<User | null>(null);
