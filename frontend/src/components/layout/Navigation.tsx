import { Link } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.ts";
import { useContext } from "react";

function Navigation({ /*openSignInModal, openSignOutModal*/ }) {
  const currentUser = useContext(CurrentUserContext);

  const isLoggedIn = currentUser && currentUser.name;

  return (
    <nav className="flex items-center gap-3 text-lg flex-wrap justify-center text-white px-2">
      <Link to="/">
        <button className="transition transform hover:-translate-y-1 hover:text-red-600 hover:text-[20px]" type="button">
          Home
        </button>
      </Link>
      {isLoggedIn ? (
        <div className="flex items-center gap-3 flex-wrap justify-center">
          <Link to="/saved-movies" className="transition transform hover:-translate-y-1 hover:text-red-600 hover:text-[20px]">
            {" "}
            {`${currentUser.name}'s Collection`}
          </Link>
          <button
            type="button"
            className="transition transform hover:-translate-y-1 hover:text-red-600 hover:text-[20px]"
            // onClick={openSignOutModal}
          >
            {" "}
            Welcome Back, {currentUser.name}
          </button>
        </div>
      ) : (
        <button
          className="transition transform hover:-translate-y-1 hover:text-red-600 hover:text-[20px]"
          type="button"
          // onClick={openSignInModal}
        >
          Sign in
        </button>
      )}
    </nav>
  );
}

export default Navigation;
