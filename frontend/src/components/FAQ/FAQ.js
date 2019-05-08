import React, { Component } from "react"
import styles from "./FAQ.module.css"

import { connect } from "react-redux"

import Header from "../Header"
import SideMenu from "../SideMenu/SideMenu"


function mapStateToProps(state) {
  return {
    showSideMenu: state.uiReducer.showSideMenu
  };
}

class Faq extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className = {styles.Content}>
          {this.props.showSideMenu && <SideMenu />}
          <div className={styles.FaqContainer + (this.props.showSideMenu ? "" : (" " + styles.FaqContainerFullScreen))}>
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
            <h3>How to compare KPI values</h3>
              <p>
                To compare a KPI value to reference KPI how multiple KPI values in
                the view, toggle "multi-select". The reference KPI(s) will
                automatically be added, if a reference data source is chosen. Both
                line and radar charts are available.
              </p>
              <br />
              <h3>
                I have selected a KPI to view from the side menu bars, but no data
                shows up. What's wrong?
              </h3>
              <p>
                Make sure KPI data is selected in My Data Source. No data will
                show up if no source is selected. <br /> If a specific KPI don't
                show up, the KPI set for source might either lack data for the
                KPI, or something might be wrong in the formating.
              </p>
              </div>
              <div className={styles.paddingBottom} />
            </div>
          </div>

        </div>
      </div>
    )
  }
}

export default connect(
  mapStateToProps
)(Faq);
