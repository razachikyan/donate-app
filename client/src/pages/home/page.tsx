import { Box } from "@mui/material";
import { Container } from "../../components/feature/container";
import { Menu } from "../../components/feature/menu";

import styles from "./styles.module.css";

export const HomePage = () => {
  return (
    <Container className={styles.container}>
      <Menu onClick={() => {}} open={false} />
      <Box className={styles.main}>
        <span className={styles.name}>«ՆՎԻՐՈՒՄ ԵՄ»</span>
        <h1 className={styles.title}>Բարեգործական Կազմակերպություն</h1>
      </Box>
    </Container>
  );
};
