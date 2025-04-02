import { useState } from "react";

export interface FormValues {
  [key: string]: string | number; // supports text and number fields
}

export function useFormWithValidation(initialValues: FormValues = {}) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isValid, setIsValid] = useState(false);

  // For validation add a [errors, setErrors]

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, validationMessage, type } = e.target;
    const parsedValue = type === "number" ? Number(value) : value;

    setValues((prev) => ({ ...prev, [name]: parsedValue }));
    setErrors((prev) => ({
      ...prev,
      [name]: validationMessage,
    }));
    setIsValid(e.target.closest("form")?.checkValidity() || false);
  }

  function resetForm(newValues: FormValues = {}, newErrors: Record<string, string> = {}, newIsValid = false) {
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

