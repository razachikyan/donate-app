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
  const id = user && 'user_id' in user ? user.user_id : user?.company_id
  const { data = [], pending } = useGetItems("user", id ?? "");
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
              .filter((item) => {
                const limit = new Date();
                limit.setDate(limit.getDate() - 5);

                return new Date(item.created_at).getTime() > limit.getTime();
              })
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
