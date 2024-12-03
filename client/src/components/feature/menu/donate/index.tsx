import { Box } from "@mui/material";
import { Button } from "../../button";

import styles from "./styles.module.css";

export const DonatePanel = () => {
  return (
    <Box className={styles.container}>
      <span className={styles.title}>
        <span className={styles.colored}>«ՆՎԻՐՈՒՄ ԵՄ»</span> Բարեգործական
        Կազմակերպություն
      </span>
      <Box className={styles.bottom}>
        <span className={styles.text}>{"/////Կայքը նախատեսված է մարդկանց միավերելու համար"}</span>
      <Button onClick={() => {}}>Մեր մասին</Button>
      </Box>
    </Box>
  );
};
