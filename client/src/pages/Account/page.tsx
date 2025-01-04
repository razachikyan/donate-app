import React from "react";
import { Box } from "@mui/material";
import { Container } from "../../components/feature/container";
import { SideBar } from "../../components/feature/sideBar";
import { UserBlock } from "../../components/feature/userBlock";
import { Header } from "../../components/feature/header";
import { Tabs } from "../../components/feature/tabs";
import { TabItem } from "../../components/feature/tabs/types";
import { MyPosts } from "../../components/feature/myPosts";
import { NewPost } from "../../components/feature/newPost";

import styles from "./styles.module.css";

const tabData: TabItem[] = [
  {
    content: <MyPosts />,
    key: "my-posts",
    label: "Իմ հայտարարությունները",
  },
  {
    content: <NewPost/>,
    key: "post",
    label: "Տեղադրել հայտարարություն",
  },
  {
    content: "",
    key: "charity",
    label: "Բարեգործություն",
  },
];

export const AccountPage: React.FC = () => {
  return (
    <Box className={styles.box}>
      <SideBar items={[<UserBlock username="Saqo" />]} />
      <Header text="Իմ պրոֆիլը" />
      <Container className={styles.container}>
        <Tabs tabClassName={styles.tab} tabsData={tabData} />
      </Container>
    </Box>
  );
};
