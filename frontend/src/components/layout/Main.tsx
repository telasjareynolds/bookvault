import BookItem from "./BookItem";
import { books } from "../../utils/book-data";

interface Book {
  author?: string;
  country?: string;
  imageLink: string;
  language?: string;
  link: string;
  pages?: number;
  title: string;
  year: number;
}

function Main(
  {
    /*books, handleSaveMovie, isLoggedIn, savedMovies */
  }
) {
  return (
    <main className="flex justify-center items-center w-full bg-[rgba(0, 0, 0, 0.266)] text-white sx:max-w-fit">
      <div className="flex flex-col justify-center items-center w-full">
        <h1 className=" m-0 text-4xl leading-6 md:mx-0 md:mt-10 md:mb-8 ">
          Fan Favorites
        </h1>
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
