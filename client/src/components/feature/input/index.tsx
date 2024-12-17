import { TextField, Input as MUIInput } from "@mui/material";
import { IInputProps } from "./types";
import styles from "./styles.module.css";

export const Input: React.FC<IInputProps> = ({
  label,
  value,
  onChange,
  disabled = false,
  type = "text",
  name,
  error = false,
  helperText = "",
}) => {
  return (
    <TextField
      color="primary"
      sx={{
        "& .MuiOutlinedInput-root": {
          "&.Mui-focused fieldset": {
            borderColor: "transparent",
          },
        },
      }}
      label={label}
      value={value}
      onChange={onChange}
      disabled={disabled}
      name={name}
      type={type}
      error={error}
      helperText={helperText}
      className={styles.input}
      autoComplete="off"
    />
  );
};
