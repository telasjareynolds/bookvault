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
  const { createBook, editBook, deleteBook, closeModal, setSelectedBookId } =
    useAuth();

  const initialValues = {
    title: "",
    author: "",
    year: "",
    imageLink: "",
    link: "",
  };

  const { values, handleChange, errors, resetForm } =
    useFormWithValidation(initialValues);

  useEffect(() => {
    if (!isOpen) return;

    if (mode === "edit" && selectedBook) {
      resetForm({
        title: selectedBook.title,
        author: selectedBook.author || "",
        year: selectedBook.year,
        imageLink: selectedBook.imageLink,
        link: selectedBook.link,
      });
    } else {
      resetForm(initialValues);
    }
  }, [isOpen]); // only on modal open

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    try {
      const parsedBookData: BookInput = {
        title: String(values.title),
        author: values.author ? String(values.author) : undefined,
        year: Number(values.year),
        imageLink: String(values.imageLink),
        link: String(values.link),
      };
  
      if (mode === "create") {
        await createBook(parsedBookData);
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
      deleteBook(selectedBook._id);
      closeModal();
    }
  };

  const handleCloseEditModal = () => {
    setSelectedBookId(null);
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
        {errors.title && <span className="text-red-600">{errors.title}</span>}
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
        {errors.year && <span className="text-red-600">{errors.year}</span>}
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
        {errors.author && <span className="text-red-600">{errors.author}</span>}
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
          <span className="text-red-600">{errors.imageLink}</span>
        )}
      </label>
      <label className="text-blue-500 mt-6">
        Link to book's Wikipedia page *{" "}
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
          required
        />
        {errors.link && <span className="text-red-600">{errors.link}</span>}
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
