import { Box } from "@mui/material";
import cx from "classnames";

import styles from "./styles.module.css";

export const Layout = ({
  children,
  background = false,
}: React.PropsWithChildren & { background?: boolean }) => {
  return (
    <Box className={cx(styles.layout, { [styles.background]: background })}>
      {children}
    </Box>
  );
};
