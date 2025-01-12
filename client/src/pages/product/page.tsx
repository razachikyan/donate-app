import { useGetItems } from "../../hooks/items/useGetItems";
import { Box, Container, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import Loading from "../../components/feature/loading";

import styles from "./styles.module.css";
import { Header } from "../../components/feature/prifileHeader";

export const ProductPage = () => {
  const { id } = useParams();

  const {
    data: [product],
    pending,
  } = useGetItems("item", id);

  return (
    <Box className={styles.box}>
      <Header text={product?.title}/>
      <Container maxWidth="xl" className={styles.container}>
        {pending ? (
          <Loading />
        ) : (
          <Box className={styles.product}>
            <Box className={styles.left}>
              <img
                src={product?.image_url}
                alt={product?.title}
                width={800}
                height={500}
              />
              <Typography variant="h2" className={styles.title}>
                {product?.title}
              </Typography>
              <Typography variant="body2" className={styles.status}>
                Status: {product?.status}
              </Typography>
            </Box>
            <Box className={styles.right}>
              <Typography variant="body1" className={styles.description}>
                {product?.description}
              </Typography>
              <Typography variant="body2" className={styles.category}>
                Category: {product?.category}
              </Typography>
              <Typography variant="body2" className={styles.condition}>
                Condition: {product?.condition}
              </Typography>
              <Typography variant="body2" className={styles.address}>
                Address: {product?.address}
              </Typography>
              <Typography variant="caption" className={styles.date}>
                Created At: {new Date(product?.created_at).toLocaleDateString()}
              </Typography>
            </Box>
          </Box>
        )}
      </Container>
    </Box>
  );
};
