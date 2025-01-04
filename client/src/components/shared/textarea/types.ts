import React, { CSSProperties } from "react";

export interface ITextareaProps {
  placeholder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  disabled?: boolean;
  css?: CSSProperties;
  className?: string;
}
