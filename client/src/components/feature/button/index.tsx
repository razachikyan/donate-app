import React from "react";
import { CircularProgress, Button as MUIButton } from "@mui/material";
import cx from "classnames";
import { IButtonProps } from "./types.ts";

import styles from "./styles.module.css";

export const Button: React.FC<IButtonProps> = ({
  onClick,
  children,
  className,
  loading = false,
  type = "button",
}) => {
  return (
    <MUIButton
      type={type}
      onClick={onClick}
      className={cx(styles.button, className)}
    >
      {children}
      {loading && <CircularProgress thickness={5.5} color="error" size={30} />}
    </MUIButton>
  );
};
