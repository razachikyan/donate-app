import { useState } from "react";
import { useFormik } from "formik";
import { CompanyResponse } from "../../models/responses/CompanyResponse";
import { companySignupSchema } from "../../from/validationSchemas/company.schema";
import companyService from "../../services/company.service";

export const useCompanySignup = () => {
  const [data, setData] = useState<CompanyResponse | null>(null);
  const [pending, setPending] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const formik = useFormik({
    initialValues: { name: "", email: "", password: "", confirmPassword: "" },
    validationSchema: companySignupSchema,
    onSubmit: async (values) => {
      try {
        setPending(true);
        setError(null);
        setData(null);
        const response = await companyService.signUp(
          values.name,
          values.email,
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
