import { useAuth } from "../../contexts/AuthContext";
import { ModalWithForm, ModalWithFormProps } from "./ModalWithForm";
import { BookInput, Book } from "../../contexts/AuthContext";

type BookFormModalProps = ModalWithFormProps & {
  mode: "create" | "edit" | "view";
  selectedBook?: Book | null;
  onCreate: (book: BookInput) => void;
  onUpdate: (id: string, updates: Partial<BookInput>) => void;
  onDelete: (id: string) => void;
}

export const BookFormModal = ({
  isOpen,
  mode,
  name,
  title,
  selectedBook,
  handleModalClose,
  buttonText,
}: BookFormModalProps) => {
  const { createBook, editBook, deleteBook } = useAuth();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (mode === "create") {
      createBook(formValues);
      buttonText= "Create Book"
    } else if (mode === "edit" && selectedBook) {
      editBook(selectedBook._id, formValues);
      buttonText= "Edit Book"
    }
    handleModalClose();
  };

  const handleDelete = () => {
    if (selectedBook) {
      deleteBook(selectedBook._id);
      handleModalClose();
    }
  };

  return (
    <ModalWithForm
      name={name}
      title={title}
      onSubmit={handleSubmit}
      isOpen={isOpen}
      handleModalClose={handleModalClose}
    >
    </ModalWithForm>
  );
};