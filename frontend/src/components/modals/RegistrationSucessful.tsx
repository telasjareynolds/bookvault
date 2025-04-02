import { ModalWithForm, ModalWithFormProps } from "../modals/ModalWithForm";

// Using props from form
type RegistrationSuccessfulProps = ModalWithFormProps & {
  openLoginModal: () => void;
};

function RegistrationSuccessful({
  isOpen,
  handleModalClose,
  openLoginModal,
}: RegistrationSuccessfulProps) {
  return (
    <ModalWithForm
      title="Registration successfully completed!"
      handleModalClose={handleModalClose}
      name="successful-registration"
      isOpen={isOpen}
      showSubmitButton={false}
    >
      <button type="button" onClick={openLoginModal}>
        Sign in
      </button>
    </ModalWithForm>
  );
}

export default RegistrationSuccessful;
