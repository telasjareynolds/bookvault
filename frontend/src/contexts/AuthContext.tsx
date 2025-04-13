import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

import {
  login,
  register,
  getUserProfile,
  createBookAPI,
  updateBookAPI,
  deleteBookAPI,
  addToCollectionAPI,
  removeFromCollectionAPI,
  getUserProfileBooks,
  getDefaultBooks,
} from "../utils";
import { getToken, setToken, removeToken } from "../utils";

// Types
export interface User {
  email: string;
  password?: string;
  name: string;
  id: string;
  savedBooks?: { _id: string }[];
}

export interface Book {
  _id: string;
  title: string;
  author?: string;
  year: number;
  imageLink: string;
  language?: string;
  pages?: number;
  link?: string;
  owner?: string;
  country?: string;
  updatedAt: string | number | Date;
}

export interface UserWithCollection extends User {
  bookCollection: Book[];
}

export interface BookInput {
  _id?: string;
  title: string;
  author?: string;
  year: number;
  imageLink: string;
  language?: string;
  pages?: number;
  link?: string;
}

export interface AuthContextType {
  currentUser: User | null;
  books: Book[];
  isLoading: boolean;
  activeModal: string;
  openModal: (modal: string) => void;
  closeModal: () => void;
  handleLogin: (
    userData: Pick<User, "email"> & { password: string }
  ) => Promise<UserWithCollection | void>;
  handleRegister: (
    userData: Pick<User, "email" | "name"> & { password: string }
  ) => Promise<User | void>;
  logout: () => void;
  createBook: (bookData: BookInput) => Promise<Book>;
  editBook: (id: string, updates: Partial<BookInput>) => Promise<Book>;
  deleteBook: (id: string) => Promise<void>;
  selectedBookId: Book["_id"] | null; // Currently selected book's id
  setSelectedBookId: (id: Book["_id"] | null) => void;
  isLoggedIn: boolean;
  toggleSave: (bookId: string) => Promise<void>;
  savedBooks: string[];
}

// Create Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // State management
  const [bookCollection, setBookCollection] = useState<Book[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeModal, setActiveModal] = useState("");
  const [selectedBookId, setSelectedBookId] = useState<Book["_id"] | null>(
    null
  );
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [savedBooks, setSavedBooks] = useState<string[]>([]);

  // Opens modals
  const openModal = (modal: string) => {
    setActiveModal(modal);
  };

  // Closes modals
  const closeModal = () => setActiveModal("");

  // Checks if there's a token/logged in user on pageload and sets books

  useEffect(() => {
    const token = getToken();

    setIsLoading(true);

    if (token) {
      Promise.all([getUserProfile(token), getUserProfileBooks(token)])
        .then(([user, userBooks]) => {
          setCurrentUser(user);
          setBookCollection(userBooks); // Already includes duplicated defaults
          setSavedBooks(user.savedBooks?.map((book) => book._id) || []);
          setIsLoggedIn(true);
        })
        .catch((err) => {
          console.error("Auth check failed", err);
          setCurrentUser(null);

          // fallback to public default books if token invalid
          getDefaultBooks().then((defaultBooks) => {
            setBookCollection(defaultBooks);
          });
        })
        .finally(() => setIsLoading(false));
    } else {
      // Not logged in — show public defaults
      getDefaultBooks()
        .then(setBookCollection)
        .catch((err) => {
          console.error("Failed to load default books", err);
        })
        .finally(() => setIsLoading(false));
    }
  }, []);

  const handleLogin = async (
    userData: Pick<User, "email"> & { password: string }
  ): Promise<UserWithCollection | void> => {
    setIsLoading(true);

    const { email, password } = userData;

    if (!email || !password) {
      console.log("Email and password are required");
      setIsLoading(false);
      return;
    }

    try {
      const res = await login(userData); // login() should accept { email, password }

      setToken(res.token);
      setCurrentUser(res.user);
      setIsLoggedIn(true);

      const userBooks = await getUserProfileBooks(res.token);
      setBookCollection(userBooks as Book[]);

      return {
        ...res.user,
        bookCollection: userBooks,
      };
    } catch (err) {
      console.error("Login failed:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (
    userData: Pick<User, "email" | "name"> & { password: string }
  ) => {
    const { email, password, name } = userData;

    if (!email || !password || !name) {
      console.log("Email, password, and username required");
      return;
    }
    setIsLoading(true);
    try {
      const res = await register(userData);

      return res.user;
    } catch (err) {
      console.error("Unable to register:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    removeToken();
    setIsLoggedIn(false);
    setCurrentUser(null);
    setSavedBooks([]);
    closeModal();
  
    // Reset books to default public ones
    getDefaultBooks()
      .then(setBookCollection)
      .catch((err) => {
        console.error("Failed to load default books after logout", err);
      });
  };

  const createBook = async (bookData: BookInput): Promise<Book> => {
    const token = getToken();

    if (!token) {
      throw new Error(
        "No token found. User must be logged in to create a book."
      );
    }

    const newBook = await createBookAPI(bookData, token);
    setBookCollection((prev) => [newBook, ...prev]);
    return newBook;
  };

  const editBook = async (
    id: string,
    updates: Partial<BookInput>
  ): Promise<Book> => {
    const token = getToken();
    if (!token) throw new Error("No token found.");

    const updated = await updateBookAPI(id, updates, token);
    setBookCollection((prev) =>
      prev.map((book) => (book._id === id ? updated : book))
    );
    return updated;
  };

  const deleteBook = async (id: string): Promise<void> => {
    const token = getToken();
    if (!token) throw new Error("No auth token found.");

    try {
      await deleteBookAPI(id, token); // your API util
      setBookCollection((prev) => prev.filter((book) => book._id !== id));
    } catch (error) {
      console.error("Failed to delete book:", error);
      throw error;
    }
  };

  const toggleSave = async (bookId: string) => {
    const token = getToken();

    if (!token) {
      throw new Error("No token found. User must be logged in to like a book.");
    }
    // Checks if a book id in saved books is already saved
    const isSaved = savedBooks.includes(bookId);

    try {
      if (isSaved) {
        await removeFromCollectionAPI(bookId, token);
      } else {
        await addToCollectionAPI(bookId, token);
      }
      // Saves books on the backends and makes sure to update to populate with the most recently liked book to appear first on the user's collection page
      setSavedBooks((prev) =>
        isSaved ? prev.filter((id) => id !== bookId) : [bookId, ...prev]
      );
    } catch (err) {
      console.error("Toggle like failed", err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isLoading,
        books: bookCollection,
        activeModal,
        closeModal,
        openModal,
        handleLogin,
        handleRegister,
        logout,
        createBook,
        editBook,
        deleteBook,
        selectedBookId,
        setSelectedBookId,
        isLoggedIn,
        savedBooks,
        toggleSave,
      }}
    >
      {" "}
      {children}
    </AuthContext.Provider>
  );
};

// Hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
