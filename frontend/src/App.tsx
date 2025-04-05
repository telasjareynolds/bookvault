import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import libraryBg from "./images/library-4.jpg";
import ProtectedRoute from "./protected-route/protected-route.tsx";
import {
  Header,
  Footer,
  Main,
  Preloader,
  UserCollection,
} from "./components/layout/index.ts";
import {
  Login,
  RegistrationSuccessful,
  Register,
  ConfirmLogout,
  ConfirmDelete,
  BookConfig,
} from "./components/index.ts";
import { useAuth } from "./contexts/AuthContext.tsx";

function App() {
  const [bookFormMode, setBookFormMode] = useState<"create" | "edit">("create");
  const {
    books,
    logout,

    openModal,
    closeModal,
    activeModal,
    selectedBookId,
    isLoading,
  } = useAuth();

  //Stop ESC listener if there are no active modals
  useEffect(() => {
    if (!activeModal) return;
    const handleEscClose = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };

    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);

  // For making sure user stays on their current route
  const location = useLocation();
  const navigate = useNavigate();

  // Save the current route whenever it changes
  useEffect(() => {
    localStorage.setItem("lastRoute", location.pathname);
  }, [location]);

  //  On mount, redirect to saved route (but only once)
  useEffect(() => {
    const lastRoute = localStorage.getItem("lastRoute");
    if (lastRoute && window.location.pathname === "/") {
      navigate(lastRoute, { replace: true });
    }
  }, []);

  // Get full book object for bookId
  const selectedBook = books.find((book) => {
    return book._id === selectedBookId;
  });

  return (
    <>
      {isLoading ? (
        <Preloader />
      ) : (
        <>
          <Header
            openLoginModal={() => openModal("login")}
            openLogoutModal={() => openModal("logout")}
          />
          <div
            className="flex flex-wrap sm:items-center sm:justify-center relative w-full min-h-screen bg-repeat bg-[length:400px_400px] font-[BonaNova] text-center"
            style={{
              backgroundImage: `url(${libraryBg}), radial-gradient(circle at top center, rgba(0,0,0,0.550), rgba(0,0,0,.5))`,
              backgroundBlendMode: "overlay",
            }}
          >
            <Routes>
              <Route
                path="/"
                element={<Main setBookFormMode={setBookFormMode} />}
              />
              <Route
                path="/saved-books"
                element={
                  <ProtectedRoute>
                    <UserCollection setBookFormMode={setBookFormMode} />
                  </ProtectedRoute>
                }
              ></Route>
            </Routes>
          </div>
          <Footer />
        </>
      )}
      <Register
        handleModalClose={closeModal}
        isOpen={activeModal === "register"}
        buttonText={isLoading ? "Saving..." : "Sign Up"}
        openLoginModal={() => openModal("login")}
        name="register"
        title="Register"
      />
      <Login
        name={"login"}
        title={"Log In"}
        handleModalClose={closeModal}
        isOpen={activeModal === "login"}
        buttonText={isLoading ? "Saving..." : "Log In"}
        openRegisterModal={() => openModal("register")}
      />
      <RegistrationSuccessful
        title="Registration successfully completed!"
        handleModalClose={closeModal}
        name="successful-registration"
        isOpen={activeModal === "successful-registration"}
        openLoginModal={() => openModal("login")}
      />

      <ConfirmLogout
        title="Would you like to log out?"
        handleModalClose={closeModal}
        name="logout"
        isOpen={activeModal === "logout"}
        onSubmit={logout}
      />
      <ConfirmDelete
        title="Are you sure you want to delete this book?"
        handleModalClose={closeModal}
        name="confirm-delete"
        isOpen={activeModal === "confirm-delete"}
        bookId={selectedBook?._id}
      />
      <BookConfig
        title={bookFormMode === "edit" ? "Edit Book" : "Create Book"}
        selectedBook={selectedBook}
        handleModalClose={closeModal}
        name="configure-book"
        isOpen={activeModal === "configure-book"}
        mode={bookFormMode}
        buttonText={isLoading ? "Saving..." : "Save"}
      />
    </>
  );
}

export default App;
