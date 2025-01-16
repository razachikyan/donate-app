import React from "react";
import { useNavigate } from "react-router-dom";
import { useSignin } from "../../../hooks/auth/useSignin";
import { useSignup } from "../../../hooks/auth/useSignup";
import { UserAuthForm } from "./userForm";
import { CompanyAuthForm } from "./companyForm";
import { companyFields, userFields } from "./data";
import { useCompanySignin } from "../../../hooks/companies/useSignin";
import { useCompanySignup } from "../../../hooks/companies/useSignup";

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

  const {
    formik: companySignin,
    data: companySigninData,
    error: companySigninError,
    pending: companySigninPending,
  } = useCompanySignin();

  const {
    formik: companySignup,
    data: companySignupData,
    error: companySignupError,
    pending: companySignupPending,
  } = useCompanySignup();

  const onUserAuthSuccess = () => {
    if (isSignin) {
      navigate(`/`, { replace: true });
    } else {
      navigate(`/verify?email=${signup.values.email}`, { replace: true });
    }
  };

  const onCompanyAuthSuccess = () => {
    navigate(`/`, { replace: true });
  };

  return (
    <>
      {userType === "company" ? (
        <CompanyAuthForm
          type={form}
          error={isSignin ? companySigninError : companySignupError}
          formData={isSignin ? companySigninData : companySignupData}
          loading={isSignin ? companySigninPending : companySignupPending}
          onSuccess={onCompanyAuthSuccess}
          onSubmit={
            isSignin ? companySignin.handleSubmit : companySignup.handleSubmit
          }
          formFields={companyFields[form].reduce((acc, name) => {
            const formObj: any = isSignin ? companySignin : companySignup;
            acc[name] = {
              value: formObj.values[name],
              error: formObj.errors[name],
              handleChange: formObj.handleChange,
            };
            return acc;
          }, {} as any)}
        />
      ) : (
        <UserAuthForm
          type={form}
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
      )}
    </>
  );
};
