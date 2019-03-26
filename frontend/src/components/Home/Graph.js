import React, { Component } from 'react'
import { connect } from 'react-redux'
import LineGraph from './LineGraph.js'
import RadarGraph from './RadarGraph.js'
import styles from './Graph.module.css'

import {
  XAxis, Tooltip, CartesianGrid,
  BarChart, Bar, YAxis, Legend, ReferenceLine
} from 'recharts'

function mapStateToProps(state) {
  return {
    data: state.graphReducer.data.data,
    plotType: state.graphReducer.data.type
  }
}

function mapDispatchToProps(dispatch) {
  return {}
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
    const chartSize = Math.min(this.state.width*0.7, this.state.height*0.8)
    let plot
    if (this.props.plotType === "line") {
      plot = (<LineGraph data={this.props.data} chartSize={chartSize}/>) 

    } else if (this.props.plotType === "radar") {
      plot = (<RadarGraph data = {this.props.data} chartSize = {chartSize}/>)
      
    } else if (this.props.plotType === "posNegBarChart") {
      plot = (<BarChart
        width={chartSize}
        height={chartSize}
        data={this.props.data}
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
    return (
      <div className={styles.GraphContainer}>
        {plot}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Graph)
