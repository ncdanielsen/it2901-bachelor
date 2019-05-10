import React from "react"

import styles from "./Kpi.module.css"

// list item for kpi
// selectKpi == function to run when the Kpi element is clicked
const Kpi = ({ kpi, kpiIsSelected, selectKpi }) => (
  <div
    onClick={selectKpi}
    id="selectedKpi"
    className={
      kpiIsSelected ? styles.kpi + " " + styles.kpiIsSelected : styles.kpi
    }
  >
    {kpi.name} [{kpi.unit}]
  </div>
)

export default Kpi
