export interface IInputProps {
  value?: string;
  onChange?: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  wrapperClassName?: string;
  placeholder?: string;
  disabled?: boolean;
  onIconClick?: VoidFunction
  icon?: string;
}
