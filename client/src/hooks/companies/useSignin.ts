import { useFormik } from "formik";
import { useState } from "react";
import { companySigninSchema } from "../../from/validationSchemas/company.schema";
import companyService from "../../services/company.service";

export const useCompanySignin = () => {
  const [data, setData] = useState<{} | null>(null);
  const [pending, setPending] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: companySigninSchema,
    onSubmit: async (values) => {
      try {
        setPending(true);
        setError(null);
        setData(null);
        const { email, password } = values;
        const response = await companyService.signIn(email, password);
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
