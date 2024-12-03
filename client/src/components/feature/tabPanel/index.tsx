import styles from './styles.module.css'

export const TabPanel = (props: {
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