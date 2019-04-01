import React, { Component } from 'react'

import { get, has } from 'lodash'

//import styles from './LineGraph.module.css'
import { LineChart, XAxis, YAxis, Legend, ReferenceLine, Tooltip, CartesianGrid, Line, Brush } from 'recharts'


export default class LineGraph extends Component {

  render() {
    const cKpiValues = get(this.props, 'cKpiSet.values', [])
    const cKpiKeys = Object.keys(get(cKpiValues, '[0].data[0]', {}))
    const referenceLineValue = get(this.props.rKpis, '[' + get(this.props.currentKpisSelected, '[0]', "") + ']', "rKpiValueNotFound")

    const current_cKpiIndex = cKpiValues.findIndex(cKpiValue => cKpiValue.name === get(this.props.currentKpisSelected, '[0]', "NoMatch"))
    const current_cKpi = current_cKpiIndex === -1 ? [] : cKpiValues[current_cKpiIndex]
    const current_cKpiData = get(current_cKpi, 'data', [])

    const kpiIndex = Object.keys(this.props.kpis).findIndex(kpiIndex => this.props.kpis[kpiIndex].name === get(this.props.currentKpisSelected, '[0]', "NoMatch"))
    const unit = kpiIndex === -1 ? "nameNotFound" : get(this.props.kpis[kpiIndex], 'unit', "nameNotFound")

    return (
      <div>
          <LineChart width={this.props.chartSize} height={this.props.chartSize} data={current_cKpiData}>
              <XAxis
                allowDataOverflow
                dataKey={get(cKpiKeys, '[0]', "keyNotFound")}
                domain={['dataMin', 'dataMax']}
              />
              <YAxis allowDataOverflow type="number" />
              <Tooltip />
              <CartesianGrid stroke="#f5f5f5" />
              {referenceLineValue !== "rKpiValueNotFound" && <ReferenceLine
                y={referenceLineValue}
                stroke="red"
                label="reference"
              />}
              <Line
                name={unit}
                type="monotone"
                dataKey={get(cKpiKeys, '[1]', "keyNotFound")}
                stroke="#387908"
              />
              <Legend />
              {has(this.props, 'cKpiSet.data') && <Brush />}
          </LineChart>
      </div>
    )}
}
