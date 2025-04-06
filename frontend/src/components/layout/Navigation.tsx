import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

function Navigation() {
  const { currentUser, openModal } = useAuth();

  const isLoggedIn = currentUser && currentUser.name;

  return (
    <nav
      className="flex items-center gap-5 flex-col
     text-lg flex-wrap justify-center text-white px-2 sm:flex-row"
    >
      <Link to="/">
        <button
          className="transition transform hover:-translate-y-1 hover:text-red-600 hover:text-[20px]"
          type="button"
        >
          Home
        </button>
      </Link>
      {isLoggedIn ? (
        <div className="flex items-center flex-col gap-5 flex-wrap justify-center sm:flex-row">
          <Link
            to="/saved-books"
            className="transition transform hover:-translate-y-1 hover:text-red-600 hover:text-[20px]"
          >
            {" "}
            {`${currentUser.name}'s Collection`}
          </Link>
          <button
            type="button"
            className="transition transform hover:-translate-y-1 hover:text-red-600 hover:text-[20px]"
            onClick={() => openModal("logout")}
          >
            {" "}
            Logout
          </button>
        </div>
      ) : (
        <button
          className="transition transform hover:-translate-y-1 hover:text-red-600 hover:text-[20px]"
          type="button"
          onClick={() => openModal("login")}
        >
          Sign in
        </button>
      )}
    </nav>
  );
}

export default Navigation;
