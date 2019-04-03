import React, { Component } from 'react'
import { connect } from 'react-redux'
import LineGraph from './LineGraph.js'
import RadarGraph from './RadarGraph.js'
import styles from './Graph.module.css'

import { get } from 'lodash'

function mapStateToProps(state) {
  const currentKpisSelected = state.serverReducer.currentKpisSelected
  let rKpis = {}
  currentKpisSelected.forEach(kpiSelected => {
    const current_rKpiSetIndex = state.serverReducer.rKpiSets.findIndex(rKpiSet => rKpiSet.name === state.serverReducer.current_rKpiName)
    const current_rKpiSet = current_rKpiSetIndex === -1 ? {} : state.serverReducer.rKpiSets[current_rKpiSetIndex]
    get(current_rKpiSet, 'values', []).forEach(rKpi => {
      if (rKpi.name === kpiSelected) {
        rKpis[kpiSelected] = rKpi.value
      }
    })
  })

  const current_cKpiSetIndex = state.serverReducer.cKpiSets.findIndex(cKpiSet => cKpiSet.name === state.serverReducer.current_cKpiName)
  const current_cKpiSet = current_cKpiSetIndex === -1 ? {} : state.serverReducer.cKpiSets[current_cKpiSetIndex]

  return {
    kpis: state.serverReducer.kpis,
    currentKpisSelected,
    current_cKpiSet,
    rKpis,
    showSideMenu: state.uiReducer.showSideMenu
  }
}

function mapDispatchToProps(dispatch) {
  return {}
}

function dataIsDefined() {
  if (this.props.cKpis.length == 0 || this.props.ckpiData.lenght == 0) {
    return "undefined"
  }
}

class Graph extends Component {

  constructor(props) {
    super(props)
    this.state = {width: window.innerWidth, height: window.innerHeight} // for resize rerender
  }

  updateDimensions = () => this.setState({width: window.innerWidth, height: window.innerHeight})
  componentWillMount = () => this.updateDimensions()
  componentDidMount = () => window.addEventListener("resize", this.updateDimensions)
  componentWillUnmount = () => window.removeEventListener("resize", this.updateDimensions)

  render() {

    if (this.props.currentKpisSelected.length === 0) {
      return <div>
                Select a KPI to view from the side menu
              </div>
    }

    const chartSize = Math.min(this.state.width*0.7, this.state.height*0.8)
    let plot

    if (this.props.currentKpisSelected.length === 1) {
      plot = (<LineGraph
        height={chartSize}
        width={this.props.showSideMenu ? this.state.width*0.65 : window.innerWidth*0.9}
        kpis={this.props.kpis}
        rKpis={this.props.rKpis}
        cKpiSet={this.props.current_cKpiSet}
        currentKpisSelected={this.props.currentKpisSelected}
      />)

    } else { // if more than one KPI is selected in the side menu
      plot = (<RadarGraph
        chartSize={chartSize}
        currentKpisSelected={this.props.currentKpisSelected}
        cKpiSet={this.props.current_cKpiSet}
      />)

   }

    return (
      <div className={styles.GraphContainer + (this.props.showSideMenu ? "" : (" " + styles.GraphContainerFullScreen))}>
        {plot}
      </div>

    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Graph)
