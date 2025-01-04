import React from "react";
import { Box, FormControl } from "@mui/material";
import { Select } from "../../shared/select";

import styles from "./styles.module.css";
import { Textarea } from "../../shared/textarea";

export const NewPost: React.FC = () => {
  return (
    <Box className={styles.container}>
      <Box className={styles.form}>
        <Select label="Կատեգորիա" options={[]} />
        <Select label="Հասցե" options={[]} />
        <Select label="Վիճակ (նոր / օգտագործված)" options={[]} />
        <FormControl className={styles.textarea}>
          <span className={styles.label}>
            Մանրամասն տեղեկություն
          </span>
          <Textarea className={styles.editor} />
        </FormControl>
      </Box>
      <Box className={styles.drop}></Box>
    </Box>
  );
};
