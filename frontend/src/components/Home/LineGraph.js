import React, { Component } from 'react'

//import styles from './LineGraph.module.css'
import { LineChart, XAxis, YAxis, Legend, ReferenceLine, Tooltip, CartesianGrid, Line, Brush } from 'recharts'


export default class LineGraph extends Component {

  render() {
      return (
        <div>
            <LineChart width={this.props.chartSize} height={this.props.chartSize} data={this.props.cKpi.data}>
                <XAxis
                  allowDataOverflow
                  dataKey={this.props.cKpi && Object.keys(this.props.cKpi.data[0])[0]}
                  domain={['dataMin', 'dataMax']}
                />
                <YAxis allowDataOverflow type="number"
                />
                <Tooltip />
                <CartesianGrid stroke="#f5f5f5" />
                <ReferenceLine
                  y={this.props.rKpis[this.props.currentKpisSelected[0]]}
                  stroke="red"
                  label="reference"
                />
                <Line
                  name={this.props.kpiIndex !== -1 && this.props.kpis[this.props.kpiIndex].unit}
                  type="monotone"
                  dataKey={(this.props.cKpi && this.props.cKpi.data) && Object.keys(this.props.cKpi.data[0])[1]}
                  stroke="#387908"
                />
                <Legend />
                <Brush />
            </LineChart>
        </div>
      )}
}
