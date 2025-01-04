export interface TabItem {
  label: string;
  content: React.ReactNode;
  key: string;
}

export interface ITabsProps {
  tabsData: TabItem[];
  initialTabKey?: string;
  onTabChange?: (tabKey: string) => void;
  className?: string;
  tabClassName?: string;
}
