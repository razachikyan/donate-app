import { useSearchParams } from "react-router-dom";
import { Container } from "../../components/feature/container";
import { useGetItems } from "../../hooks/items/useGetItems";
import { Box, Chip } from "@mui/material";
import { Product } from "../../components/feature/product";
import { Select } from "../../components/shared/select";
import { Header } from "../../components/feature/profileHeader";
import { useGetCategories } from "../../hooks/categories/useGetCategories";
import { useState, useEffect } from "react";

import styles from "./styles.module.css";

export const Charity = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: categories = [] } = useGetCategories();
  const categoryId = searchParams.get("category");
  const condition = searchParams.get("condition");
  const { data } = useGetItems(
    categoryId ? "category" : "all",
    categoryId ?? ""
  );

  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    categoryId
  );
  const [selectedCondition, setSelectedCondition] = useState<
    "new" | "used" | null
  >(condition as "new" | "used" | null);
  const [filteredData, setFilteredData] = useState(data);

  const getCategoryName = (id: string) => {
    const category = categories.find((item) => {
      return item.category_id === id;
    });
    return category ? category.name : null;
  };

  useEffect(() => {
    let filtered = [...data];

    if (selectedCategory) {
      const categoryId = getCategoryName(selectedCategory);
      filtered = filtered.filter((item) => item.category === categoryId);
    }

    if (selectedCondition) {
      filtered = filtered.filter(
        (item) => item.condition === selectedCondition
      );
    }

    setFilteredData(filtered);
  }, [selectedCategory, selectedCondition, data, categories]);

  useEffect(() => {
    const params: any = {};

    if (selectedCategory) params.category = selectedCategory;
    if (selectedCondition) params.condition = selectedCondition;

    setSearchParams(params);
  }, [selectedCategory, selectedCondition, setSearchParams]);

  const removeFilter = (filter: "category" | "condition") => {
    if (filter === "category") {
      setSelectedCategory(null);
    } else {
      setSelectedCondition(null);
    }
  };

  return (
    <Box className={styles.box}>
      <Header text="Բարեգործություն" />
      <Container className={styles.container}>
        <Box className={styles.controls}>
          <Select
            fullWidth
            label="Կատեգորիա"
            value={selectedCategory || ""}
            onChange={(ev) => setSelectedCategory(ev.target.value)}
            options={categories.map((item) => ({
              value: item.name,
              label: item.name,
            }))}
          />
          <Select
            fullWidth
            label="Վիճակ"
            value={selectedCondition || ""}
            onChange={(ev) => setSelectedCondition(ev.target.value as any)}
            options={[
              { label: "Նոր", value: "new" },
              { label: "Օգտագործված", value: "used" },
            ]}
          />
          <Box className={styles.activeFilters}>
            {selectedCategory && (
              <Chip
                label={`Կատեգորիա: ${selectedCategory}`}
                onDelete={() => removeFilter("category")}
                className={styles.filterChip}
              />
            )}
            {selectedCondition && (
              <Chip
                label={`Վիճակ: ${selectedCondition}`}
                onDelete={() => removeFilter("condition")}
                className={styles.filterChip}
              />
            )}
          </Box>
        </Box>
        <Box className={styles.list}>
          {filteredData.filter(item => item.variant === "charity").map((item) => {
            return <Product key={item.item_id} data={item} />;
          })}
        </Box>
      </Container>
    </Box>
  );
};
