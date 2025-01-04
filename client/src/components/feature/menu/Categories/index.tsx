import React, { useEffect } from "react";

import styles from "./styles.module.css";
import { Box, List, ListItem } from "@mui/material";
import { useGetCategories } from "../../../../hooks/useGetCategories";
import Loading from "../../loading";

export const Categories: React.FC = () => {
  const { data, error, pending } = useGetCategories();

  useEffect(() => {
    console.log({ data, error, pending });
  }, [data, error, pending]);

  return (
    <Box className={styles.container}>
      {pending ? (
        <Loading />
      ) : (
        <List className={styles.list}>
          {data.map((item) => {
            return (
              <ListItem className={styles.item}>
                <h4 className={styles.name}>
                  <a href={`/charity?category=${item.category_id}`}>{item.name}</a>
                </h4>
                <p className={styles.descr}>{item.description ?? ""}</p>
              </ListItem>
            );
          })}
        </List>
      )}
    </Box>
  );
};
