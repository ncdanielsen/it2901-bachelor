//import React from "react"; // get the React object from the react module

import React, { Component } from "react";
import styles from "./About.module.css";
//import About from "./About";

class About extends Component {
  render() {
    return (
      <div>
        <div className={styles.AboutMain}>
          <h1>ABOUT:</h1>
          <p>
            This is a placeholder for the about page. This page will contain
            brief information of the ZEN project, purpose and stakeholders.
            <br />
            <strong>Credits:</strong> Might want to include credits (the team
            members, as well as advisors)
            <h5>
              <strong>
                <a href="https://fmezen.no/">ZEN website</a>
              </strong>
            </h5>
          </p>
        </div>
      </div>
    );
  }
}

export default About;
