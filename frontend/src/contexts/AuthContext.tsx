import { createContext, useContext, useState, ReactNode } from "react";

// Types
export interface User {
  email: string;
  name: string;
  _id: string;
}

export interface Book {
  _id: string;
  title: string;
  author?: string;
  year: number;
  imageLink: string;
  language?: string;
  pages?: number;
  link: string;
}

export interface UserWithCollection extends User {
  savedBooks: Book[];
}

export interface BookInput {
  _id: string;
  title: string;
  author?: string;
  year: number;
  imageLink: string;
  language?: string;
  pages?: number;
  link: string;
}

export interface AuthContextType {
  currentUser: User | null;
  books: Book[];
  isLoading: boolean;
  activeModal: string;
  openModal: (modal: string) => void;
  closeModal: () => void;
  handleLogin: (email: string, password: string) => Promise<UserWithCollection>;
  handleRegister: (
    userData: Partial<User> & { password: string }
  ) => Promise<UserWithCollection>;
  logout: () => void;
  createBook: (bookData: BookInput) => Promise<Book>;
  editBook: (id: string, updates: Partial<BookInput>) => Promise<Book>;
  deleteBook: (id: string) => Promise<void>;
  addToCollection: (book: Book) => void;
  removeFromCollection: (id: string) => void;
  selectedBookId: Book["_id"] | null;
  setSelectedBookId: (id: Book["_id"] | null) => void;
}

// Create Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [savedBooks, setSavedBooks] = useState<Book[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeModal, setActiveModal] = useState("");
  const [selectedBookId, setSelectedBookId] = useState<Book["_id"] | null>(
    null
  );

  const openModal = (modal: string) => {
    console.log("Modal button clicked", modal);
    setActiveModal(modal);
  };
  const closeModal = () => setActiveModal("");

  // STUBS — Add real logic later
  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true);
    return {
      email,
      name: "Demo",
      _id: "1",
      savedBooks: [],
    };
  };

  const handleRegister = async (userData: any) => {
    return {
      email: userData.email,
      name: userData.name,
      _id: "2",
      savedBooks: [],
    };
  };

  const logout = () => setCurrentUser(null);

  const createBook = async (bookData: BookInput) => {
    return { _id: "1", ...bookData };
  };

  const editBook = async (
    id: string,
    updates: Partial<BookInput>
  ): Promise<Book> => {
    setSelectedBookId(id);
    return {
      _id: id,
      title: updates.title ?? "Untitled Book",
      author: updates.author ?? "Unknown",
      year: updates.year ?? 1900,
      imageLink: updates.imageLink ?? "placeholder.jpg",
      language: updates.language ?? "English",
      pages: updates.pages ?? 100,
      link: updates.link ?? "#",
    };
  };

  const deleteBook = async (id: string) => {
    setSelectedBookId(id);
  };

  const addToCollection = (book: Book) => {
    setSavedBooks((prev) => [...prev, book]);
  };

  const removeFromCollection = (id: string) => {
    setSavedBooks((prev) => prev.filter((book) => book._id !== id));
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isLoading,
        books: savedBooks,
        activeModal,
        closeModal,
        openModal,
        handleLogin,
        handleRegister,
        logout,
        createBook,
        editBook,
        deleteBook,
        addToCollection,
        removeFromCollection,
        selectedBookId,
        setSelectedBookId,
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
