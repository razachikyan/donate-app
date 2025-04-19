import { useFormik } from "formik";
import { signinSchema } from "../../from/validationSchemas/signin.schema";
import authService from "../../services/auth.service";
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
        setError(error?.response?.data?.message ?? error.message);
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
