import React, { Component } from "react"

import shortid from 'shortid' // for generating unique ids

import moment from 'moment'
import { get } from 'lodash'

import { LineChart, XAxis, YAxis, Legend, Tooltip, CartesianGrid, Line } from 'recharts' // ReferenceLine


const strokeColors = ["#3B5EB0", "#44B03B", "#A93BB0", "#3BAEB0", "#B06D3B"]
const strokeW = 2

// A function for finding the corresponding category to a KPI which has been selected
function findCategory(categories, kpiName) {

  for (let j = 0; j < categories.length; j++) {
    for (let i = 0; i < categories[j]["kpi_names"].length; i++) {
      if (categories[j]["kpi_names"][i]["name"] === kpiName) {
        return categories[j]["name"]
      }
    }
  }
}



export default class LineGraph extends Component {

  render() {
    const currentKpisSelected = get(this.props, 'currentKpisSelected', [])
    const cKpiValues = get(this.props, 'cKpiSet.values', [])
    const cKpiKeys = Object.keys(get(cKpiValues, '[0].data[0]', {}))

    let data = []

    // iterates over the currently selected KPIs and builds the data array which is to be sent to the graph
    currentKpisSelected.forEach((currentKpiSelected, i) => {
      const current_cKpiIndex = cKpiValues.findIndex(cKpiValue => cKpiValue.name === currentKpiSelected)
      const current_cKpi = current_cKpiIndex === -1 ? [] : cKpiValues[current_cKpiIndex]
      const current_cKpiData = get(current_cKpi, 'data', [])
      const referenceLineValue = get(this.props.rKpis, '[' + currentKpiSelected + ']', "rKpiValueNotFound")

      let dataIndex = 0 // index for dataitems as they are added to the data array

      current_cKpiData.forEach((current_cKpiDataPoint) => {

        // check for data within the selected timeframe
        // time and date is converted to unix time since this is the format used in the database
        if (current_cKpiDataPoint["time"] >= this.props.fromDateTime.unix() && current_cKpiDataPoint["time"] <= this.props.toDateTime.unix()) {

          if (i === 0) { // only gets time from the first selected kpi, assume all KPIs have the same time and date for each datapoint
            let timeValue = {time: moment.unix(current_cKpiDataPoint["time"]).format("Do MMM YY")}
            data.push(timeValue)
          }

          // adds the data value for each KPI for each time and date
          data[dataIndex]["dataKey" + i] = current_cKpiDataPoint["value"]

          // adds reference data as well if reference data is selected and available
          if (referenceLineValue !== "rKpiValueNotFound") {
            data[dataIndex]["reference" + i] = referenceLineValue
          }
          dataIndex += 1
        }
      })
    })


    return (
      <div id="lineGraphId">
          <LineChart width={this.props.width} height={this.props.height} data={data}>
              <XAxis
                allowDataOverflow
                dataKey={get(cKpiKeys, '[0]', "keyNotFound")}
                domain={['dataMin', 'dataMax']}
              />
              <YAxis
                allowDataOverflow type="number"
                padding={{ top:20 }}
                />
              <Tooltip />
              <CartesianGrid stroke="#f5f5f5" />

              {
                currentKpisSelected.map((currentKpiSelected, i) => {
                  return <Line
                            name={currentKpiSelected + "[" + findCategory(this.props.categories, currentKpiSelected) + "]"}
                            key={shortid.generate()}
                            type="monotone"
                            dataKey={"dataKey" + i}
                            strokeWidth={strokeW}
                            stroke={strokeColors[i % strokeColors.length]}
                            />
                })
              }

              {
                 currentKpisSelected.map((currentKpiSelected, i) => {
                  const referenceLineValue = get(this.props.rKpis, '[' + currentKpiSelected + ']', "rKpiValueNotFound")
                  if (referenceLineValue !== "rKpiValueNotFound" ) {
                    return <Line
                            name={"Reference " + currentKpiSelected}
                            key={shortid.generate()}
                            type="monotone"
                            dataKey={"reference" + i}
                            stroke={"red"}/>
                  } else {
                    return <div key={i} />
                  }
                })
              }

              <Legend />
          </LineChart>
      </div>
    )}
}
