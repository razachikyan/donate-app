import { useEffect, useState } from "react";
import { useGetItems } from "../../hooks/items/useGetItems";
import { Box, Container, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import Loading from "../../components/feature/loading";
import { Header } from "../../components/feature/profileHeader";
import { Button } from "../../components/feature/button";
import { useCheckAuth } from "../../hooks/auth/useCheckAuth";
import itemsService from "../../services/items.service";

import styles from "./styles.module.css";

export const ProductPage = () => {
  const { id } = useParams();
  const { user } = useCheckAuth();
  const [canRemove, setCanRemove] = useState(false);
  const {
    data: [product],
    pending,
  } = useGetItems("item", id);

  useEffect(() => {
    const userId = user && "user_id" in user ? user.user_id : user?.company_id;
    if (product?.donor_id !== userId) {
      setCanRemove(true);
    }
  }, [product, user]);

  return (
    <Box className={styles.box}>
      <Header text={product?.title} />
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
              {canRemove && (
                <Button
                  onClick={() => itemsService.removeItem(product.item_id)}
                >
                  Ջնջել
                </Button>
              )}
            </Box>
          </Box>
        )}
      </Container>
    </Box>
  );
};
