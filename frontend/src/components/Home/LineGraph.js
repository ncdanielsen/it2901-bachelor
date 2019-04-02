import React, { Component } from 'react'

import { get, has } from 'lodash'

//import styles from './LineGraph.module.css'
import { LineChart, XAxis, YAxis, Legend, ReferenceLine, Tooltip, CartesianGrid, Line, Brush } from 'recharts'

const strokeColors = ["#3B5EB0", "#44B03B", "#A93BB0", "#3BAEB0", "#B06D3B"]

export default class LineGraph extends Component {

  render() {
    const currentKpisSelected = get(this.props, 'currentKpisSelected', [])
    const kpis = get(this.props, 'kpis', [])

    const cKpiValues = get(this.props, 'cKpiSet.values', [])
    const cKpiKeys = Object.keys(get(cKpiValues, '[0].data[0]', {}))

    let data = []
    currentKpisSelected.forEach((currentKpiSelected, i) => {
      const current_cKpiIndex = cKpiValues.findIndex(cKpiValue => cKpiValue.name === currentKpiSelected)
      const current_cKpi = current_cKpiIndex === -1 ? [] : cKpiValues[current_cKpiIndex]
      const current_cKpiData = get(current_cKpi, 'data', [])
      current_cKpiData.forEach((current_cKpiDataPoint, index) => {
        if (i === 0) {
          let timeAndValue = {time: current_cKpiDataPoint["time"]}
          timeAndValue["dataKey" + i] = current_cKpiDataPoint["value"]
          data.push(timeAndValue)
        } else {
          data[index]["dataKey" + i] = current_cKpiDataPoint["value"] // assumes time data indexes match
        }
      })
    })

    return (
      <div>
          <LineChart width={this.props.chartSize} height={this.props.chartSize} data={data}>
              <XAxis
                allowDataOverflow
                dataKey={get(cKpiKeys, '[0]', "keyNotFound")}
                domain={['dataMin', 'dataMax']}
              />
              <YAxis allowDataOverflow type="number" />
              <Tooltip />
              <CartesianGrid stroke="#f5f5f5" />
              {currentKpisSelected.map((currentKpiSelected, i) => {
                const referenceLineValue = get(this.props.rKpis, '[' + currentKpiSelected + ']', "rKpiValueNotFound")
                if (referenceLineValue === "rKpiValueNotFound") {
                  return <div />
                } else {
                  const kpiIndex = Object.keys(kpis).findIndex(kpiIndex => kpis[kpiIndex].name === currentKpiSelected)
                  const unit = kpiIndex === -1 ? "nameNotFound" : get(kpis[kpiIndex], 'unit', "nameNotFound")
                  return <ReferenceLine
                    key={i}
                    y={referenceLineValue}
                    stroke="red"
                    label={"Reference " + unit}
                  />
                }
              })}
              {
                currentKpisSelected.map((currentKpiSelected, i) => {
                  const kpiIndex = Object.keys(kpis).findIndex(kpiIndex => kpis[kpiIndex].name === currentKpiSelected)
                  const unit = kpiIndex === -1 ? "nameNotFound" : get(kpis[kpiIndex], 'unit', "nameNotFound")
                  return <Line
                    key={i}
                    name={unit}
                    type="monotone"
                    dataKey={"dataKey" + i}
                    stroke={strokeColors[i % strokeColors.length]}
                  />
                })
              }
              <Legend />
              <Brush />
          </LineChart>
      </div>
    )}
}
