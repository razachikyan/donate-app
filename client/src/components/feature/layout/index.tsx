import { Box } from "@mui/material";
import cx from "classnames";

import styles from "./styles.module.css";
import { useCheckAuth } from "../../../hooks/auth/useCheckAuth";
import Loading from "../loading";
import { Navigate } from "react-router-dom";

export const Layout = ({
  children,
  background = false,
}: React.PropsWithChildren & { background?: boolean }) => {
  const { isAuthorized, loading } = useCheckAuth();
  return (
    <Box className={cx(styles.layout, { [styles.background]: background })}>
      {loading ? (
        <Loading />
      ) : !isAuthorized ? (
        <Navigate replace to="/auth" />
      ) : (
        <>{children}</>
      )}
    </Box>
  );
};
