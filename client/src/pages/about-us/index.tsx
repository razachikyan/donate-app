import { Box } from "@mui/material";
import { Container } from "../../components/feature/container";

import styles from "./styles.module.css";
import { Button } from "../../components/feature/button";

export const AboutUs = () => {
  return (
    <Box className={styles.box}>
      <Container className={styles.container}>
        <img
          src="/images/about-us.png"
          className={styles.image}
          alt="about-us"
        />
        <Box className={styles.content}>
          <h1 className={styles.title}>
            ՄԵՐ <span className={styles.selected}>ՄԱՍԻՆ</span>
          </h1>
          <p className={styles.descr}>
            «Նվիրում եմ» բարեգործական ընկերության վեբ կայքը նախատեսված է
            մարդկանց միավորելու համար, ովքեր ցանկանում են իրենց չօգտագործվող կամ
            ավելորդ իրերը նվիրաբերել նրանց ովքերդրանց կարիգն ունեն։
          </p>
          <p className={styles.descr}>
            Այս պլատֆորմը նպաստում է հասարակության ներսում իրերի
            վերօգտագործմանը՝  նպաստելով շրջակա միջավայրի պահպանությանը և
            խթանելով համայնքների սոցիալական աջակցությունը։
          </p>
          <p className={styles.descr}>
            Նվիրատուները հնարավորություն ունեն ազատվել չօգտագործվող իրերից իսկ
            ստացողները ստանալ անհրաժեշտ իրեր առանց գումար ծաղսելու։
          </p>
          <Button className={styles.button} onClick={() => {}}>
            Առաջարկներ
          </Button>
        </Box>
      </Container>
    </Box>
  );
};
