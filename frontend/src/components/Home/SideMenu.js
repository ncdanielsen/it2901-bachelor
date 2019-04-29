import React, { Component } from "react"
import { connect } from "react-redux"

import styles from "./SideMenu.module.css"

//import { kpiCategories } from '../../data/data' // will be replaced with data from server

import { getKpiList, getKpiCategories, updateKpiIsSelected, updateMultiSelect } from '../../actions/serverReducerActions'


import { push, replace } from "connected-react-router"

import DataSource from "./DataSource.js"
import KpiCategory from "./KpiCategory.js"

function mapStateToProps(state) {
  /* the path props are used to figure out where the user is,
     which is needed to determine whether to go to or from the graph view
     when clicking on myData and refData in this SideMenu */
  const currentPath = state.router.location.pathname
  const currentPathSplitted = currentPath.split("/")
  const currentPathEnd = currentPathSplitted[currentPathSplitted.length - 1]
  const isMyDataPath = currentPathEnd === "myData"
  const isRefDataPath = currentPathEnd === "refData"
  const isKPIDataPath = currentPathEnd === "";
  return {
    isMyDataPath,
    isRefDataPath,
    isKPIDataPath,
    currentPath,
    currentPathEnd,
    kpiCategories: state.serverReducer.kpiCategories,
    currentKpisSelected: state.serverReducer.currentKpisSelected,
    multiSelect: state.serverReducer.multiSelect,
    current_rKpiName: state.serverReducer.current_rKpiName,
    current_cKpiName: state.serverReducer.current_cKpiName,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateKpiIsSelected: (kpiName, isSelected) => dispatch(updateKpiIsSelected(kpiName, isSelected)),
    push: (url) => dispatch(push(url)),
    replace: (url) => dispatch(replace(url)),
    getKpiOptions: () => {
      dispatch(getKpiList()) // currently not useful
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
    if (
      (path === "myData" && this.props.isMyDataPath) ||
      (path === "refData" && this.props.isRefDataPath) ||
      (path === "" && this.props.isKPIDataPath)
    ) {
      this.props.replace("/home/")
    } else {
      this.props.push(path)
    }
  }

  render() {
    return (
      <div className={styles.SideMenuContainer}>
        <DataSource
          title="My Data Source"
          nameOfChosenSource={this.props.current_cKpiName === "" ? "Source not selected" : this.props.current_cKpiName}
          select={() => this.goTo("myData")}
          isActive={this.props.isMyDataPath}
        />
        <DataSource
          title="Reference Data"
          nameOfChosenSource={this.props.current_rKpiName === "" ? "Source not selected" : this.props.current_rKpiName}
          select={() => this.goTo("refData")}
          isActive={this.props.isRefDataPath}
        />

        <DataSource
          title="KPI Overview"
          nameOfChosenSource=""
          select={() => this.goTo("/")}
          isActive={this.props.isKPIDataPath}
        />


        {this.props.isKPIDataPath &&
          <div className={styles.kpiContainer}>
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


/*

<div className={styles.kpiContainer}>
          <div className={styles.buttonTitle+" "+styles.kpiTitle} onClick={() => console.log("KPI Overview")}>
            KPI Overview
          </div>
        <div>
*/
