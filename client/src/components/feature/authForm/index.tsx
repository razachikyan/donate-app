import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import styles from "./styles.module.css";
import { Input } from "../input";

export const AuthForm: React.FC<{ form: "signin" | "signup" }> = ({ form }) => {
  const validationSchema = Yup.object(
    form === "signin"
      ? {
          email: Yup.string().email("Invalid email").required("Required"),
          password: Yup.string()
            .min(6, "Password must be at least 6 characters")
            .required("Required"),
        }
      : {
          firstName: Yup.string().required("Required"),
          lastName: Yup.string().required("Required"),
          phone: Yup.string()
            .matches(/^\d{10}$/, "Invalid phone number")
            .required("Required"),
          email: Yup.string().email("Invalid email").required("Required"),
          address: Yup.string().required("Required"),
          password: Yup.string()
            .min(6, "Password must be at least 6 characters")
            .required("Required"),
          confirmPassword: Yup.string()
            .oneOf([Yup.ref("password")], "Passwords must match")
            .required("Required"),
        }
  );

  // Formik configuration
  const formik = useFormik({
    initialValues:
      form === "signin"
        ? { email: "", password: "" }
        : {
            firstName: "",
            lastName: "",
            phone: "",
            email: "",
            address: "",
            password: "",
            confirmPassword: "",
          },
    validationSchema,
    onSubmit: (values) => {
      console.log("Form values:", values);
    },
  });

  return (
    <form
      autoComplete="off"
      className={styles.form}
      onSubmit={formik.handleSubmit}
    >
      {form === "signin" ? (
        <>
          <Input
            value={formik.values.email}
            onChange={formik.handleChange}
            name="email"
            label="Էլ․ հասցե"
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={
              formik.touched.email && formik.errors.email
                ? formik.errors.email
                : undefined
            }
          />
          <Input
            value={formik.values.password}
            onChange={formik.handleChange}
            name="password"
            label="Գաղտնաբառ"
            type="password"
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={
              formik.touched.password && formik.errors.password
                ? formik.errors.password
                : undefined
            }
          />
        </>
      ) : (
        <>
          <Input
            value={formik.values.firstName ?? ""}
            onChange={formik.handleChange}
            name="firstName"
            label="Անուն"
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={
              formik.touched.firstName && formik.errors.firstName
                ? formik.errors.firstName
                : undefined
            }
          />
          <Input
            value={formik.values.lastName ?? ""}
            onChange={formik.handleChange}
            name="lastName"
            label="Ազգանուն"
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={
              formik.touched.lastName && formik.errors.lastName
                ? formik.errors.lastName
                : undefined
            }
          />
          <Input
            value={formik.values.phone ?? ""}
            onChange={formik.handleChange}
            name="phone"
            label="Հեռախոսահամար"
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            helperText={
              formik.touched.phone && formik.errors.phone
                ? formik.errors.phone
                : undefined
            }
          />
          <Input
            value={formik.values.email}
            onChange={formik.handleChange}
            name="email"
            label="Էլ․ հասցե"
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={
              formik.touched.email && formik.errors.email
                ? formik.errors.email
                : undefined
            }
          />
          <Input
            value={formik.values.address ?? ""}
            onChange={formik.handleChange}
            name="address"
            label="Հասցե"
            error={formik.touched.address && Boolean(formik.errors.address)}
            helperText={
              formik.touched.address && formik.errors.address
                ? formik.errors.address
                : undefined
            }
          />
          <Input
            value={formik.values.password ?? ""}
            onChange={formik.handleChange}
            name="password"
            label="Գաղտնաբառ"
            type="password"
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={
              formik.touched.password && formik.errors.password
                ? formik.errors.password
                : undefined
            }
          />
          <Input
            value={formik.values.confirmPassword ?? ""}
            onChange={formik.handleChange}
            name="confirmPassword"
            label="Կրկնել գաղտնաբառը"
            type="password"
            error={
              formik.touched.confirmPassword &&
              Boolean(formik.errors.confirmPassword)
            }
            helperText={
              formik.touched.confirmPassword && formik.errors.confirmPassword
                ? formik.errors.confirmPassword
                : undefined
            }
          />
        </>
      )}
      <button type="submit" className={styles.submitButton}>
        {form === "signin" ? "Sign In" : "Sign Up"}
      </button>
    </form>
  );
};
