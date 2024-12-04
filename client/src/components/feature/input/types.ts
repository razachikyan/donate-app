export interface IInputProps {
  label?: string;
  value: string;
  onChange: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  type?: string;
  name?: string;
  error?: boolean;
  helperText?: string;
}
