import React, { Component } from 'react'
import { connect } from 'react-redux'

import './Graph.css'

import {
  LineChart, XAxis, Tooltip, CartesianGrid, Line, Brush,
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
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
      plot = (<LineChart
        width={chartSize}
        height={chartSize}
        data={this.props.data}
      >
        <XAxis dataKey="name" />
        <Tooltip />
        <CartesianGrid stroke="#f5f5f5" />
        <Line type="monotone" dataKey="uv" stroke="#ff7300" yAxisId={0} />
        <Line type="monotone" dataKey="pv" stroke="#387908" yAxisId={1} />
        <Brush />
      </LineChart>)
    } else if (this.props.plotType === "radar") {
      plot = (<RadarChart
        cx={chartSize*0.5}
        cy={chartSize*0.5}
        outerRadius={chartSize*0.3}
        width={chartSize}
        height={chartSize}
        data={this.props.data}
      >
        <PolarGrid />
        <PolarAngleAxis dataKey="subject" />
        <PolarRadiusAxis />
        <Radar name="Mike" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
      </RadarChart>)
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
      <div className="GraphContainer">
        {plot}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Graph)
