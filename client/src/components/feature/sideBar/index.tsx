import React from "react";
import { Box, Link } from "@mui/material";
import { ISideBar } from "./types";

import styles from "./styles.module.css";

export const SideBar: React.FC<ISideBar> = ({ items }) => {
  return (
    <Box className={styles.container}>
      {items.map((item, i) => {
        if (item && typeof item === "object" && "name" in item && "link" in item) {
          return (
            <Box key={i} className={styles.item}>
              <Link className={styles.link} href={item.link}>
                {item.name}
                <img src="/icons/arrow.svg" alt="arrow" width={28} />
              </Link>
            </Box>
          );
        } else {
          return (
            <Box key={i} className={styles.item}>
              {item}
            </Box>
          );
        }
      })}
    </Box>
  );
};
