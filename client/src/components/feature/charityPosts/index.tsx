import React from "react";
import { Box } from "@mui/material";
import cx from "classnames";
import { useGetItems } from "../../../hooks/items/useGetItems";
import { useCheckAuth } from "../../../hooks/auth/useCheckAuth";
import Loading from "../loading";
import { Product } from "../product";

import styles from "./styles.module.css";

export const CharityPosts: React.FC = () => {
  const { user, loading } = useCheckAuth();
  const { data = [], pending } = useGetItems("user", user?.user_id ?? "");
  return (
    <Box
      className={cx(styles.container, { [styles.empty]: data.length === 0 })}
    >
      <Box className={styles.list}>
        {loading || pending ? (
          <Loading />
        ) : (
          <>
            {data
              .filter((item) => item.variant === "charity")
              .map((item, i) => (
                <Product key={i} data={item} />
              ))}
          </>
        )}
        {data.length === 0 && (
          <span className={styles.emptyText}>Այս պահին էջը դատարկ է</span>
        )}
      </Box>
    </Box>
  );
};
