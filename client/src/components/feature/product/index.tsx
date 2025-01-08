import React, { useState } from "react";
import { IKImage } from "imagekitio-react";
import { Box } from "@mui/material";
import cx from "classnames";
import { IProductProps } from "./types";

import styles from "./styles.module.css";

export const Product: React.FC<IProductProps> = ({ data, className }) => {
  const hasMore = data.description.length > 30;
  const [showing, setShowing] = useState<boolean>(false);
  return (
    <Box className={cx(className, styles.container)}>
      <IKImage src={data.image_url} alt={data.title} className={styles.image} />
      <Box className={styles.info}>
        <a href={`/products/${data.item_id}`} className={styles.title}>{data.title}</a>
        <p className={styles.descr}>
          {showing ? data.description : (data.description.slice(0, 30) + "...")}
        </p>
        {hasMore && (
          <button
            onClick={() => setShowing((prev) => !prev)}
            className={styles.button}
          >
            {showing ? "Փակել" : "Կարդալ ավելին"}
          </button>
        )}
      </Box>
    </Box>
  );
};
