import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";
import { styled } from "@mui/system";
import { ITextareaProps } from "./types";

export const Textarea: React.FC<ITextareaProps> = ({
  width = "320px",
  minRows = 3,
  placeholder = "",
  value,
  onChange,
  maxRows,
  disabled = false,
  style,
  className,
  ...props
}) => {
   const white = {
     50: "#FFFFFF",
     100: "#F9F9F9",
     200: "#F2F2F2",
     300: "#EDEDED",
     400: "#E6E6E6",
     500: "#D9D9D9",
     600: "#CCCCCC",
     700: "#B3B3B3",
     800: "#A6A6A6",
     900: "#999999",
   };

  const Textarea = styled(BaseTextareaAutosize)(
    ({ theme }) => `
    box-sizing: border-box;
    width: ${width};
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 8px 12px;
    border-radius: 8px;
    color: ${theme.palette.mode === "dark" ? white[300] : white[900]};
    background: transparent;
    border: 1px solid ${theme.palette.mode === "dark" ? white[700] : white[200]};
    box-shadow: 0 2px 2px ${
      theme.palette.mode === "dark" ? white[900] : white[50]
    };

    &:hover {
      border-color: ${white[400]};
    }

    &:focus {
      border-color: ${white[400]};
      box-shadow: 0 0 0 3px ${
        theme.palette.mode === "dark" ? white[600] : white[200]
      };
    }

    &:focus-visible {
      outline: 0;
    }
  `
  );

  return (
    <Textarea
      aria-label="flexible textarea"
      minRows={minRows}
      maxRows={maxRows}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      style={style}
      className={className}
      {...props}
    />
  );
};
