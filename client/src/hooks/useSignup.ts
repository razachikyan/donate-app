import { useFormik } from "formik";
import { signupSchema } from "../from/validationSchemas/signupSchema";
import authService from "../services/authService";

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
    onSubmit: async (values) => {
      try {
        const response = await authService.signUp(
          values.firstName,
          values.lastName,
          values.email,
          values.phone,
          values.password
        );

        console.log("Signup successful:", response);
      } catch (error) {
        console.error("Signup failed:", error);
      }
    },
  });

  return {
    formik,
  };
};
