import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSignin } from "../../../hooks/auth/useSignin";
import { useSignup } from "../../../hooks/auth/useSignup";
import { UserAuthForm } from "./userForm";
import { userFields } from "./data";

interface IFormProps {
  form: "signin" | "signup";
  userType: "user" | "company";
}

export const AuthForm: React.FC<IFormProps> = ({ form, userType }) => {
  const isSignin = form === "signin";
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
    signup.setFieldValue("type", userType);
  }, [userType]);

  useEffect(() => {
    if (!isSignin && userType === "company") {
      signup.setFieldValue("lastName", signup.values.firstName);
    }
  }, [signup.values.firstName, userType, isSignin]);

  const onUserAuthSuccess = () => {
    if (isSignin) {
      navigate(`/`, { replace: true });
    } else {
      navigate(`/verify?email=${signup.values.email}`, { replace: true });
    }
  };

  return (
    <UserAuthForm
      type={form}
      userType={userType}
      error={isSignin ? signinError : signupError}
      formData={isSignin ? signinData : signupData}
      loading={isSignin ? signinPending : signupPending}
      onSuccess={onUserAuthSuccess}
      onSubmit={isSignin ? signin.handleSubmit : signup.handleSubmit}
      formFields={userFields[form].reduce((acc, name) => {
        const formObj: any = isSignin ? signin : signup;
        acc[name] = {
          value: formObj.values[name],
          error: formObj.errors[name],
          handleChange: formObj.handleChange,
        };
        return acc;
      }, {} as any)}
    />
  );
};
