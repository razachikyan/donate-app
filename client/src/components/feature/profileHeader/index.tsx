import React from "react";
import { Container } from "@mui/material";
import cx from 'classnames'

import styles from "./styles.module.css";

export const Header: React.FC<{ text: string; className?: string }> = ({
  text,
  className
}) => {
  return (
    <header className={cx(styles.header, className)}>
      <Container className={styles.container} maxWidth="xl">
        {text}
        <a className={styles.backLink} href="/">
          <img src="/icons/small-arrow.svg" width={35} alt="back" />
          Գլղավոր էջ
        </a>
      </Container>
    </header>
  );
};
