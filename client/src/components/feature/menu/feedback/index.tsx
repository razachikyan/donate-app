import { Box, Button } from "@mui/material";

import styles from './styles.module.css'

export const FeedBack = () => {
  return (
    <Box className={styles.container}>
      <h2 className={styles.title}>Ձեր հաղորդագրությունը</h2>
      <textarea className={styles.textarea}></textarea>
      <Box className={styles.bottom}>
        <span className={styles.text}>Ձեր Էլ․ փոստի հասցեն</span>
        <Button className={styles.button}>Ուղարկել</Button>
      </Box>
    </Box>
  );
};
