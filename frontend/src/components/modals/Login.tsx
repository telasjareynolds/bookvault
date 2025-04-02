import { ModalWithForm, ModalWithFormProps } from "./ModalWithForm";
// import "./LoginModal.css";
import { useFormWithValidation } from "../../hooks/useFormWithValidation.js";
import { useAuth } from "../../contexts/AuthContext.js";

// Using props from form
type LoginProps = ModalWithFormProps & {
  openRegisterModal: () => void;
};

function Login({
  handleModalClose,
  openRegisterModal,
  isOpen,
  buttonText,
}: LoginProps) {
  const { handleLogin } = useAuth();
  // how to use the hook
  const { values, handleChange, errors } = useFormWithValidation();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleLogin(values.email, values.password);
  };

  const modalInputClassName = `border-b-2 border-black mx-0 mt-2 mb-1 flex flex-col w-full px-0 pt-2 pb-0`;
  
  return (
    <ModalWithForm
      title="Log In"
      handleModalClose={handleModalClose}
      buttonText={buttonText}
      name="login"
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <label className="text-blue-500 mt-6">
        Email *{" "}
        <input
          name="email"
          autoComplete="email"
          className={modalInputClassName}
          id="login-email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          value={values.email}
          minLength={2}
          required
        />
        {errors.email && <span className="text-red-600">{errors.email}</span>}
      </label>
      <label className="text-blue-500 mt-6">
        Password *{" "}
        <input
          className={modalInputClassName}
          name="password"
          id="login-password"
          type="password"
          autoComplete="current-password"
          placeholder="Password"
          onChange={handleChange}
          value={values.password}
          required
          minLength={8}
        />
        {errors.password && (
          <span className="text-red-600">{errors.password}</span>
        )}
      </label>
      <div className="mt-6 text-center">
      <button
        type="button"
        className="text-[#2f71e5] hover:text-[#2f72e58b] bg-white border-none text-sm font-bold absolute bottom-10 left-0 right-0"
        onClick={openRegisterModal}
      >
        or Sign Up
      </button>
      </div>
    </ModalWithForm>
  );
}

export default Login;
