import { SelectChangeEvent } from "@mui/material";

export interface ISelectProps {
  options: Array<{ value: string; label: string }>;
  label: string;
  value?: string;
  onChange?: (ev: SelectChangeEvent<string>) => void;
}
