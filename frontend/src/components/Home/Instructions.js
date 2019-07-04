import React, { Component } from "react"
import { connect } from "react-redux"

import styles from "./Instructions.module.css"

import Icon from '@material-ui/core/Icon' // also depends on <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"> in the header in /public/index.html

// root="true" results in the className={styles.icon} being applied to the root element instead of on a container
const Check = () => <Icon root="true" className={styles.icon} color="primary">check</Icon>
const Fail = () =>  <Icon root="true" className={styles.icon} color="error">cancel</Icon>

/*
  This component is shown on the home page.
  It is also shown instead of a graph in KPI Overview if data sources are not provided.
  It features indicators as to whether a required step to show data has been completed.
*/

function mapStateToProps(state) {
  return {
    current_rKpiName: state.serverReducer.current_rKpiName,
    current_cKpiName: state.serverReducer.current_cKpiName,
    currentKpisSelected: state.serverReducer.currentKpisSelected
  }
}

class Instructions extends Component {
  render() {
    return (
      <div className={styles.instructionsContainer}>
        <h2>Welcome!</h2>
        <div>
          <br />
          <ol className={styles.instructionsList}>
            <li>Choose which data set to explore in <b>My Data Source</b> ({this.props.current_cKpiName === "" ? <Fail /> : <Check />})</li>
            <li>Choose which data set to compare with in <b>Reference Data</b> ({this.props.current_rKpiName === "" ? <Fail /> : <Check />})</li>
            <li>Go to <b>KPI Overview</b> and select the KPIs of interest to look at ({this.props.currentKpisSelected.length === 0 ? <Fail /> : <Check />})</li>
          </ol>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps)(Instructions)
