import React from "react";
import { CircularProgress, Box } from "@mui/material";

import styles from "./styles.module.css";

const Loading: React.FC = () => {
  return (
    <Box className={styles.container}>
      <CircularProgress color="inherit" size={150} />
    </Box>
  );
};

export default Loading;
