import { Box } from "@mui/material";
import styles from "./styles.module.css";
import { Input } from "../../../../shared/input";
import searchService from "../../../../../services/search.service";
import { useState } from "react";
import { IItemResponse } from "../../../../../models/responses/ItemResponse";

const debounce = (func: Function, delay: number) => {
  let timeout: NodeJS.Timeout;
  return (...args: any) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
};

export const Search = () => {
  const [items, setItems] = useState<IItemResponse[]>([]);

  const handleChange = debounce(async (ev: any) => {
    const resp = await searchService.searchItems(ev.target.value);
    setItems(resp);
  }, 500);

  return (
    <Box className={styles.container}>
      <Input
        onChange={handleChange}
        icon="/icons/search.svg"
        placeholder="Որոնում"
        className={styles.input}
        wrapperClassName={styles.wrapper}
      />

      <Box className={styles.items}>
        {items.map((item, i) => (
          <Box key={i} className={styles.item}>
            <a href={`/products/${item.item_id}`}>{item.title}</a>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
