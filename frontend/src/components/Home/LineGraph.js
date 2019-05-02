import React, { Component } from "react"

import shortid from 'shortid' // for generating unique ids 

import moment from 'moment'
import { get } from 'lodash'

//import styles from './LineGraph.module.css'
import { LineChart, XAxis, YAxis, Legend, ReferenceLine, Tooltip, CartesianGrid, Line } from 'recharts'


const strokeColors = ["#3B5EB0", "#44B03B", "#A93BB0", "#3BAEB0", "#B06D3B"]


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

  constructor(props) {
    super(props)
    this.state = {
      strokeW: 2
    }
  }

  updateStroke = (width) => {
    this.setState({strokeW: this.state.strokeW + width})
  }

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
      const referenceLineValue = get(this.props.rKpis, '[' + currentKpiSelected + ']', "rKpiValueNotFound")

      let dataIndex = 0 // index for dataitems as they are added to the data list

      current_cKpiData.forEach((current_cKpiDataPoint, index) => {

        // check for data within the selected timeframe
        if (current_cKpiDataPoint["time"] >= this.props.fromDateTime.unix() && current_cKpiDataPoint["time"] <= this.props.toDateTime.unix()) {

          if (i === 0) { // only gets time from the first selected kpi, assume all KPIs have the same times
            let timeValue = {time: moment.unix(current_cKpiDataPoint["time"]).format("Do MMM YY")}
            data.push(timeValue)
          }

          data[dataIndex]["dataKey" + i] = current_cKpiDataPoint["value"]

          if (referenceLineValue !== "rKpiValueNotFound") {
            //console.log(referenceLineValue)
            const kpiIndex = Object.keys(kpis).findIndex(kpiIndex => kpis[kpiIndex].name === currentKpiSelected)
            data[dataIndex]["reference" + i] = referenceLineValue
          }
          dataIndex += 1
        }
      })

      

    })

    //console.log(data)
 

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
                            strokeWidth={this.state.strokeW}
                            stroke={strokeColors[i % strokeColors.length]}
                            onMouseOver={() => console.log("over")}
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
                  }
                })
              }
              
              
              <Legend />

          </LineChart>
      </div>
    )}
}

