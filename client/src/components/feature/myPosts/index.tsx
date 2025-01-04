import React from "react";
import { Box } from "@mui/material";
import cx from "classnames";

import styles from "./styles.module.css";

export const MyPosts: React.FC = () => {
    return (
      <Box className={cx(styles.container, styles.empty)}>
        <span className={styles.emptyText}>Այս պահին էջը դատարկ է</span>
      </Box>
    );
};
