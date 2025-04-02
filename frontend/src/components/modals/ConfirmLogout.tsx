import { useAuth } from "../../contexts/AuthContext";
import { ModalWithForm, ModalWithFormProps} from "./ModalWithForm";

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
      <button type="button" className="signout-btn" onClick={logout}>
        Log Out
      </button>
    </ModalWithForm>
  );
}

export default ConfirmLogout;
