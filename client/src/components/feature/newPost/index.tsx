import React, { useCallback, useState } from "react";
import { Box, FormControl } from "@mui/material";
import { useDropzone } from "react-dropzone";
import { CategoriesResponse } from "../../../models/responses/CategoriesResponse";
import { useGetCategories } from "../../../hooks/categories/useGetCategories";
import { Cities } from "../../../utils/constants";
import { Textarea } from "../../shared/textarea";
import { Select } from "../../shared/select";

import styles from "./styles.module.css";
import { Button } from "../button";

export const NewPost: React.FC = () => {
  const { data = [] } = useGetCategories();
  const [itemState, setItemState] = useState<{
    category?: CategoriesResponse | null;
    address?: string;
    state?: string;
    description?: string;
    image?: string;
  }>({});

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.result) {
          setItemState((prev) => ({ ...prev, image: reader.result as string }));
        }
      };

      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
    multiple: false,
  });

  return (
    <Box className={styles.container}>
      <Box className={styles.form}>
        <Select
          label="Կատեգորիա"
          options={data.map((item) => ({
            label: item.name,
            value: item.name,
          }))}
          value={itemState.category?.name}
          onChange={(ev) => {
            const selected = data.find((item) => item.name === ev.target.value);
            selected &&
              setItemState((prev) => ({ ...prev, category: selected }));
          }}
        />
        <Select
          label="Հասցե"
          value={itemState.address}
          onChange={(ev) =>
            setItemState((prev) => ({ ...prev, address: ev.target.value }))
          }
          options={Cities.map((item) => ({ label: item, value: item }))}
        />
        <Select
          label="Վիճակ (նոր / օգտագործված)"
          value={itemState.state}
          onChange={(ev) =>
            setItemState((prev) => ({ ...prev, state: ev.target.value }))
          }
          options={[
            { label: "Նոր", value: "Նոր" },
            { label: "Օգտագործված", value: "Օգտագործված" },
          ]}
        />
        <FormControl className={styles.textarea}>
          <span className={styles.label}>Մանրամասն տեղեկություն</span>
          <Textarea
            value={itemState.description}
            onChange={(ev) =>
              setItemState((prev) => ({
                ...prev,
                description: ev.target.value,
              }))
            }
            className={styles.editor}
          />
        </FormControl>
        <Button
          onClick={() => {
            // use service to add item. no hook
          }}
        >
          Ավելացնել
        </Button>
      </Box>
      <Box className={styles.drop} {...getRootProps()}>
        <input {...getInputProps()} />
        {itemState.image ? (
          <img
            src={itemState.image}
            alt="Uploaded Preview"
            className={styles.preview}
          />
        ) : (
          <img src="images/addImg.png" width={390} alt="add image" />
        )}
      </Box>
    </Box>
  );
};
