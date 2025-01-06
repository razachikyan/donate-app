import { Box } from "@mui/material";
import styles from "./styles.module.css";
import { Input } from "../../../../shared/input";

export const Search = () => (
  <Box className={styles.container}>
    <Input
      icon="/icons/search.svg"
      placeholder="Որոնում"
      className={styles.input}
    />
  </Box>
);
