import { useFormWithValidation } from "../../hooks/useFormWithValidation";
import { ReactNode, FormEventHandler } from "react";

interface ModalWithFormProps {
  children: ReactNode;
  name: string;
  buttonText: string;
  title: string;
  isOpen: boolean;
  handleModalClose: () => void;
  onSubmit: FormEventHandler<HTMLFormElement>;
  showSubmitButton?: boolean;
}

function ModalWithForm({
  children,
  name,
  buttonText,
  title,
  isOpen,
  handleModalClose,
  onSubmit,
  showSubmitButton = true,
}: ModalWithFormProps) {
  function handleOverlayClick(e: React.MouseEvent<HTMLDivElement>) {
    const target = e.target as HTMLElement;

    if (target.classList.contains("modal_opened")) {
      handleModalClose();
    }
  }

  const { isValid } = useFormWithValidation();

  return (
    <div
      className={`modal ${isOpen ? "modal_opened" : ""}`}
      onClick={handleOverlayClick}
    >
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button
          onClick={handleModalClose}
          type="button"
          className="modal__close-btn"
        />
        <form className="modal__form" name={name} onSubmit={onSubmit}>
          {children}
          {showSubmitButton && (
            <button
              type="submit"
              className="modal__submit-btn"
              disabled={isValid}
            >
              {buttonText}
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
