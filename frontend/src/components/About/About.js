//import React from "react"; // get the React object from the react module

import React, { Component } from "react";
import styles from "./About.module.css";
//import About from "./About";

class About extends Component {
  render() {
    return (
      <div className={styles.AboutContainer}>
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
    );
  }
}

export default About;
