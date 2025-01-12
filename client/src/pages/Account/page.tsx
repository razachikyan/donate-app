import React, { useEffect } from "react";
import { Box } from "@mui/material";
import { Container } from "../../components/feature/container";
import { SideBar } from "../../components/feature/sideBar";
import { UserBlock } from "../../components/feature/userBlock";
import { Header } from "../../components/feature/prifileHeader";
import { Tabs } from "../../components/feature/tabs";
import { TabItem } from "../../components/feature/tabs/types";
import { MyPosts } from "../../components/feature/myPosts";
import { NewPost } from "../../components/feature/newPost";
import { useCheckAuth } from "../../hooks/auth/useCheckAuth";

import styles from "./styles.module.css";
import { CharityPosts } from "../../components/feature/charityPosts";
import authService from "../../services/auth.service";

const tabData: TabItem[] = [
  {
    content: <MyPosts />,
    key: "my-posts",
    label: "Իմ հայտարարությունները",
  },
  {
    content: <NewPost />,
    key: "post",
    label: "Տեղադրել հայտարարություն",
  },
  {
    content: <CharityPosts />,
    key: "charity",
    label: "Բարեգործություն",
  },
];

export const AccountPage: React.FC = () => {
  const { user } = useCheckAuth();

  return (
    <Box className={styles.box}>
      <SideBar
        items={[
          <UserBlock username={`${user?.firstName} ${user?.lastName}`} />,
          <button
            onClick={() => {
              localStorage.removeItem('accessToken')
              authService.logout();
              window.location.reload()
            }}
            className={styles.logout}
          >
            Դուրս գալ
          </button>,
        ]}
      />
      <Header className={styles.header} text="Իմ պրոֆիլը" />
      <Container className={styles.container}>
        <Tabs tabClassName={styles.tab} tabsData={tabData} />
      </Container>
    </Box>
  );
};
