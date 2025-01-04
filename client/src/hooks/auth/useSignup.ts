import { useState } from "react";
import { useFormik } from "formik";
import authService from "../../services/auth.service";
import { AuthResponse } from "../../models/responses/AuthResponse";
import { signupSchema } from "../../from/validationSchemas/signup.schema";

export const useSignup = () => {
  const [data, setData] = useState<AuthResponse | null>(null);
  const [pending, setPending] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: signupSchema,
    onSubmit: async (values) => {
      try {
        setPending(true);
        setError(null);
        setData(null);
        const response = await authService.signUp(
          values.firstName,
          values.lastName,
          values.email,
          values.phone,
          values.password
        );

        setData(response);
      } catch (error: any) {
        setError(
          error?.response?.data?.error ?? error.message ?? error.message
        );
      } finally {
        setPending(false);
      }
    },
  });

  return {
    formik,
    pending,
    data,
    error,
  };
};
