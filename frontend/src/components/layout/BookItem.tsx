import saved from "../../images/saved_btn.svg";
import unsaved from "../../images/unsaved_btn.svg";
import { Link } from "react-router-dom";

function BookItem({ book /*, handleSaveMovie, isLoggedIn, savedMovies */ }) {
  // const isMovieSaved = savedMovies.some(
  //   (savedMovie) => savedMovie.imdbID === movie.imdbID
  // );

  // set card Save on frontend until backend is built

  // function onCardSave(e) {
  //   e.preventDefault();
  //   handleSaveMovie(movie);
  // }

  let isLoggedIn = true;
  let isMovieSaved = true;

  return (
    <li className="w-[250px] md:w-[200px] lg:w-[225px] relative transition-transform hover:-translate-y-5">
      <Link className="no-underline" to={`${book.link}`}>
        <div className="relative list-none flex flex-col w-full bg-slate-200 rounded-xl border-blue-50 border-[0.5px]shadow-none overflow-hidden justify-between items-center h-full shadow-[4px_2px_9px_red]">
          <img
            src={`https://raw.githubusercontent.com/benoitvallon/100-best-books/master/static/${book.imageLink}`}
            alt={book.title}
            className="w-full h-auto object-cover"
          />
          <div className="text-base max-w-full text-wrap flex m-auto text-center text-black font-bold relative">
            <p className="bg-transparent px-3 py-[2] leading-5 w-fit h-fit m-0 rounded">
              {book.title} ({book.year})
            </p>
          </div>
        </div>
      </Link>
      {isLoggedIn && (
        <img
          src={isMovieSaved ? saved : unsaved} // Toggle Save button image
          alt={isMovieSaved ? "saved" : "not saved"}
          className="absolute top-4 right-4"
          // onClick={onCardSave}
        />
      )}
    </li>
  );
}

export default BookItem;
