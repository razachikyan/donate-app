import React from "react";
import { ITextareaProps } from "./types";
import cx from "classnames";

import styles from "./styles.module.css";

export const Textarea: React.FC<ITextareaProps> = ({
  className,
  css,
  disabled,
  onChange,
  placeholder,
  value,
}) => {
  return (
    <textarea
      placeholder={placeholder}
      style={css}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={cx(className, styles.textarea)}
    ></textarea>
  );
};
