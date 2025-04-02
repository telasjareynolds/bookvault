import { useAuth } from "../../contexts/AuthContext";
import { ModalWithForm, ModalWithFormProps } from "./ModalWithForm";
import { BookInput, Book } from "../../contexts/AuthContext";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";

type BookFormModalProps = ModalWithFormProps & {
  mode: "create" | "edit";
  selectedBook?: Book | null;
  onCreate: (book: BookInput) => void;
  onUpdate: (id: string, updates: Partial<BookInput>) => void;
  onDelete: (id: string) => void;
};

const BookConfig = ({
  isOpen,
  mode,
  name,
  selectedBook,
  buttonText,
}: BookFormModalProps) => {
  const { createBook, editBook, deleteBook, closeModal, setSelectedBookId } = useAuth();

  const initialValues = {
    title: "",
    author: "",
    year: "",
    imageLink: "",
    link: "",
  };

  const { values, handleChange, isValid, errors, resetForm} =
    useFormWithValidation(initialValues);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (mode === "create") {
   
      buttonText = "Create Book";
    } else if (mode === "edit" && selectedBook) {
      editBook(selectedBook._id, values);
      
    }
    resetForm();
    closeModal();
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
  }

  const dynamicButtonText = mode === "edit" ? "Edit Book" : "Create Book";

  const modalInputClassName = `border-b-[1px] border-black mx-0 mt-2 mb-1 flex flex-col w-full px-0 pt-2 pb-0`;

  return (
    <ModalWithForm
      name={name}
      title={dynamicButtonText}
      onSubmit={handleSubmit}
      isOpen={isOpen}
      handleModalClose={handleCloseEditModal}
      buttonText={dynamicButtonText}
    >      <label className="text-blue-500 mt-6">
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
      className={modalInputClassName}
      name="year"
      autoComplete="year"
      id="year"
      type="number"
      placeholder="Year"
      onChange={handleChange}
      value={values.year}
      minLength={4}
      required
    />
    {errors.year && (
      <span className="text-red-600">{errors.year}</span>
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
      <span className="text-red-600">{errors.author}</span>
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
    {errors.link && (
      <span className="text-red-600">{errors.link}</span>
    )}
  </label>
  </ModalWithForm>
  );
};


export default BookConfig;