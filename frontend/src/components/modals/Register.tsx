import { useState } from "react";
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

  const [submitError, setSubmitError] = useState<string | null>(null);

  const registerInitialValues = {
    email: "",
    name: "",
    password: "",
  };

  const { values, handleChange, errors, isValid, resetForm } =
    useFormWithValidation(registerInitialValues, ["email", "name", "password"]);

  const { handleRegister, openModal } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError(null);

    try {
      await handleRegister({
        email: String(values.email),
        name: String(values.name),
        password: String(values.password),
      });

      resetForm();
      openModal("successful-registration");
    } catch (error: any) {
      console.error("Registration failed:", error);
      // Check for "user already exists" from backend
      if (
        error.response?.status === 400 &&
        error.response?.data?.message === "User already exists"
      ) {
        setSubmitError("A user with this email already exists.");
      } else {
        setSubmitError("Something went wrong. Please try again.");
      }
    }
  };

  const modalInputClassName = `border-b-[1px] border-black mx-0 mt-2 mb-1 flex flex-col w-full px-0 pt-2 pb-0 text-black`;

  return (
    <ModalWithForm
      title={title}
      handleModalClose={handleModalClose}
      buttonText={buttonText}
      name={name}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      isValid={isValid}
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
          minLength={6}
        />
        {errors.email && (
          <span className="text-red-600 text-wrap max-w-fit">
            {errors.email}
          </span>
        )}{" "}
        {submitError && (
          <span className="text-red-600 text-sm">{submitError}</span>
        )}
      </label>
      <label className="text-blue-500 mt-6">
        Name *{" "}
        <input
          name="name"
          className={modalInputClassName}
          id="name"
          type="text"
          autoComplete="name"
          placeholder="Name"
          onChange={handleChange}
          value={values.name}
          minLength={2}
        />
        {errors.name && (
          <span className="text-red-600 text-wrap max-w-fit">
            {errors.name}
          </span>
        )}{" "}
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
          <span className="text-red-600 text-wrap max-w-fit">
            {errors.password}
          </span>
        )}{" "}
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
