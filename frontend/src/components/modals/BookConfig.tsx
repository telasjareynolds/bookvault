import { useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { ModalWithForm, ModalWithFormProps } from "./ModalWithForm";
import { Book, BookInput } from "../../contexts/AuthContext";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";

type BookFormModalProps = ModalWithFormProps & {
  mode: "create" | "edit";
  selectedBook?: Book | null;
};

const BookConfig = ({
  isOpen,
  mode,
  name,
  selectedBook,
  buttonText,
}: BookFormModalProps) => {
  const { createBook, editBook, closeModal, setSelectedBookId, openModal } =
    useAuth();

  const imageUrl = selectedBook?.imageLink.startsWith("https")
    ? selectedBook.imageLink
    : `https://raw.githubusercontent.com/benoitvallon/100-best-books/master/static/${selectedBook?.imageLink}`;

  const initialValues = {
    title: "",
    author: "",
    year: "",
    imageLink: "",
    link: "",
  };

  const requiredFields = ["title", "year", "imageLink"];

  const { values, handleChange, errors, resetForm, isValid } =
    useFormWithValidation(initialValues, requiredFields);

  useEffect(() => {
    if (!isOpen) return;

    if (mode === "edit" && selectedBook) {
      resetForm({
        title: selectedBook.title,
        author: selectedBook.author || "",
        year: selectedBook.year,
        imageLink: imageUrl,
        link: selectedBook.link || "",
      });
    }

    if (mode === "create" && Object.values(values).every((val) => val === "")) {
      resetForm(initialValues); // Only reset if user hasn't typed anything yet
    }
  }, [isOpen, selectedBook]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const parsedBookData: BookInput = {
        title: String(values.title),
        author: values.author ? String(values.author) : undefined,
        year: Number(values.year),
        imageLink: String(values.imageLink),
        link: values.link ? String(values.link) : undefined,
      };

      if (mode === "create") {
        await createBook(parsedBookData);
        console.log(parsedBookData);
      } else if (mode === "edit" && selectedBook) {
        await editBook(selectedBook._id, parsedBookData);
      }

      resetForm();
      closeModal();
    } catch (err) {
      console.error("Error submitting book:", err);
    }
  };

  const handleDelete = () => {
    if (selectedBook) {
      openModal("confirm-delete");
    }
  };

  const handleCloseEditModal = () => {
    setSelectedBookId(null);
    resetForm(initialValues); // clear it out cleanly
    closeModal();
  };

  const dynamicModalTitle = mode === "edit" ? "Edit Book" : "Create Book";

  const modalInputClassName = `border-b-[1px] border-black mx-0 mt-2 mb-1 flex flex-col w-full px-0 pt-2 pb-0 text-black`;

  return (
    <ModalWithForm
      name={name}
      title={dynamicModalTitle}
      onSubmit={handleSubmit}
      isOpen={isOpen}
      handleModalClose={handleCloseEditModal}
      buttonText={buttonText}
      isValid={isValid}
    >
      {" "}
      <label className="text-blue-500 mt-6">
        Title *{" "}
        <input
          name="title"
          className={modalInputClassName}
          id="title"
          type="text"
          autoComplete="title"
          placeholder="Book Title"
          onChange={handleChange}
          value={values.title}
          minLength={2}
          required
        />
        {errors.title && (
          <span className="text-red-600 text-wrap max-w-fit">
            {errors.title}
          </span>
        )}
      </label>
      <label className="text-blue-500 mt-6">
        Year *{" "}
        <input
          type="text"
          name="year"
          id="year"
          placeholder="Year"
          pattern="^\d{4}$"
          maxLength={4}
          required
          value={values.year?.toString() ?? ""}
          onChange={handleChange}
          className={modalInputClassName}
        />
        {errors.year && (
          <span className="text-red-600 text-wrap max-w-fit">
            {errors.year}
          </span>
        )}
      </label>
      <label className="text-blue-500 mt-6">
        Author (optional){" "}
        <input
          name="author"
          className={modalInputClassName}
          id="author"
          type="text"
          autoComplete="author"
          placeholder="Author"
          onChange={handleChange}
          value={values.author}
          minLength={2}
        />
        {errors.author && (
          <span className="text-red-600 text-wrap max-w-fit">
            {errors.author}
          </span>
        )}
      </label>
      <label className="text-blue-500 mt-6">
        Image Link *{" "}
        <input
          name="imageLink"
          className={modalInputClassName}
          id="imageLink"
          type="url"
          autoComplete="imageLink"
          placeholder="Image Link"
          onChange={handleChange}
          value={values.imageLink}
          minLength={2}
          required
        />
        {errors.imageLink && (
          <span className="text-red-600 text-wrap max-w-fit">
            {errors.imageLink}
          </span>
        )}
      </label>
      <label className="text-blue-500 mt-6">
        Link to book's Wikipedia page (optional){" "}
        <input
          name="link"
          className={modalInputClassName}
          id="link"
          type="url"
          autoComplete="link"
          placeholder="Wikipedia Link"
          onChange={handleChange}
          value={values.link}
          minLength={2}
        />
        {errors.link && (
          <span className="text-red-600 text-wrap max-w-fit">
            {errors.link}
          </span>
        )}
      </label>
      {mode === "edit" && (
        <button
          type="button"
          className="text-[#2f71e5] hover:text-[#2f72e58b] bg-white border-none text-sm font-bold absolute bottom-6 left-0 right-0"
          onClick={handleDelete}
        >
          Delete book
        </button>
      )}
    </ModalWithForm>
  );
};

export default BookConfig;
