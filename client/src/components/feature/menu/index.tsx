import React, { useEffect } from "react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Tabs, Tab } from "@mui/material";
import { DonatePanel } from "./donate";
import { FeedBack } from "./feedback";

import styles from "./styles.module.css";
import { TabPanel } from "../tabPanel";

const tabData = [
  {
    label: "Բարեգործություն",
    content: <DonatePanel />,
    key: "charity",
  },
  {
    label: "Կատեգորիաներ",
    content: "Կատեգորիաներ բովանդակություն",
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
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTabKey = searchParams.get("tab");
  const initialTab = tabData.findIndex((tab) => tab.key === initialTabKey);
  const [value, setValue] = useState(initialTab !== -1 ? initialTab : 0);

  useEffect(() => {
    setSearchParams({ tab: tabData[value].key });
  }, [value, setSearchParams]);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className={styles.container}>
      <button
        onClick={() => setMenu((prev) => !prev)}
        className={styles.button}
      >
        <img src="icons/menu.svg" alt="menu" />
      </button>
      {menu && (
        <div className={styles.menu}>
          <span className={styles.account}>Պրոֆիլ</span>
          <Tabs
            TabIndicatorProps={{
              style: { backgroundColor: "#e08760" },
            }}
            value={value}
            onChange={handleTabChange}
            aria-label="menu tabs"
          >
            {tabData.map((tab, index) => (
              <Tab key={index} className={styles.tab} label={tab.label} />
            ))}
          </Tabs>
          {tabData.map((tab, index) => (
            <TabPanel value={value} index={index} key={index}>
              {tab.content}
            </TabPanel>
          ))}
        </div>
      )}
    </div>
  );
};


