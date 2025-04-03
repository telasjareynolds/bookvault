import { useState, useEffect } from "react";

export interface FormValues {
  [key: string]: string | number;
}

export function useFormWithValidation(initialValues: FormValues = {}) {
  const [values, setValues] = useState<FormValues>({
    email: "",
    name: "",
    password: "",
    ...initialValues,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isValid, setIsValid] = useState(false);

  // Run validation on every value change
  useEffect(() => {
    const formIsValid = Object.values(errors).every((error) => error === "") &&
      Object.values(values).every((val) => val !== "");
    setIsValid(formIsValid);
  }, [errors, values]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, validationMessage, validity } = e.target;

    const parsedValue = name === "year" ? parseInt(value, 10) || "" : value;

    setValues((prev) => ({
      ...prev,
      [name]: parsedValue,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: validity.valid ? "" : validationMessage,
    }));
  }

  function resetForm(
    newValues: FormValues = {},
    newErrors: Record<string, string> = {},
    newIsValid = false
  ) {
    setValues(newValues);
    setErrors(newErrors);
    setIsValid(newIsValid);
  }

  return {
    values,
    setValues,
    handleChange,
    isValid,
    errors,
    resetForm,
  };
}