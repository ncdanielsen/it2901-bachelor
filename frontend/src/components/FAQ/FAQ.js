
import React, { Component } from "react"
import styles from "./FAQ.module.css"

class Faq extends Component {
  render() {
    return (
      <div className={styles.FaqContainer}>
        <div className={styles.FaqMain}>
          <div>
            <h1>Frequently Asked Questions</h1>
          </div>
          <div>
            <h3>What is a "KPI"?</h3>
            <p>KPI stand for Key Performance Indicators. This is a type of metric that evaluates performance. <br /> For the ZEN project, a KPI measures some aspect of a city, neighbourhood or building to help determine whether the entity of interest meets the characteristics that dene a zero-emission neighbourhood. These characteristics are not yet publicly available.</p>
            <br />
            <h3>What is "My Data Source"?</h3>
            <p>The My Data Source view lets the user specify which data is to be visualized. The data can either be from the publicly available ZEN buildings, or they can be uploaded by the user. Additionally, in the future, functionality to view data that has been shared by other users should be supported.</p>
            <br />
            <h3>What is "Reference Data"?</h3>
            <p>The Reference Data view is accessed by clicking on the "Reference Data" button in the side menu, and the functionality that it offers is two-fold. Firstly, it lets the user specify which set of KPIs is to be used for the visualisations. Secondly, given appropriate authorisation, it lets the user upload reference KPIs so that they can be shared with user-specied groups.</p>
            <br />
            <h3>How to compare two KPIs</h3>
            <p>heyhey</p>
            <br />
            <h3>Something more</h3>
            <p>yoyoyo</p>
            <div className={styles.paddingBottom} />
          </div>
        </div>
      </div>
    )
  }
}

export default Faq
