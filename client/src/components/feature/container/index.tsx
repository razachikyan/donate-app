import cx from "classnames";
import { IContainerProps } from "./types";
import { Box } from "@mui/material";

import styles from "./styles.module.css";

export const Container = ({ children, className = "" }: IContainerProps) => {
  return <Box className={cx(styles.container, className)}>{children}</Box>;
};
