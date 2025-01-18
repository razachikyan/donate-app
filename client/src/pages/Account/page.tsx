import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { Container } from "../../components/feature/container";
import { SideBar } from "../../components/feature/sideBar";
import { UserBlock } from "../../components/feature/userBlock";
import { Header } from "../../components/feature/profileHeader";
import { Tabs } from "../../components/feature/tabs";
import { TabItem } from "../../components/feature/tabs/types";
import { MyPosts } from "../../components/feature/myPosts";
import { NewPost } from "../../components/feature/newPost";
import { useCheckAuth } from "../../hooks/auth/useCheckAuth";
import { CharityPosts } from "../../components/feature/charityPosts";
import authService from "../../services/auth.service";
import companyService from "../../services/company.service";

import styles from "./styles.module.css";
import { Notifications } from "../../components/feature/notifications";

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
  {
    content: <Notifications />,
    key: "notifications",
    label: "Նամակներ",
  },
];

export const AccountPage: React.FC = () => {
  const { user } = useCheckAuth();
  const [username, setUsername] = useState<string>("");
  const [type, setType] = useState<"user" | "company">("user");

  useEffect(() => {
    if (user) {
      if ("name" in user) {
        setType("company");
        setUsername(user.name);
      } else {
        setUsername(`${user?.firstName} ${user?.lastName}`);
        setType("user");
      }
    }
  }, [user]);

  return (
    <Box className={styles.box}>
      <SideBar
        items={[
          <UserBlock type={type} username={username || "no name"} />,
          <button
            onClick={() => {
              localStorage.removeItem("accessToken");
              authService.logout();
              companyService.logout();
              window.location.reload();
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
