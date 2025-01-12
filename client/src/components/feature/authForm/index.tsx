import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert } from "@mui/material";
import { Input } from "../input";
import { Button } from "../button";
import { useSignin } from "../../../hooks/auth/useSignin";
import { useSignup } from "../../../hooks/auth/useSignup";

import styles from "./styles.module.css";

interface IFormProps {
  form: "signin" | "signup";
  userType: 'user' | 'company'
} 

export const AuthForm: React.FC<IFormProps> = ({ form, userType }) => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const {
    formik: signin,
    data: signinData,
    error: signinError,
    pending: signinPending,
  } = useSignin();
  const {
    formik: signup,
    data: signupData,
    error: signupError,
    pending: signupPending,
  } = useSignup();

  useEffect(() => {
    const isFormSuccess =
      form === "signin"
        ? !signinPending && !signinError && signinData
        : !signupPending && !signupError && signupData;

    if (isFormSuccess) {
      if (form === "signin") {
        navigate(`/`, { replace: true });
      } else if (form === "signup") {
        navigate(`/verify?email=${signup.values.email}`, { replace: true });
      }
    }
  }, [
    form,
    signinData,
    signinError,
    signupError,
    signinPending,
    signupData,
    signupPending,
    navigate,
  ]);

  useEffect(() => {
    setError(form === "signin" ? signinError : signupError);
  }, [signinError, signupError]);

  return (
    <form
      autoComplete="new-password"
      className={styles.form}
      onSubmit={form === "signup" ? signup.handleSubmit : signin.handleSubmit}
    >
      {form === "signin" ? (
        <>
          <Input
            value={signin.values.email}
            onChange={signin.handleChange}
            name="email"
            label="Էլ․ հասցե"
            error={signin.touched.email && Boolean(signin.errors.email)}
            helperText={
              signin.touched.email && signin.errors.email
                ? signin.errors.email
                : undefined
            }
          />
          <Input
            value={signin.values.password}
            onChange={signin.handleChange}
            name="password"
            label="Գաղտնաբառ"
            type="password"
            error={signin.touched.password && Boolean(signin.errors.password)}
            helperText={
              signin.touched.password && signin.errors.password
                ? signin.errors.password
                : undefined
            }
          />
        </>
      ) : (
        <>
          <Input
            value={signup.values.firstName ?? ""}
            onChange={signup.handleChange}
            name="firstName"
            label="Անուն"
            error={signup.touched.firstName && Boolean(signup.errors.firstName)}
            helperText={
              signup.touched.firstName && signup.errors.firstName
                ? signup.errors.firstName
                : undefined
            }
          />
          <Input
            value={signup.values.lastName ?? ""}
            onChange={signup.handleChange}
            name="lastName"
            label="Ազգանուն"
            error={signup.touched.lastName && Boolean(signup.errors.lastName)}
            helperText={
              signup.touched.lastName && signup.errors.lastName
                ? signup.errors.lastName
                : undefined
            }
          />
          <Input
            value={signup.values.phone ?? ""}
            onChange={signup.handleChange}
            name="phone"
            label="Հեռախոսահամար"
            error={signup.touched.phone && Boolean(signup.errors.phone)}
            helperText={
              signup.touched.phone && signup.errors.phone
                ? signup.errors.phone
                : undefined
            }
          />
          <Input
            value={signup.values.email}
            onChange={signup.handleChange}
            name="email"
            label="Էլ․ հասցե"
            error={signup.touched.email && Boolean(signup.errors.email)}
            helperText={
              signup.touched.email && signup.errors.email
                ? signup.errors.email
                : undefined
            }
          />
          <Input
            value={signup.values.password ?? ""}
            onChange={signup.handleChange}
            name="password"
            label="Գաղտնաբառ"
            type="password"
            error={signup.touched.password && Boolean(signup.errors.password)}
            helperText={
              signup.touched.password && signup.errors.password
                ? signup.errors.password
                : undefined
            }
          />
          <Input
            value={signup.values.confirmPassword ?? ""}
            onChange={signup.handleChange}
            name="confirmPassword"
            label="Կրկնել գաղտնաբառը"
            type="password"
            error={
              signup.touched.confirmPassword &&
              Boolean(signup.errors.confirmPassword)
            }
            helperText={
              signup.touched.confirmPassword && signup.errors.confirmPassword
                ? signup.errors.confirmPassword
                : undefined
            }
          />
        </>
      )}
      {error && (
        <Alert color="error" variant="filled">
          {error}
        </Alert>
      )}
      <Button
        loading={signinPending || signupPending}
        type="submit"
        className={styles.submitButton}
      >
        {form === "signin" ? "Sign In" : "Sign Up"}
      </Button>
    </form>
  );
};
