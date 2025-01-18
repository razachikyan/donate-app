import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Container, Typography } from "@mui/material";
import { useGetItems } from "../../hooks/items/useGetItems";
import { useCheckAuth } from "../../hooks/auth/useCheckAuth";
import itemsService from "../../services/items.service";
import transactionsService from "../../services/transactions.service";
import Loading from "../../components/feature/loading";
import { Header } from "../../components/feature/profileHeader";
import { Button } from "../../components/feature/button";
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
    if (user && product) {
      const userId = "user_id" in user ? user.user_id : user.company_id;
      setCanRemove(product.donor_id !== userId);
    }
  }, [product, user]);

  const handleRemoveItem = () => {
    if (product?.item_id) {
      itemsService.removeItem(product.item_id);
    }
  };

  const handleCreateTransaction = () => {
    if (product?.item_id && user) {
      transactionsService.createTransaction({
        donor_id: product.donor_id,
        item_id: product.item_id,
        recipient_id: user && 'user_id' in user ? user.user_id : user?.company_id,
        status: "in_progress",
      });
    }
  };

  return (
    <Box className={styles.box}>
      <Header text={product?.title || "Product"} />
      <Container maxWidth="xl" className={styles.container}>
        {pending ? (
          <Loading />
        ) : (
          <Box className={styles.product}>
            <Box className={styles.left}>
              <img
                src={product?.image_url}
                alt={product?.title || "Product Image"}
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
                Created At:{" "}
                {product?.created_at
                  ? new Date(product.created_at).toLocaleDateString()
                  : "N/A"}
              </Typography>
              {canRemove ? (
                <Button onClick={handleRemoveItem}>Ջնջել</Button>
              ) : (
                <Button onClick={handleCreateTransaction}>
                  Կատարել հարցում
                </Button>
              )}
            </Box>
          </Box>
        )}
      </Container>
    </Box>
  );
};
