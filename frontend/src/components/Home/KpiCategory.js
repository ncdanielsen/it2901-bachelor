import React, { Component } from "react";

import styles from "./kpiCategory.module.css";
import Kpi from "./Kpi.js";

// list item for kpi categories
const KpiCategory = ({
  category,
  categoryIsSelected,
  selectCategory,
  graphIndex,
  selectKpi
}) => (
  <div>
    <div
      className={
        categoryIsSelected
          ? styles.kpiCategory + " " + styles.categorySelected
          : styles.kpiCategory
      }
      onClick={selectCategory}
    >
      <div>{category.categoryName}</div>
      <div>{categoryIsSelected ? "–" : "+"}</div>
    </div>
    {/* Shows kpis in category only if selected */}
    {categoryIsSelected && (
      <div className={styles.categorySubBox}>
        {category.kpis.map((kpi, i) => (
          <Kpi
            key={i}
            kpi={kpi}
            kpiIsSelected={graphIndex === i}
            selectKpi={() => selectKpi(i)}
          />
        ))}
      </div>
    )}
  </div>
);

export default KpiCategory;
