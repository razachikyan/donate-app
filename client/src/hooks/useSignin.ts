import { useFormik } from "formik";
import { signinSchema } from "../from/validationSchemas/signinSchema";
import authService from "../services/authService";
import { useState } from "react";

export const useSignin = () => {
  const [data, setData] = useState<{} | null>(null);
  const [pending, setPending] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: signinSchema,
    onSubmit: async (values) => {
      try {
        setPending(true);
        setError(null);
        setData(null);
        const { email, password } = values;
        const response = await authService.signIn(email, password);
        setData(response);
      } catch (error: any) {
        setError(error?.response?.data?.error ?? error.message);
      } finally {
        setPending(false);
      }
    },
  });

  return {
    formik,
    data,
    error,
    pending,
  };
};
