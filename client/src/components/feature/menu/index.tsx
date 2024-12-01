import React, { useEffect } from "react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Tabs, Tab, Box } from "@mui/material";
import { IMenuProps } from "./types";
import { DonatePanel } from "./donate";

import styles from "./styles.module.css";
import { FeedBack } from "./feedback";

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

export const Menu = ({ onClick, open }: IMenuProps) => {
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

const TabPanel = (props: {
  children?: React.ReactNode;
  index: number;
  value: number;
}) => {
  const { children, index, value, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tab-panel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
      className={styles.tabPanel}
    >
      {value === index && <>{children}</>}
    </div>
  );
};
