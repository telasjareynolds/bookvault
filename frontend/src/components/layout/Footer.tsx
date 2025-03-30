import github from "../../images/github.png";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="items-center justify-center text-center flex  px-5 py-2 relative flex-wrap bg-black text-white sm:justify-between">
      <p>@ 2024 Telasja Reynolds, Powered by OMDb API</p>
      <nav className="flex items-center">
        <Link
          to="/about"
          className="pr-3 no-underline transition transform hover:-translate-y-1 hover:text-red-600 hover:text-[20px]"
        >
          About
        </Link>
        <a
          href="https://github.com/telasjareynolds/bookvault"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={github} alt="github icon" className="h-7 w-7 transition transform hover:-translate-y-1 hover:text-[20px] hover:h-8 hover:w-8" />
        </a>
      </nav>
    </footer>
  );
}

export default Footer;
