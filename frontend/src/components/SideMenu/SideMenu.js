import React, { Component } from "react"
import { connect } from "react-redux"

import styles from "./SideMenu.module.css"

import { get } from  'lodash'

import { getKpiList, getKpiCategories, updateKpiIsSelected, updateMultiSelect } from '../../actions/serverReducerActions'


import { push, replace } from "connected-react-router"

import DataSource from "./DataSource.js"
import KpiCategory from "./KpiCategory.js"

/*
  This component lets the user navigate between My Data, Reference Data and KPI Overview (graph).
  When KPI Overview is selected, it also shows the kpi select options
*/

function mapStateToProps(state) {
  /* the path props are used to figure out where the user is,
     which is needed to determine whether to go to or from the graph view
     when clicking on myData and refData in this SideMenu */
  const currentPath = state.router.location.pathname
  const currentPathSplitted = currentPath.split("/")
  const currentPathEnd = currentPathSplitted[currentPathSplitted.length - 1]
  const isMyDataPath = currentPathEnd === "myData"
  const isRefDataPath = currentPathEnd === "refData"
  const isKPIDataPath = currentPathEnd === "graph"

  const current_cKpiIndex = state.serverReducer.cKpiSets.findIndex(cKpiSet => cKpiSet._id === state.serverReducer.current_cKpiName)
  const current_cKpiName = (current_cKpiIndex === -1) ? "Source not selected" : get(state.serverReducer.cKpiSets[current_cKpiIndex], 'name', "Source not found")

  const current_rKpiIndex = state.serverReducer.rKpiSets.findIndex(rKpiSet => rKpiSet._id === state.serverReducer.current_rKpiName)
  const current_rKpiName = (current_rKpiIndex === -1) ? "Source not selected" : get(state.serverReducer.rKpiSets[current_rKpiIndex], 'name', "Source not found")


  return {
    isMyDataPath,
    isRefDataPath,
    isKPIDataPath,
    currentPath,
    currentPathEnd,
    kpiCategories: state.serverReducer.kpiCategories,
    currentKpisSelected: state.serverReducer.currentKpisSelected,
    multiSelect: state.serverReducer.multiSelect,
    current_rKpiName,
    current_cKpiName,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateKpiIsSelected: (kpiName, isSelected) => dispatch(updateKpiIsSelected(kpiName, isSelected)),
    push: (url) => dispatch(push(url)),
    replace: (url) => dispatch(replace(url)),
    getKpiOptions: () => {
      dispatch(getKpiList())
      dispatch(getKpiCategories())
    },
    updateMultiSelect: multiSelect => dispatch(updateMultiSelect(multiSelect))
  }
}

class SideMenu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // might wanna move this state into a reducer at some point
      openKpiCategory: 0 // currently only one category of KPIs can be open in the menu simultaneously
    }
  }

  componentDidMount() {
    /* get kpi options from server every time component mounts.
    Note: perhaps a bit unnecessary,
    can probably do this somewhere else such as in App "onLoggedIn" */
    this.props.getKpiOptions()
  }

  // open category if closed, close if open
  openCategory = index =>
    this.setState({
      openKpiCategory: index === this.state.openKpiCategory ? -1 : index
    })

  updateChosenKpiInCategory = (kpi, kpiIsSelected) => this.props.updateKpiIsSelected(kpi, kpiIsSelected)

  // open or close myData and refData
  goTo = path => {
    if ( // toggles menu options, might have to be removed, they don't make sense to have
      (path === "myData" && this.props.isMyDataPath) ||
      (path === "refData" && this.props.isRefDataPath) ||
      (path === "graph" && this.props.isKPIDataPath)
    ) {
      //this.props.replace("/home/")
    } else {
      this.props.push("/home/" + path)
    }
  }

  render() {
    return (
      <div id="SideBar" className={styles.SideMenuContainer}>
        <DataSource
          title="My Data Source"
          nameOfChosenSource={this.props.current_cKpiName}
          select={() => this.goTo("myData")}
          isActive={this.props.isMyDataPath}
        />
        <DataSource
          title="Reference Data"
          nameOfChosenSource={this.props.current_rKpiName}
          select={() => this.goTo("refData")}
          isActive={this.props.isRefDataPath}
        />

        <DataSource
          title="KPI Overview"
          nameOfChosenSource=""
          select={() => this.goTo("graph")}
          isActive={this.props.isKPIDataPath}
        />


        {this.props.isKPIDataPath &&
          <div id="kpiContainerId" className={styles.kpiContainer}>
            <label htmlFor="multiSelect">Multi-Select</label>
            <input
              type="checkbox"
              id="multiSelect"
              name="drone"
              value="multiSelect"
              checked={this.props.multiSelect}
              onClick={() => this.props.updateMultiSelect(!this.props.multiSelect)}
              onChange={() => {}}
            />
            <div>
              <div className={styles.kpiContent}>
                {Object.keys(this.props.kpiCategories).map((category, i) => (
                  <KpiCategory
                    key={i}
                    category={this.props.kpiCategories[category]}
                    categoryIsSelected={this.state.openKpiCategory === i}
                    selectCategory={() => this.openCategory(i)}
                    currentKpisSelected={this.props.currentKpisSelected}
                    selectKpi={this.updateChosenKpiInCategory}
                  />
                ))}
              </div>
            </div>
          </div>
        }

      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SideMenu)
