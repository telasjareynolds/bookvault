import { useState } from "react";
import BookItem from "./BookItem";
import { useAuth } from "../../contexts/AuthContext";
import { Book } from "../../contexts/AuthContext";

function Main({
  setBookFormMode,
}: {
  setBookFormMode: (mode: "create" | "edit") => void;
}) {
  const { openModal, books, isLoggedIn } = useAuth();

  const openCreateModal = () => {
    openModal("configure-book");
    setBookFormMode("create");
  };

  // Logic that controls the state of the default books
  const [visibleCount, setVisibleCount] = useState(10);
  // Books will be loaded 10 at a time and then on click of handleSeeMore button, add 10 more to the initial 10 so that all 100 books are not rendering on page load
  const visibleBooks = books.slice(0, visibleCount);

  const handleSeeMore = () => {
    setVisibleCount((prev) => prev + 10);
  };

  return (
    <main className="flex justify-center items-center w-full bg-[rgba(0, 0, 0, 0.266)] text-white sx:max-w-fit">
      <div className="flex flex-col justify-center items-center w-full">
        <div className={`relative w-full px-[100px] flex flex-col items-center gap-4 md:flex-row md:items-center  2xl:px-[400px] ${
    isLoggedIn ? "justify-around md:justify-between" : "justify-center"  
  }`}>
          <h1 className={`font-bold m-0 text-4xl leading-6 md:mt-10 md:mb-8 text-center md:text-left md:mx-0 ${isLoggedIn ? "mx-auto md:mr-auto" : "m-0"}`}>
            Explore Library
          </h1>
          {isLoggedIn && (
          <div className="mt-4 md:mt-10 md:mb-8 md:ml-auto">
            <button
              type="button"
              className="text-xl font-semibold px-6 py-2 border-2 border-black rounded-full bg-white text-black shadow-md hover:-translate-y-1 hover:text-red-600 hover:bg-black transition-all duration-300 ease-in-out hover:shadow-[0_4px_20px_rgba(255,0,0,0.5)]"
              onClick={openCreateModal}
            >
              Create New Book
            </button>
          </div>
        )}
        </div>
        {!books || books.length === 0 ? (
          <p className="text-4xl text-red-600 text-cetner mt-24">
            No books found.
          </p>
        ) : (
          <>
            <ul
              className="grid 
    gap-3 
    grid-cols-1 
    px-4 
    py-5 
    mx-auto 
    mt-0 
    mb-6
    list-none 
   max-w-screen-2xl
    sm:grid-cols-2 sm:mt-7 
    md:grid-cols-3 
    lg:grid-cols-4 
    xl:grid-cols-5"
            >
              {visibleBooks.map((book: Book) => (
                <BookItem
                  key={book._id}
                  book={book}
                  setBookFormMode={setBookFormMode}
                />
              ))}
            </ul>
            {visibleCount < books.length && (
              <button
                onClick={handleSeeMore}
                className="mb-8 text-xl font-semibold px-6 py-2 border-2 border-black rounded-full bg-white text-black shadow-md hover:-translate-y-1 hover:text-red-600 hover:bg-black transition-all duration-300 ease-in-out hover:shadow-[0_4px_20px_rgba(255,0,0,0.5)]"
              >
                See More
              </button>
            )}
          </>
        )}
      </div>
    </main>
  );
}

export default Main;
