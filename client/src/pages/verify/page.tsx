import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Alert, Box } from "@mui/material";
import { useVerify } from "../../hooks/auth/useVerify";
import { Input } from "../../components/feature/input";
import { Button } from "../../components/feature/button";
import { Container } from "../../components/feature/container";

import styles from "./styles.module.css";

export const Verify = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [otp, setOtp] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const { verify, data, error, pending } = useVerify();

  useEffect(() => {
    const emailFromParams = searchParams.get("email");
    setEmail(emailFromParams || "");
  }, [searchParams]);

  useEffect(() => {
    if (!error && !pending && data) {
      navigate("/", { replace: true });
    }
  }, [error, pending, data]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !otp) {
      alert("Email and OTP are required!");
      return;
    }

    try {
      await verify(email, otp);
      console.log("Verification successful:", data);
    } catch (err) {
      console.error("Verification failed:", err);
    }
  };

  return (
    <Box className={styles.box}>
      <Container className={styles.container}>
        <form
          autoComplete="new-password"
          className={styles.form}
          onSubmit={handleSubmit}
        >
          <Input
            value={email ?? ""}
            onChange={() => {}}
            disabled={!!email}
            name="email"
            label="Էլ․ հասցե"
          />
          <Input
            value={otp}
            onChange={(ev) => setOtp(ev.target.value)}
            name="OTP"
            label="Մեկ անգամյա գաղտնաբառ"
          />
          {error && (
            <Alert color="error" variant="filled">
              {error}
            </Alert>
          )}
          {data && (
            <Alert color="success" variant="filled">
              Verification successful!
            </Alert>
          )}
          <Button
            loading={pending}
            type="submit"
            className={styles.submitButton}
          >
            {pending ? "Verifying..." : "Send OTP"}
          </Button>
        </form>
      </Container>
    </Box>
  );
};
