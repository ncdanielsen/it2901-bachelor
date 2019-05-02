import React, { Component } from "react"
import { connect } from "react-redux"

import styles from "./Instructions.module.css"

import Icon from '@material-ui/core/Icon'

const Check = () => <Icon root="true" className={styles.icon} color="primary">check</Icon>
const Fail = () =>  <Icon root="true" className={styles.icon} color="error">cancel</Icon>

function mapStateToProps(state) {
  return {
    showSideMenu: state.uiReducer.showSideMenu,
    current_rKpiName: state.serverReducer.current_rKpiName,
    current_cKpiName: state.serverReducer.current_cKpiName,
    currentKpisSelected: state.serverReducer.currentKpisSelected
  }
}

function mapDispatchToProps(dispatch) {
  return {}
}

class Instructions extends Component {



  render() {



    return (
      <div className={styles.instructionsContainer + (this.props.showSideMenu ? "" : (" " + styles.instructionsContainerFullScreen))}>
        <div>
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
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Instructions)
