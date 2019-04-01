import React from "react"

import styles from "./DataSource.module.css"

// list item for data sources. However, only two are expected to be used (for myData and refData)
const DataSource = ({ title, nameOfChosenSource, select, isActive }) => (
  <div
    onClick={select}
    className={
      isActive ? styles.Button + " " + styles.ButtonSelected : styles.Button
    }
  >
    <div>
      <div className={styles.buttonTitle}>{title}</div>
      <div className={styles.buttonContent}>{nameOfChosenSource}</div>
    </div>
  </div>
)

export default DataSource
