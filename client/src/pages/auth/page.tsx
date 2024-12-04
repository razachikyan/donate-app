import { useEffect, useState } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import { Container } from "../../components/feature/container";
import { useSearchParams } from "react-router-dom";
import { TabPanel } from "../../components/feature/tabPanel";
import { AuthForm } from "../../components/feature/authForm";

import styles from "./styles.module.css";

const tabData = [
  {
    label: "Մուտք գործել",
    key: "login",
    content: <div>Մուտք գործել բովանդակություն</div>,
  },
  {
    label: "Գրանցվել",
    key: "signup",
    content: <div>Գրանցվել բովանդակություն</div>,
  },
];

const tabData2 = [
  {
    label: "անհատ",
    key: "login",
    content: <div>Մուտք գործել բովանդակություն</div>,
  },
  {
    label: "կազմակերպություն",
    key: "signup",
    content: <div>Գրանցվել բովանդակություն</div>,
  },
];

export const Auth = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTabKey = searchParams.get("tab");
  const initialTabIndex = tabData.findIndex((tab) => tab.key === initialTabKey);

  const [value, setValue] = useState(
    initialTabIndex !== -1 ? initialTabIndex : 0
  );

  const initialTabKey2 = searchParams.get("tab2");
  const initialTabIndex2 = tabData2.findIndex(
    (tab) => tab.key === initialTabKey2
  );

  const [value2, setValue2] = useState(
    initialTabIndex2 !== -1 ? initialTabIndex2 : 0
  );

  useEffect(() => {
    const tabKey = tabData[value]?.key;
    if (tabKey) {
      setSearchParams({ tab: tabKey });
    }
  }, [value, setSearchParams]);

  useEffect(() => {
    const tabKey2 = tabData2[value2]?.key;
    if (tabKey2) {
      setSearchParams((prevParams) => {
        const newParams = new URLSearchParams(prevParams);
        newParams.set("tab2", tabKey2);
        return newParams;
      });
    }
  }, [value2, setSearchParams]);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleTabChange2 = (_: React.SyntheticEvent, newValue2: number) => {
    setValue2(newValue2);
  };

  return (
    <Box className={styles.box}>
      <Container className={styles.container}>
        <Box className={styles.header}>
          <Box>
            <Tabs
              value={value}
              onChange={handleTabChange}
              TabIndicatorProps={{ style: { backgroundColor: "#e08760" } }}
              aria-label="auth tabs"
              centered
            >
              {tabData.flatMap((tab, index) =>
                index % 2 === 0 ? (
                  [
                    <Tab
                      className={styles.tab}
                      key={index}
                      label={tab.label}
                      id={`tab-${index}`}
                      aria-controls={`tab-panel-${index}`}
                    />,
                    <span
                      key={`separator-${index}`}
                      className={styles.separator}
                    >
                      /
                    </span>,
                  ]
                ) : (
                  <Tab
                    className={styles.tab}
                    key={index}
                    label={tab.label}
                    id={`tab-${index}`}
                    aria-controls={`tab-panel-${index}`}
                  />
                )
              )}
            </Tabs>
            {tabData.map((tab, index) => (
              <TabPanel key={index} value={value} index={index}>
                {tab.content}
              </TabPanel>
            ))}
          </Box>
          <Box>
            <Tabs
              value={value2}
              onChange={handleTabChange2}
              TabIndicatorProps={{ style: { backgroundColor: "#e08760" } }}
              aria-label="auth tabs"
              centered
            >
              {tabData2.flatMap((tab, index) =>
                index % 2 === 0 ? (
                  [
                    <Tab
                      className={styles.tab}
                      key={index}
                      label={tab.label}
                      id={`tab-${index}`}
                      aria-controls={`tab-panel-${index}`}
                    />,
                    <span
                      key={`separator-${index}`}
                      className={styles.separator}
                    >
                      /
                    </span>,
                  ]
                ) : (
                  <Tab
                    className={styles.tab}
                    key={index}
                    label={tab.label}
                    id={`tab-${index}`}
                    aria-controls={`tab-panel-${index}`}
                  />
                )
              )}
            </Tabs>
            {tabData2.map((tab, index) => (
              <TabPanel key={index} value={value2} index={index}>
                {tab.content}
              </TabPanel>
            ))}
          </Box>
        </Box>
        <AuthForm form={value === 0 ? "signin" : "signup"} />
      </Container>
    </Box>
  );
};
