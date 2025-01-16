import React, { useCallback, useEffect } from "react";
import { Box, FormControl } from "@mui/material";
import { useDropzone } from "react-dropzone";
import { Buffer } from "buffer";
import axios from "axios";
import { useGetCategories } from "../../../hooks/categories/useGetCategories";
import { Cities } from "../../../utils/constants";
import { Textarea } from "../../shared/textarea";
import { Select } from "../../shared/select";
import { Button } from "../button";
import { usePostItem } from "../../../hooks/items/usePostItem";
import { useCheckAuth } from "../../../hooks/auth/useCheckAuth";
import { Input } from "../../shared/input";

import styles from "./styles.module.css";

export const NewPost: React.FC = () => {
  const { data: categories = [] } = useGetCategories();
  const { user } = useCheckAuth();
  const id = user && "user_id" in user ? user.user_id : user?.company_id;

  useEffect(() => {
    if (user) {
      handleFormChange("donor_id", id ?? "");
    }
  }, [user]);

  const {
    formData,
    loading: formLoading,
    error: formError,
    handleFormChange,
    handleFormSubmit,
  } = usePostItem();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      uploadFileToImageKit(acceptedFiles[0]);
    }
  }, []);

  const uploadFileToImageKit = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", file.name);
    formData.append("useUniqueFileName", "true");

    try {
      const accessToken = Buffer.from(
        `${process.env.REACT_APP_IMAGEKIT_PRIVATE_KEY}:`
      ).toString("base64");
      const response = await axios.post(
        "https://upload.imagekit.io/api/v2/files/upload",
        formData,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Basic ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      handleFormChange("image_url", response.data.url);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  return (
    <Box className={styles.container}>
      <Box className={styles.form}>
        <Select
          label="Կատեգորիա"
          options={categories.map((item) => ({
            label: item.name,
            value: item.name,
          }))}
          value={formData.category}
          onChange={(ev) => handleFormChange("category", ev.target.value)}
        />
        <Select
          label="Հասցե"
          value={formData.address}
          onChange={(ev) => handleFormChange("address", ev.target.value)}
          options={Cities.map((city) => ({ label: city, value: city }))}
        />
        <Select
          label="Վիճակ (նոր / օգտագործված)"
          value={formData.condition}
          onChange={(ev) => handleFormChange("condition", ev.target.value)}
          options={[
            { label: "Նոր", value: "new" },
            { label: "Օգտագործված", value: "used" },
          ]}
        />
        <FormControl className={styles.textarea}>
          <span className={styles.label}>Վերնագիր</span>
          <Input
            value={formData.title}
            onChange={(ev) => handleFormChange("title", ev.target.value)}
          />
          <span className={styles.label}>Մանրամասն տեղեկություն</span>
          <Textarea
            value={formData.description}
            onChange={(ev) => handleFormChange("description", ev.target.value)}
            className={styles.editor}
          />
        </FormControl>
        <Button onClick={handleFormSubmit} loading={formLoading}>
          {formLoading ? "Loading..." : "Ավելացնել"}
        </Button>
        {formError && <div className={styles.error}>{formError}</div>}
      </Box>
      <Box className={styles.drop} {...getRootProps()}>
        <input className={styles.dropInput} {...getInputProps()} />
        {formData.image_url ? (
          <img
            src={formData.image_url}
            alt="Uploaded Preview"
            className={styles.preview}
          />
        ) : (
          <img src="images/addImg.png" width={390} alt="Add Image" />
        )}
      </Box>
    </Box>
  );
};
