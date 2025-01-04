import React from "react";
import { Box, FormControl } from "@mui/material";
import { useGetCategories } from "../../../hooks/categories/useGetCategories";
import { Cities } from "../../../utils/constants";
import { Textarea } from "../../shared/textarea";
import { Select } from "../../shared/select";

import styles from "./styles.module.css";

export const NewPost: React.FC = () => {
  const { data = [] } = useGetCategories();
  
  return (
    <Box className={styles.container}>
      <Box className={styles.form}>
        <Select
          label="Կատեգորիա"
          options={data.map((item) => ({
            label: item.name,
            value: item.name,
          }))}
        />
        <Select
          label="Հասցե"
          options={Cities.map((item) => ({ label: item, value: item }))}
        />
        <Select
          label="Վիճակ (նոր / օգտագործված)"
          options={[
            { label: "Նոր", value: "Նոր" },
            { label: "Օգտագործված", value: "Օգտագործված" },
          ]}
        />
        <FormControl className={styles.textarea}>
          <span className={styles.label}>Մանրամասն տեղեկություն</span>
          <Textarea className={styles.editor} />
        </FormControl>
      </Box>
      <Box className={styles.drop}></Box>
    </Box>
  );
};
