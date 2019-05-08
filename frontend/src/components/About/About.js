import React, { Component } from "react";
import styles from "./About.module.css";
//Might want to add contact info at some point.

import { connect } from "react-redux"
import Header from "../Header"
import SideMenu from "../SideMenu/SideMenu"


function mapStateToProps(state) {
  return {
    showSideMenu: state.uiReducer.showSideMenu
  };
}

class About extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className = {styles.Content}>
          {this.props.showSideMenu && <SideMenu />}
          <div className={styles.AboutContainer + (this.props.showSideMenu ? "" : (" " + styles.AboutContainerFullScreen))}>
            <div className={styles.AboutMain}>
              <h1>ABOUT</h1>
              <div>
                <p>
                  This is a placeholder for the about page. This page will contain brief information of the ZEN project, purpose and stakeholders.
                </p>
                <p>
                  <strong>Credits:</strong> Might want to include credits (the team members, as well as advisors)
                </p>
                <h5>
                  <strong>
                    <a href="https://fmezen.no/">ZEN website</a>
                  </strong>
                </h5>
              </div>
              <div className={styles.paddingBottom} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps)(About);
