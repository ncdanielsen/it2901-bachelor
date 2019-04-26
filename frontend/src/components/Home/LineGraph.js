import React, { Component } from 'react'

import moment from 'moment'
import { get } from 'lodash'

//import styles from './LineGraph.module.css'
import { LineChart, XAxis, YAxis, Legend, ReferenceLine, Tooltip, CartesianGrid, Line } from 'recharts'

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
      
      let dataIndex = 0 // index for dataitems as they are added to the data list 

      current_cKpiData.forEach((current_cKpiDataPoint, index) => {
        
        // check for data within the selected timeframe 
        if (current_cKpiDataPoint["time"] >= this.props.fromDateTime.unix() && current_cKpiDataPoint["time"] <= this.props.toDateTime.unix()) {
          
          if (i === 0) { // only gets time from the first selected kpi, assume all KPIs have the same times
            let timeValue = {time: moment.unix(current_cKpiDataPoint["time"]).format("Do MMM YY")}
            data.push(timeValue)
          }
          
          data[dataIndex]["dataKey" + i] = current_cKpiDataPoint["value"] 
          dataIndex += 1
        }
        
      })
    })
    
  

    return (
      <div>
          {console.log(data)}
          <LineChart width={this.props.width} height={this.props.height} data={data}>
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
                  return <div key={i} />
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
              
          </LineChart>
      </div>
    )}
}
