import { useState, useEffect } from "react";

export interface FormValues {
  [key: string]: string | number;
}

export function useFormWithValidation(
  initialValues: FormValues = {},
  requiredFields: string[] = []
) {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const formIsValid =
      requiredFields.every((field) => values[field] !== "") &&
      Object.values(errors).every((error) => error === "");
    setIsValid(formIsValid);
  }, [errors, values, requiredFields]);

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
    newValues: FormValues = initialValues,
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