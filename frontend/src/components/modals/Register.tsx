import { ModalWithForm, ModalWithFormProps } from "./ModalWithForm.js";
import { useFormWithValidation } from "../../hooks/useFormWithValidation.js";
import { useAuth } from "../../contexts/AuthContext.js";

// Using props from form
type RegisterProps = ModalWithFormProps & {
  openLoginModal: () => void;
};

function Register({
  handleModalClose,
  title,
  name,
  isOpen,
  buttonText,
  openLoginModal,
}: RegisterProps) {
  // how to use the hook
  const { values, handleChange, errors, resetForm } = useFormWithValidation();

  const { handleRegister } = useAuth();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleRegister({
      email: "demo@example.com",
      name: "Demo User",
      password: "password123",
    });
    resetForm();
  };

  const modalInputClassName = `border-b-[1px] border-black mx-0 mt-2 mb-1 flex flex-col w-full px-0 pt-2 pb-0`;

  return (
    <ModalWithForm
      title={title}
      handleModalClose={handleModalClose}
      buttonText={buttonText}
      name={name}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <label className="text-blue-500 mt-6">
        Email *{" "}
        <input
          name="email"
          className={modalInputClassName}
          id="email"
          type="email"
          autoComplete="email"
          placeholder="Email"
          onChange={handleChange}
          value={values.email}
          minLength={2}
        />
        {errors.email && <span className="text-red-600">{errors.email}</span>}
      </label>
      <label className="text-blue-500 mt-6">
        Password *{" "}
        <input
          className={modalInputClassName}
          name="password"
          autoComplete="current-password"
          id="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          value={values.password}
          minLength={8}
        />
        {errors.password && (
          <span className="text-red-600">{errors.password}</span>
        )}
      </label>
      <label className="text-blue-500 mt-6">
        Userame *{" "}
        <input
          name="username"
          className={modalInputClassName}
          id="username"
          type="text"
          autoComplete="username"
          placeholder="Username"
          onChange={handleChange}
          value={values.username}
          minLength={2}
        />
        {errors.username && (
          <span className="text-red-600">{errors.username}</span>
        )}
      </label>
      <button
        type="button"
        className="text-[#2f71e5] hover:text-[#2f72e58b] bg-white border-none text-sm font-bold absolute bottom-10 left-0 right-0"
        onClick={openLoginModal}
      >
        or Log In
      </button>
    </ModalWithForm>
  );
}

export default Register;
