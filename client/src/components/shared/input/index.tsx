import React from "react";
import cx from "classnames";
import { IInputProps } from "./types";

import styles from "./styles.module.css";

export const Input: React.FC<IInputProps> = ({
  placeholder,
  className,
  disabled = false,
  onChange,
  value,
  icon,
}) => {
  return (
    <div className={styles.container}>
      <input
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
        className={cx(styles.input, className)}
      />
      {icon && (
        <img
          className={styles.icon}
          src={icon}
          alt="icon"
          width={35}
          height={35}
        />
      )}
    </div>
  );
};
