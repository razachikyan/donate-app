export interface IInputProps {
  value?: string;
  onChange?: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
}