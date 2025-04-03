import BookItem from "./BookItem";
import { books } from "../../utils/book-data";
import { useAuth } from "../../contexts/AuthContext";

interface Book {
  _id: string;
  author?: string;
  country?: string;
  imageLink: string;
  language?: string;
  link: string;
  pages?: number;
  title: string;
  year: number;
}

function Main({
  setBookFormMode,
}: {
  setBookFormMode: (mode: "create" | "edit") => void;
}) {
  const { openModal } = useAuth();

  const openCreateModal = () => {
    openModal("configure-book");
    setBookFormMode("create");
  };

  return (
    <main className="flex justify-center items-center w-full bg-[rgba(0, 0, 0, 0.266)] text-white sx:max-w-fit">
      <div className="flex flex-col justify-center items-center w-full">
        <div className="relative w-full px-6 flex flex-col items-center justify-around sm:flex-row">
          <h1 className="font-bold m-0 text-4xl leading-6 md:mx-0 md:mt-10 md:mb-8 ">
            Explore Library
          </h1>
          <div className="sm:right-2 sm:absolute ">
            <button
              type="button"
              className="text-xl font-semibold px-6 py-2 border-2 mt-4 mx-5 border-black rounded-full bg-white text-black shadow-md hover:-translate-y-1 hover:text-red-600 hover:bg-black transition-all duration-300 ease-in-out hover:shadow-[0_4px_20px_rgba(255,0,0,0.5)] sm:mt-10 sm:mb-8 "
              onClick={openCreateModal}
            >
              Create New Book
            </button>
          </div>
        </div>
        {!books || books.length === 0 ? (
          <p className="text-4xl text-red-600 text-cetner mt-24">
            No results found. Try a different search!
          </p>
        ) : (
          <ul
            className="grid 
    gap-3 
    grid-cols-1 
    px-4 
    py-5 
    mx-auto 
    mt-0 
    mb-12 
    list-none 
   max-w-screen-2xl
    sm:grid-cols-2 sm:mt-7 
    md:grid-cols-3 
    lg:grid-cols-4 
    xl:grid-cols-5"
          >
            {books.map((book: Book) => {
              return (
                <BookItem
                  key={book.title}
                  book={book}
                  setBookFormMode={setBookFormMode}
                  // books={books}
                  // handleSaveMovie={handleSaveMovie}
                  // isLoggedIn={isLoggedIn}
                  // savedMovies={savedMovies}
                />
              );
            })}
          </ul>
        )}
      </div>
    </main>
  );
}

export default Main;
