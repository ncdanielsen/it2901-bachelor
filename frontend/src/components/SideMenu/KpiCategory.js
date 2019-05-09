import React from "react"

import styles from "./KpiCategory.module.css"
import Kpi from "./Kpi.js"

// list item for kpi categories
const KpiCategory = ({
  category,
  categoryIsSelected,
  selectCategory,
  currentKpisSelected,
  selectKpi
}) => (
  <div>
    <div
      id="kpiCategoryBox"
      className={
        categoryIsSelected
          ? styles.kpiCategory + " " + styles.categorySelected
          : styles.kpiCategory
      }
      onClick={selectCategory}
    >
      <div>{category.name}</div>
      <div>{categoryIsSelected ? "–" : "+"}</div>
    </div>

    {/* Shows kpis in category only if selected */}

    {categoryIsSelected && (
      <div id="kpiBoxes" className={styles.categorySubBox}>
        {category.kpi_names.map((kpi, i) => {
          const kpiIsSelected =
            currentKpisSelected.findIndex(
              selectedKpi => selectedKpi === kpi.name
            ) !== -1

          return (
            <Kpi
              key={i}
              kpi={kpi}
              kpiIsSelected={kpiIsSelected}
              selectKpi={() => selectKpi(kpi.name, !kpiIsSelected)}
            />
          )
        })}
      </div>
    )}
  </div>
)

export default KpiCategory
