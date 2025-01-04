import { useState } from "react";
import { Box } from "@mui/material";
import { DonatePanel } from "./donate";
import { FeedBack } from "./feedback";
import { Categories } from "./Categories";
import { Tabs } from "../tabs";

import styles from "./styles.module.css";

const tabData = [
  {
    label: "Բարեգործություն",
    content: <DonatePanel />,
    key: "charity",
  },
  {
    label: "Կատեգորիաներ",
    content: <Categories />,
    key: "categories",
  },
  { label: "Որոնում", content: "Որոնում բովանդակություն", key: "search" },
  {
    label: "Հետադարձ կապ",
    content: <FeedBack />,
    key: "contact",
  },
];

export const Menu = () => {
  const [menu, setMenu] = useState<boolean>(false);

  return (
    <Box className={styles.container}>
      <button
        onClick={() => setMenu((prev) => !prev)}
        className={styles.button}
      >
        <img src="icons/menu.svg" alt="menu" />
      </button>
      {menu && (
        <Box className={styles.menu}>
          <a href="/me" className={styles.account}>
            Պրոֆիլ <img src="/icons/arrow.svg" alt="arrow" width={28} />
          </a>
          <Tabs tabsData={tabData} />
        </Box>
      )}
    </Box>
  );
};
