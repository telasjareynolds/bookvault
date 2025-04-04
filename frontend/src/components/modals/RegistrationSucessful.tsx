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
      <button type="button" onClick={openLoginModal} className="absolute bottom-7 left-[42px] text-[#2f71e5] hover:text-[#2f72e58b] border-none text-[20px] font-bold font-[BonaNova] px-0 py-0 w-fit">
        Sign in
      </button>
    </ModalWithForm>
  );
}

export default RegistrationSuccessful;
