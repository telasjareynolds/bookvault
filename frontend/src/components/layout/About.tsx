const About = () => {
  return (
    <section className="flex  flex-col justify-center items-center text-white w-[70%] my-[80px] mx-auto p-10 bg-black/80 shadow-[1px_1px_20px_white] sm:p-24">
      <h3 className="font-bold text:large sm:text-2xl py-3">
        Welcome to Book Vault!
      </h3>
      <p className="list-none pb-3 text-start text-sm sm:text-xl">
        Book Vault is your personal digital library designed to help you track,
        manage, and fall deeper in love with your reading journey. Whether
        you’re a casual reader or an avid bookworm (like me!), this app was
        built to make your collection feel beautifully organized and uniquely
        yours.
      </p>

      <h2 className="font-bold text:large sm:text-2xl py-3">Key Features:</h2>
      <ul className="about__list">
        <li className="list-none pb-3 text-start text-sm sm:text-xl">
          <strong>Create & Customize:</strong> Easily add books with all the
          essential info — title, author, year, image, and more. Update and
          delete your entries anytime.
        </li>
        <li className="list-none pb-3 text-start text-sm sm:text-xl">
          <strong>Save to Collection:</strong> Click the save button to add a
          book to your personal collection. Want to unsave? Just one click, and
          it's gone! View your collection of saved books.
        </li>
        <li className="list-none pb-3 text-start text-sm sm:text-xl">
          <strong>Browse Library:</strong> Discover all of the books on your
          account with striking covers and classic must-reads, always available
          to explore. You'll get a default 100 books to browse in your library
          upon registering. Delete these book and create your own custom library
          if desired.
        </li>
        <li className="list-none pb-3 text-start text-sm sm:text-xl">
          <strong>User Accounts:</strong> Sign up to save your collection, log
          in from any device, and enjoy a secure experience every time.
        </li>
        <li className="list-none pb-3 text-start text-sm sm:text-xl">
          <strong>Seamless UI:</strong> A responsive, cozy interface that keeps
          your reading experience distraction-free and visually satisfying.
        </li>
      </ul>

      <h2 className="font-bold text:large sm:text-2xl py-3">
        About the Developer:
      </h2>
      <p className=" list-none pb-3 text-start text-sm sm:text-xl">
        I'm Telasja Reynolds, and this project is a love letter to literature
        and learning. As someone who’s always had a book in hand—and now, a
        keyboard too—I created Book Vault to combine my lifelong love of reading
        with my passion for clean, delightful user experiences in software
        development.
      </p>

      <p className="list-none pb-3 text-start text-sm sm:text-xl ">
        I believe books can change lives, and I wanted to create something that
        helps readers feel more connected to their collections. Thanks for
        visiting Book Vault—happy reading!
      </p>
    </section>
  );
};

export default About;
