import { useSearchParams } from "react-router-dom";
import { Container } from "../../components/feature/container";
import { useEffect } from "react";

import styles from "./styles.module.css";
import { useGetItems } from "../../hooks/items/useGetItems";
import { Box } from "@mui/material";
import { Product } from "../../components/feature/product";

export const Charity = () => {
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get("category");
  const { data } = useGetItems(
    categoryId ? "category" : "all",
    categoryId ?? ""
  );

  return (
    <Box className={styles.box}>
      <Container className={styles.container}>
        <Box className={styles.list}>
          {data.map((item) => {
            return <Product data={item} />;
          })}
        </Box>
      </Container>
    </Box>
  );
};
