import React, { CSSProperties } from "react";

export interface ITextareaProps {
  width?: string;
  minRows?: number;
  maxRows?: number;
  placeholder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  disabled?: boolean;
  style?: CSSProperties;
  className?: string;
}
