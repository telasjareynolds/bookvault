import { ReactNode, FormEventHandler } from "react";
import closeBtn from "../../images/close-button.png";
import { useAuth } from "../../contexts/AuthContext";

export interface ModalWithFormProps {
  children?: ReactNode;
  name: string;
  buttonText?: string;
  title: string;
  isOpen: boolean;
  handleModalClose?: () => void;
  onSubmit?: FormEventHandler<HTMLFormElement>;
  showSubmitButton?: boolean;
  isValid?: boolean;
}

export const ModalWithForm = ({
  children,
  name,
  buttonText,
  title,
  isOpen,
  handleModalClose,
  onSubmit,
  isValid,
  showSubmitButton = true,
}: ModalWithFormProps) => {

  const { closeModal } = useAuth();
  const onClose = handleModalClose || closeModal;

  function handleOverlayClick(e: React.MouseEvent<HTMLDivElement>) {
    if ((e.target as HTMLElement).id === "modal-overlay") {
      closeModal();
    }
  }

  return (
    <div
      id="modal-overlay"
      className={`fixed inset-0 z-[999] flex items-center justify-center transition-opacity duration-300 ease-in-out ${
        isOpen
          ? "opacity-100 pointer-events-auto bg-black bg-opacity-70"
          : "opacity-0 pointer-events-none"
      }`}
      onClick={handleOverlayClick}
    >
      <div className="relative bg-white text-black min-w-60 border rounded-3xl border-black padding pt-5 px-10 pb-16 sm:min-w-96">
        <h2 className="p-0 mx-0 mb-0 mt-7">{title}</h2>
        <button
          onClick={onClose}
          type="button"
          className="absolute top-4 right-6 w-5 h-6 bg-no-repeat bg-contain bg-center transition-transform duration-200 ease-in-out hover:scale-125"
          style={{ backgroundImage: `url(${closeBtn})` }}
        />
        <form
          className="flex flex-col justify-center"
          name={name}
          onSubmit={onSubmit}
        >
          {children}
          {showSubmitButton && (
            <button
              type="submit"
              className="w-full sm:w-auto flex justify-center items-center text-center bg-black hover:bg-slate-900 text-white border-none mt-5 px-6 py-3 rounded-full transition disabled:opacity-60 disabled:cursor-not-allowed"
              disabled={!isValid}
            >
              {buttonText}
            </button>
          )}
        </form>
      </div>
    </div>
  );
};
