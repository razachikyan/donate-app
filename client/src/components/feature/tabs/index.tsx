import React, { useState, useEffect } from "react";
import { Tabs as MUITabs, Tab, Box } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import cx from "classnames";
import { ITabsProps } from "./types";

import styles from "./styles.module.css";

export const Tabs: React.FC<ITabsProps> = ({
  tabsData,
  initialTabKey,
  onTabChange,
  className,
  tabClassName,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentTabKey = initialTabKey || searchParams.get("tab");
  const initialTabIndex = tabsData.findIndex(
    (tab) => tab.key === currentTabKey
  );
  const [value, setValue] = useState(
    initialTabIndex !== -1 ? initialTabIndex : 0
  );

  useEffect(() => {
    const currentTab = tabsData[value].key;
    setSearchParams({ tab: currentTab });
    onTabChange?.(currentTab);
  }, [value, setSearchParams, tabsData, onTabChange]);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box>
      <MUITabs
        className={className}
        TabIndicatorProps={{
          style: { backgroundColor: "#e08760" },
        }}
        value={value}
        onChange={handleTabChange}
        aria-label="custom tabs"
      >
        {tabsData.map((tab, index) => (
          <Tab key={index} className={styles.tab} label={tab.label} />
        ))}
      </MUITabs>
      {tabsData.map((tab, index) => (
        <Box
          key={index}
          className={cx(styles.tabPanel, tabClassName)}
          hidden={value !== index}
        >
          {tab.content}
        </Box>
      ))}
    </Box>
  );
};
