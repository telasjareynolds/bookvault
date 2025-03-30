import { Navigation } from "./index";
import logo from "../../images/logo.png";
import { Link } from "react-router-dom";

function Header({ /* onSearch, openSignInModal, openSignOutModal, resetSearch*/ }) {
  return (
    <header className="flex flex-wrap items-center justify-center flex-col sm:justify-between sm:flex-row bg-black font-bold pt-0 pb-5 min-w-fit text-center">

        <Link to="/">
          <img className="w-24 h-17 pl-2 py-2" src={logo} alt="header logo" />
        </Link>
        <h2 className="leading-9 text-4xl font-bold text-center text-white">Book Vault</h2>
  
      <div className="flex gap-3 flex-wrap justify-center">
        <Navigation
          // openSignInModal={openSignInModal}
          // openSignOutModal={openSignOutModal}
        />
      </div>
    </header>
  );
}

export default Header;
