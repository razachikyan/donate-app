import cx from "classnames";

import styles from "./styles.module.css";

export const Layout = ({
  children,
  background = false,
}: React.PropsWithChildren & { background?: boolean }) => {
  return (
    <div className={cx(styles.layout, { [styles.background]: background })}>
      {children}
    </div>
  );
};
