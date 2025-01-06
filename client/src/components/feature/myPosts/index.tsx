import React from "react";
import { Box } from "@mui/material";
import cx from "classnames";

import styles from "./styles.module.css";
import { useGetItems } from "../../../hooks/items/useGetItems";
import { useCheckAuth } from "../../../hooks/auth/useCheckAuth";
import Loading from "../loading";
import { Product } from "../product";

export const MyPosts: React.FC = () => {
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
            {data.map((item, i) => (
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
