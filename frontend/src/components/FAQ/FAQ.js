//import React from "react"; // get the React object from the react module

import React, { Component } from "react";
import styles from "./Faq.module.css";

class Faq extends Component {
  render() {
    return (
      <div className={styles.FaqMain}>
        <div>
          <h1>Frequently Asked Questions</h1>
        </div>
        <p>
          <h3> What is a "KPI""?</h3>
          KPI stand for Key Performance Indicators. This is a type of metric
          that evaluates performance. <br /> For the ZEN project, a KPI measures
          some aspect of a city, neighbourhood or building to help determine
          whether the entity of interest meets the characteristics that dene a
          zero-emission neighbourhood. These characteristics are not yet
          publicly available.
          <br />
          <h3> What is "My Data Source"?</h3>
          The My Data Source view lets the user specify which data is to be
          visualized. The data can either be from the publicly available ZEN
          buildings, or they can be uploaded by the user. Additionally, in the
          future, functionality to view data that has been shared by other users
          should be supported.
          <br />
          <h3> What is "Reference Data"?</h3>
          The Reference Data view is accessed by clicking on the "Reference
          Data" button in the side menu, and the functionality that it oers is
          two-fold. Firstly, it lets the user specify which set of KPIs is to be
          used for the visualisations. Secondly, given appropriate
          authorisation, it lets the user upload reference KPIs so that they can
          be shared with user-specied groups.
          <br />
          <h3> How to compare two KPIs </h3>
          heyhey
          <br />
          <h3> Something more</h3>
          yoyoyo
        </p>
      </div>
    );
  }
}

export default Faq;
