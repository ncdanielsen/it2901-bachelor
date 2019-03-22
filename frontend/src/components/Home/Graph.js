import React, { Component } from 'react'
import { connect } from 'react-redux'

import styles from './Graph.module.css'

import { getrKpiDataEnergy, getcKpiDataEnergy } from '../../actions/serverReducerActions'

import {
  LineChart, XAxis, Tooltip, CartesianGrid, Line, Brush,
  Radar, RadarChart, PolarGrid, PolarAngleAxis, /*PolarRadiusAxis,
  BarChart, Bar, */YAxis, Legend, ReferenceLine
} from 'recharts'

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
      return <div>Select a KPI to view from the side menu</div>
    }

    const chartSize = Math.min(this.state.width*0.7, this.state.height*0.8)
    let plot
    if (this.props.currentKpisSelected.length === 1) {
      const kpiIndex = this.props.cKpis.findIndex(ckpi => ckpi.name === this.props.currentKpisSelected[0])
      const cKpi = this.props.cKpis[kpiIndex]
      plot = (<LineChart
        width={chartSize}
        height={chartSize}
        data={cKpi && cKpi.data}
      >
        <XAxis
          allowDataOverflow
          dataKey={cKpi && Object.keys(cKpi.data[0])[0]}
          domain={['dataMin', 'dataMax']}
        />
        <YAxis
          allowDataOverflow
          type="number"
        />
        <Tooltip />
        <CartesianGrid stroke="#f5f5f5" />
        <ReferenceLine
          y={this.props.rKpis[this.props.currentKpisSelected[0]]}
          stroke="red"
          label="reference"
        />
        <Line
          name={kpiIndex !== -1 && this.props.kpis[kpiIndex].unit}
          type="monotone"
          dataKey={(cKpi && cKpi.data) && Object.keys(cKpi.data[0])[1]}
          stroke="#387908"
        />
        <Legend />
        <Brush />
      </LineChart>)
    } else { // > 1
      plot = (<RadarChart
        cx={chartSize*0.5*1.2}
        cy={chartSize*0.5}
        outerRadius={chartSize*0.3}
        width={chartSize*1.2}
        height={chartSize}
        data={this.props.currentKpisSelected.map(selectKpi => this.props.cKpis.find(cKpi => cKpi.name === selectKpi))}
      >
        <PolarGrid />
        <PolarAngleAxis dataKey="name" />
        {/*<PolarRadiusAxis angle={30} />*/}
        <Radar name="Calculated" dataKey="score" stroke="#e034de" fill="#f145ef" fillOpacity={0.6} />
        {/*<Radar name="Mike" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />*/}
        <Tooltip />
        <Legend />
      </RadarChart>)
    }

    return (
      <div className={styles.GraphContainer}>
        {plot}
      </div>

    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Graph)


/*

if (this.props.plotType === "line") {
  plot = (<LineChart
    width={chartSize}
    height={chartSize}
    data={this.props.ckpiData}
  >
    <XAxis
      allowDataOverflow
      type="number"
      dataKey="uv"
      domain={[left, right]}
    />
    <YAxis
      allowDataOverflow
      type="number"
      domain={[bottom, top]}
    />
    <Tooltip />
    <CartesianGrid stroke="#f5f5f5" />
    <ReferenceLine y={this.props.rkpiData} stroke="red" label="reference" />
    <Line type="monotone" dataKey="pv" stroke="#387908" />
    <Legend />
    <Brush />
  </LineChart>)
} else if (this.props.plotType === "radar") {
  plot = (<RadarChart
    cx={chartSize*0.5*1.2}
    cy={chartSize*0.5}
    outerRadius={chartSize*0.3}
    width={chartSize*1.2}
    height={chartSize}
    data={this.props.ckpiData}
  >
    <PolarGrid />
    <PolarAngleAxis dataKey="subject" />
    <Radar name="Andy" dataKey="B" stroke="#e034de" fill="#f145ef" fillOpacity={0.6} />
    <Radar name="Mike" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
  </RadarChart>)
} else if (this.props.plotType === "posNegBarChart") {
  plot = (<BarChart
    width={chartSize}
    height={chartSize}
    data={this.props.ckpiData}
  >
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
    <Legend />
    <ReferenceLine y={0} stroke="#000" />
    <Bar dataKey="pv" fill="#8884d8" />
    <Bar dataKey="uv" fill="#82ca9d" />
  </BarChart>)
} else {
  plot = <div />
}

*/
