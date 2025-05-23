import React, { ChangeEvent, FormEventHandler, useEffect } from "react";
import { Alert } from "@mui/material";
import { Input } from "../input";
import { Button } from "../button";
import styles from "./styles.module.css";

interface IFormProps {
  type: "signin" | "signup";
  onSubmit: FormEventHandler<HTMLFormElement>;
  loading?: boolean;
  userType: "user" | "company";
  error?: string | null;
  formData?: any;
  onSuccess?: VoidFunction;
  formFields: Record<
    string,
    {
      value: string;
      error: string | null;
      handleChange: (ev: ChangeEvent<HTMLInputElement>) => void;
    }
  >;
}

const getFields = (type: "signin" | "signup", userType: "user" | "company") => {
  if (type === "signin" || userType === "user") {
    return fields[type];
  }
  fields[type] = fields[type]
    .filter((field) => field.name !== "lastName")
    .map((field) => {
      if (field.name === "firstName") {
        field.label = "Կազմակերպության Անուն";
      }
      return field;
    });

  return fields[type];
};

const fields: Record<
  "signin" | "signup",
  Array<{ name: string; type: string; label: string }>
> = {
  signin: [
    {
      name: "email",
      label: "Էլ․ հասցե",
      type: "text",
    },
    {
      name: "password",
      label: "Գաղտնաբառ",
      type: "password",
    },
  ],
  signup: [
    {
      name: "firstName",
      label: "Անուն",
      type: "text",
    },
    {
      name: "lastName",
      label: "Ազգանուն",
      type: "text",
    },
    {
      name: "email",
      label: "Էլ․ հասցե",
      type: "text",
    },
    {
      name: "phone",
      label: "Հեռախոսահամար",
      type: "text",
    },
    {
      name: "password",
      label: "Գաղտնաբառ",
      type: "password",
    },
    {
      name: "confirmPassword",
      label: "Կրկնել գաղտնաբառը",
      type: "password",
    },
  ],
};

export const UserAuthForm: React.FC<IFormProps> = ({
  type,
  onSubmit,
  loading = false,
  userType,
  formFields,
  formData,
  error,
  onSuccess,
}) => {
  useEffect(() => {
    if (!loading && !error && formData && onSuccess) {
      onSuccess();
    }
  }, [type, error, formData, loading, onSuccess]);

  return (
    <form
      autoComplete="new-password"
      className={styles.form}
      onSubmit={onSubmit}
    >
      {getFields(type, userType).map(({ label, name, type }, i) => (
        <Input
          key={i}
          value={formFields[name].value}
          onChange={formFields[name].handleChange}
          name={name}
          label={label}
          type={type}
          error={Boolean(formFields[name].error)}
        />
      ))}
      {error && (
        <Alert color="error" variant="filled">
          {error}
        </Alert>
      )}
      <Button
        disabled={loading}
        loading={loading}
        type="submit"
        className={styles.submitButton}
      >
        {type === "signin" ? "Sign In" : "Sign Up"}
      </Button>
    </form>
  );
};
