export interface IButtonProps extends React.PropsWithChildren {
  onClick?: VoidFunction;
  className?: string;
  type?: "submit" | "button";
  loading?: boolean;
}
