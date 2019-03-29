import React, { Component } from 'react'
import { connect } from 'react-redux'
import LineGraph from './LineGraph.js'
import RadarGraph from './RadarGraph.js'
import styles from './Graph.module.css'

import { getrKpiDataEnergy, getcKpiDataEnergy } from '../../actions/serverReducerActions'



function mapStateToProps(state) {
  const currentKpisSelected = state.serverReducer.currentKpisSelected
  let rKpis = {}
  currentKpisSelected.forEach(kpiSelected => {
    rKpis[kpiSelected] = 0
    state.serverReducer.rkpis.forEach(rkpiCategory => {
      rkpiCategory.forEach(rKpi => {
        if (rKpi.name === kpiSelected) {
          rKpis[kpiSelected] = rKpi.value
        }
      })
    })
    //state.serverReducer.ckpis.forEach(cKpi => {cKpis[cKpi] = []})
  })
  return {
    kpis: state.serverReducer.kpis,
    cKpis: state.serverReducer.ckpis,
    ckpiData: state.graphReducer.cKpi.data,
    currentKpisSelected,
    rKpis
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getrKpiDataEnergy: () => dispatch(getrKpiDataEnergy()),
    getcKpiDataEnergy: () => dispatch(getcKpiDataEnergy())
  }
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
  componentDidMount = () =>
  {
    window.addEventListener("resize", this.updateDimensions)
    this.props.getrKpiDataEnergy()
    this.props.getcKpiDataEnergy()
  }
  componentWillUnmount = () => window.removeEventListener("resize", this.updateDimensions)

  render() {
    
    if (this.props.currentKpisSelected.length === 0) {
      return <div>
                Select a KPI to view from the side menu
                {this.props.cKpis.name}
              </div>
    }

    const chartSize = Math.min(this.state.width*0.7, this.state.height*0.8)
    let plot
    
    if (this.props.currentKpisSelected.length === 1) {
      const kpiIndex = this.props.cKpis.findIndex(ckpi => ckpi.name === this.props.currentKpisSelected[0])
      const cKpi = this.props.cKpis[kpiIndex]
      plot = (<LineGraph chartSize={chartSize} kpis={this.props.kpis} rKpis={this.props.rKpis} 
                         cKpi={cKpi} kpiIndex={kpiIndex} currentKpisSelected={this.props.currentKpisSelected}/>)
    
    } else { // if more than one KPI is selected in the side menu
      plot = (<RadarGraph chartSize={chartSize} currentKpisSelected={this.props.currentKpisSelected} cKpis={this.props.cKpis}/>)
    }

    return (
      <div className={styles.GraphContainer}>
        {plot}
        {console.log(this.props.currentKpisSelected.map(selectKpi => this.props.cKpis.find(cKpi => cKpi.name === selectKpi)))}
      </div>

    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Graph)
