export interface IButtonProps extends React.PropsWithChildren {
  onClick?: () => void;
  className?: string;
  type: "submit" | "button";
  loading?: boolean
}