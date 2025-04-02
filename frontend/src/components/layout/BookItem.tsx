import saved from "../../images/saved_btn.svg";
import unsaved from "../../images/unsaved_btn.svg";
import { Link } from "react-router-dom";
import editBtn from "../../images/edit-button.png";
import { Book } from "../../contexts/AuthContext";
import { useAuth } from "../../contexts/AuthContext";

interface BookItemProps {
  book: Book;
  setBookFormMode: (mode: "create" | "edit") => void;
}

function BookItem({ book, setBookFormMode }: BookItemProps) {
  const { openModal, setSelectedBookId, addToCollection } = useAuth();

  const handleOpenConfigModal = () => {
    setBookFormMode("edit");
    setSelectedBookId(book._id);
    openModal("configure-book");
  };

  // const isMovieSaved = savedMovies.some(
  //   (savedMovie) => savedMovie.imdbID === movie.imdbID
  // );

  // set card Save on frontend until backend is built

  function onBookSave(e: React.MouseEvent<HTMLImageElement>) {
    e.preventDefault();
    addToCollection(book);
  }

  let isLoggedIn = true;
  let isMovieSaved = true;

  return (
    <li className="w-[250px] md:w-[200px] lg:w-[225px] relative transition-transform hover:-translate-y-5">
      <Link className="no-underline" to={`${book.link}`}>
        <div className="relative list-none flex flex-col w-full bg-white bg-opacity-75 rounded-xl border-blue-50 border-[0.5px]shadow-none overflow-hidden justify-between items-center h-full shadow-[4px_2px_9px_red]">
          <img
            src={`https://raw.githubusercontent.com/benoitvallon/100-best-books/master/static/${book.imageLink}`}
            alt={book.title}
            className="w-full h-auto object-cover"
          />
          <div className="text-base max-w-full text-wrap flex m-auto text-center text-black font-bold relative">
            <p className="bg-transparent px-3 py-0.5 leading-5 w-fit h-fit m-0 rounded">
              <span className="border-b-2 border-black border-opacity-30">
                {book.title}
              </span>
              {book.author !== "Unknown" && <span>{` by ${book.author}`}</span>}
              <span>{` (${book.year})`}</span>
            </p>
          </div>
        </div>
      </Link>
      {isLoggedIn && (
        <>
          <img
            src={isMovieSaved ? saved : unsaved}
            alt={isMovieSaved ? "saved" : "not saved"}
            className="absolute top-4 right-3 h-8 w-8 cursor-pointer transition-transform duration-300 transform hover:scale-125 shadow-[0_4px_20px_rgba(0,0,0,0.6)] rounded-lg"
            onClick={onBookSave}
          />
          <img
            src={editBtn}
            alt="Edit button"
            className="absolute top-14 right-3 h-7 w-7 bg-white rounded-lg cursor-pointer transition-transform duration-300 transform hover:scale-125 shadow-[0_8px_25px_rgba(0,0,0,0.9)] p-[5px]"
            onClick={handleOpenConfigModal}
          />
        </>
      )}
    </li>
  );
}

export default BookItem;
