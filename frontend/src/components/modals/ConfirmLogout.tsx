import { useAuth } from "../../contexts/AuthContext";
import { ModalWithForm, ModalWithFormProps } from "./ModalWithForm";

function ConfirmLogout({ isOpen, handleModalClose }: ModalWithFormProps) {
  const { logout } = useAuth();
  return (
    <ModalWithForm
      title="Would you like to log out"
      handleModalClose={handleModalClose}
      name="logout"
      isOpen={isOpen}
      showSubmitButton={false}
    >
      <button
        type="button"
        className="absolute bottom-7 left-[42px] text-[#2f71e5] hover:text-[#2f72e58b]  border-none text-[20px] font-bold font-[BonaNova] px-0 py-0 w-fit"
        onClick={logout}
      >
        Log Out
      </button>
    </ModalWithForm>
  );
}

export default ConfirmLogout;
