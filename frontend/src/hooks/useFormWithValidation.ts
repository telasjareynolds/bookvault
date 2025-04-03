import { useState } from "react";

export interface FormValues {
  [key: string]: string | number; // supports text and number fields
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

  // For validation add a [errors, setErrors]

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, validationMessage } = e.target;

    const parsedValue = name === "year" ? parseInt(value, 10) || "" : value;

    setValues((prev) => ({
      ...prev,
      [name]: parsedValue,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: validationMessage,
    }));

    // ✅ checkValidity won't crash now, since e.target is untouched
    setIsValid(e.target.closest("form")?.checkValidity() || false);
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
