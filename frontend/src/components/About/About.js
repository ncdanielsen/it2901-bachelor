import React from "react"
import styles from "./About.module.css"

import ContainerWithSideMenu from '../ContainerWithSideMenu'

const About = () => (
  <ContainerWithSideMenu>
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
  </ContainerWithSideMenu>
)

export default About
