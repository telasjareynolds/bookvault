import { useAuth } from "../../contexts/AuthContext";
import { ModalWithForm, ModalWithFormProps } from "./ModalWithForm";

// Using props from form
type ConfirmDeleteProps = ModalWithFormProps & {
  bookId?: string;
};

function ConfirmDelete({
  isOpen = true,
  handleModalClose,
  name,
  title,
  bookId,
}: ConfirmDeleteProps) {
  const { deleteBook } = useAuth();

  if (!bookId) return null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    deleteBook(bookId);
    handleModalClose();
  };

  return (
    <ModalWithForm
      title={title}
      handleModalClose={handleModalClose}
      name={name}
      isOpen={isOpen}
      showSubmitButton={false}
      onSubmit={handleSubmit}
    >
      <button
        type="submit"
        className="absolute bottom-7 left-[42px] text-[#2f71e5] hover:text-[#2f72e58b] border-none text-[20px] font-bold font-[BonaNova] px-0 py-0 w-fit"
        disabled={!bookId}
      >
        Delete Book
      </button>
    </ModalWithForm>
  );
}

export default ConfirmDelete;
