import React from "react"

import styles from "./DataSource.module.css"

// list item for data sources. However, only two are expected to be used (for myData and refData)
// select == function to run when the DataSource element is clicked
const DataSource = ({ title, nameOfChosenSource, select, isActive }) => (
  <div
    id="chosenDataSourceId3"
    onClick={select}
    className={
      isActive ? styles.Button + " " + styles.ButtonSelected : styles.Button
    }
  >
    <div>
      <div id="myDataSource" className={styles.buttonTitle}>{title}</div>
      <div id="selectedDataSource" className={styles.buttonContent}>{nameOfChosenSource}</div>
    </div>
  </div>
)

export default DataSource
