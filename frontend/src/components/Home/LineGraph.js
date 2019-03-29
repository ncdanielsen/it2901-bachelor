import React, { Component } from 'react'

import { get, has } from 'lodash'

//import styles from './LineGraph.module.css'
import { LineChart, XAxis, YAxis, Legend, ReferenceLine, Tooltip, CartesianGrid, Line, Brush } from 'recharts'


export default class LineGraph extends Component {

  render() {
    const cKpiKeys = Object.keys(get(this.props, 'cKpi.data[0]', {}))
    return (
      <div>
          <LineChart width={this.props.chartSize} height={this.props.chartSize} data={get(this.props, 'cKpi.data', [])}>
              <XAxis
                allowDataOverflow
                dataKey={get(cKpiKeys, '[0]', "keyNotFound")}
                domain={['dataMin', 'dataMax']}
              />
              <YAxis allowDataOverflow type="number"
              />
              <Tooltip />
              <CartesianGrid stroke="#f5f5f5" />
              <ReferenceLine
                y={get(this.props.rKpis, '[' + get(this.props.currentKpisSelected, '[0]', "") + ']', 0)}
                stroke="red"
                label="reference"
              />
              <Line
                name={get(this.props.kpis, '[' + this.props.kpiIndex + '].unit', "nameNotFound")}
                type="monotone"
                dataKey={get(cKpiKeys, '[1]', "keyNotFound")}
                stroke="#387908"
              />
              <Legend />
              {has(this.props, 'cKpi.data') && <Brush />}
          </LineChart>
      </div>
    )}
}
