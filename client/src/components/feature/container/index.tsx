import cx from "classnames";
import { IContainerProps } from "./types";

import styles from "./styles.module.css";

export const Container = ({ children, className }: IContainerProps) => {
  return <div className={cx(styles.container, className)}>{children}</div>;
};
