import { Box } from "@mui/material";

import styles from "./styles.module.css";

export const DonatePanel = () => {
  return (
    <Box className={styles.container}>
      <span className={styles.title}>
        <span className={styles.colored}>«ՆՎԻՐՈՒՄ ԵՄ»</span> Բարեգործական
        Կազմակերպություն
        <a href="/charity">
          <img src="/icons/arrow.svg" alt="arrow" width={40} />
        </a>
      </span>
      <Box className={styles.bottom}>
        <span className={styles.text}>
          {"/////Կայքը նախատեսված է մարդկանց միավերելու համար"}
        </span>
        <a className={styles.navigationBtn} href="/about-us">
          Մեր մասին
        </a>
      </Box>
    </Box>
  );
};
