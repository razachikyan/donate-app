import React from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select as MUISelect,
} from "@mui/material";
import { ISelectProps } from "./types";
import cx from "classnames";

import styles from "./styles.module.css";

export const Select: React.FC<ISelectProps> = ({
  label,
  options,
  value,
  onChange,
  fullWidth =  false
}) => {
  return (
    <FormControl className={cx(styles.container, {[styles.fullWidth]: fullWidth})}>
      <InputLabel className={styles.label}>{label}</InputLabel>
      <MUISelect
        value={value}
        onChange={onChange}
        className={styles.select}
        IconComponent={({ className }) => {
          const isOpen = className.includes("MuiSelect-iconOpen");

          return (
            <img
              src="/icons/small-arrow.svg"
              className={cx(styles.arrow, { [styles.close]: !isOpen })}
              alt="arrow"
              width={30}
            />
          );
        }}
        MenuProps={{
          classes: { paper: styles.list },
        }}
      >
        {options.map(({ label, value }, i) => {
          return (
            <MenuItem key={i} value={value} className={styles.option}>
              {label}
            </MenuItem>
          );
        })}
      </MUISelect>
    </FormControl>
  );
};
