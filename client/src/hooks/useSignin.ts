import { useFormik } from "formik";
import { signinSchema } from "../from/validationSchemas/signinSchema";
import authService from "../services/authService";

export const useSignin = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: signinSchema,
    onSubmit: async (values) => {
      try {
        const { email, password } = values;
        const response = await authService.signIn(email, password);
        console.log("Sign in response:", response);
      } catch (error) {
        console.error("Error during sign in:", error);
      }
    },
  });

  return {
    formik,
  };
};
