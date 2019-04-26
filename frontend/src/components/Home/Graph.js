import React, { Component } from "react"
import { connect } from "react-redux"

import { updateChartType } from "../../actions/uiReducerActions"

import LineGraph from "./LineGraph.js"
import RadarGraph from "./RadarGraph.js"
import Dropdown from "./Dropdown.js"
import TimeDateSelection from "./TimeDateSelection.js"

import styles from "./Graph.module.css"

import { get } from "lodash"


function mapStateToProps(state) {
  const currentKpisSelected = state.serverReducer.currentKpisSelected;
  let rKpis = {}
  currentKpisSelected.forEach(kpiSelected => {
    const current_rKpiSetIndex = state.serverReducer.rKpiSets.findIndex(
      rKpiSet => rKpiSet.name === state.serverReducer.current_rKpiName
    );
    const current_rKpiSet =
      current_rKpiSetIndex === -1
        ? {}
        : state.serverReducer.rKpiSets[current_rKpiSetIndex];
    get(current_rKpiSet, "values", []).forEach(rKpi => {
      if (rKpi.name === kpiSelected) {
        rKpis[kpiSelected] = rKpi.value
      }
    })
  })

  const current_cKpiSetIndex = state.serverReducer.cKpiSets.findIndex(
    cKpiSet => cKpiSet.name === state.serverReducer.current_cKpiName
  );
  const current_cKpiSet =
    current_cKpiSetIndex === -1
      ? {}
      : state.serverReducer.cKpiSets[current_cKpiSetIndex];

  return {
    chartType: state.uiReducer.chartType,
    kpis: state.serverReducer.kpis,
    currentKpisSelected,
    current_cKpiSet,
    rKpis,
    showSideMenu: state.uiReducer.showSideMenu,
    currentSelectedFromDateTime: state.uiReducer.fromDateTime,
    currentSelectedToDateTime: state.uiReducer.toDateTime
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateChartType: chartType => dispatch(updateChartType(chartType))
  }
}


class Graph extends Component {
  constructor(props) {
    super(props);
    this.state = { width: window.innerWidth, height: window.innerHeight } // for resize rerender
  }

  updateDimensions = () => this.setState({ width: window.innerWidth, height: window.innerHeight })
 

  updateDimensions = () => this.setState({width: window.innerWidth, height: window.innerHeight})
  componentWillMount = () => this.updateDimensions()
  componentDidMount = () => window.addEventListener("resize", this.updateDimensions)
  componentWillUnmount = () => window.removeEventListener("resize", this.updateDimensions)

  updateChartType = chartType => this.props.updateChartType(chartType)
  
  
  render() {
    if (this.props.currentKpisSelected.length === 0) {
      return (
        <div className={styles.NoKpiSelected}>
          <div>
            <p>
              No KPI(s) selected. <br />
              <br /> Select a KPI to view from the side menu bars (Energy,
              Power, Emissions, Economy, Mobility or Spartial Quality)
            </p>
            <br />
          </div>
        </div>
      );
    }

    const chartSize = Math.min(this.state.width*0.7, this.state.height*0.8)
    let plot

    if (this.props.currentKpisSelected.length < 3 || this.props.chartType === "Line") {
      plot = (<LineGraph
        height={chartSize}
        width={this.props.showSideMenu ? this.state.width*0.65 : window.innerWidth*0.9}
        kpis={this.props.kpis}
        rKpis={this.props.rKpis}
        cKpiSet={this.props.current_cKpiSet}
        currentKpisSelected={this.props.currentKpisSelected}
        fromDateTime={this.props.currentSelectedFromDateTime}
        toDateTime={this.props.currentSelectedToDateTime}
      />)

    } else { // if more than two KPI is selected in the side menu
      plot = (<RadarGraph
        chartSize={chartSize}
        currentKpisSelected={this.props.currentKpisSelected}
        rKpis={this.props.rKpis} 
        cKpiSet={this.props.current_cKpiSet}
        kpis={this.props.kpis}
        fromDateTime={this.props.currentSelectedFromDateTime}
        toDateTime={this.props.currentSelectedToDateTime}
      />)
   }

    return (
      <div className={styles.GraphContainer + (this.props.showSideMenu ? "" : (" " + styles.GraphContainerFullScreen))}>
        <div className={styles.timeDatePicker}>
          <TimeDateSelection />
        </div>
        {plot}
        {this.props.currentKpisSelected.length > 2 && (
          <div className={styles.chartTypeDropDown}>
            <Dropdown
              title="Chart Type"
              activeOption={this.props.chartType}
              updateActiveOption={this.updateChartType}
              options={["Radar", "Line"]}
            />
          </div>
        )}
      </div>
    )
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Graph)
