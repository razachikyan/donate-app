import React from "react";
import { Box } from "@mui/material";

import styles from "./styles.module.css";

export const UserBlock: React.FC<{ username: string }> = ({ username }) => {
  return (
    <Box className={styles.container}>
      <img
        width={324}
        height={324}
        src="/images/user.png"
        alt="ava"
        className={styles.avatar}
      />
      <span className={styles.username}>{username}</span>
    </Box>
  );
};
