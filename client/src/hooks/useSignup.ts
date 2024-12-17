import { useFormik } from "formik";
import { signupSchema } from "../from/validationSchemas/signupSchema";

export const useSignup = () => {
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
    onSubmit: (values) => {
      console.log("Sign up values:", values);
    },
  });

  return {
    formik
  }
};
