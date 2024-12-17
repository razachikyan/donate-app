import React from "react";
import { Button as MUIButton } from "@mui/material";
import cx from "classnames";
import { IButtonProps } from "./types.ts";

import styles from "./styles.module.css";

export const Button: React.FC<IButtonProps> = ({
  onClick,
  children,
  className,
  type = "button",
}) => {
  return (
    <MUIButton
      type={type}
      onClick={onClick}
      className={cx(styles.button, className)}
    >
      {children}
    </MUIButton>
  );
};
