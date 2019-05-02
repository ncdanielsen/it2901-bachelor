import React, { Component } from 'react'

import { get } from 'lodash'

import { Radar, RadarChart, PolarGrid, PolarAngleAxis, Tooltip, Legend } from 'recharts'


function makeData(kpis, rKpis, cKpiSet, currentKpisSelected, fromDateTime, toDateTime, categories) {
  let data = []
  // need unix time here since time is stored as unix in the database
  let to = toDateTime.unix()
  let from = fromDateTime.unix()

  // filters through currently selected KPIs and adds a json object for each KPI to the data list
  Object.keys(kpis).filter(kpi => currentKpisSelected.includes(kpis[kpi].name))
                   .forEach(kpi => data.push({name: kpis[kpi].name, cKPIvalue: 0, rKPIvalue: 0, fullMark: 0}))

  // for each selected KPI add reference KPI data, fullmark and calculated KPI data if available
  for (let i = 0; i < data.length; i++) {

    // check to see if reference KPI data is available for current KPI
    if (rKpis[data[i].name] === undefined) {
      data[i].rKPIvalue = 0
    } else {
      data[i].rKPIvalue = rKpis[data[i].name]
    }

    data[i].fullMark = 8000


    // get current kpi in iteration
    let kpi = (get(cKpiSet, "values", []).filter(kpi => kpi.name === data[i].name))

    /*
    // check to see if calculated KPI data are available for currently selected KPI and datetime
    if (kpi.length !== 0) {
      let list_values = []
      kpi[0].data.filter(value => value.time >= from && value.time <= to)
                 .forEach(value => list_values.push(value.value))
      if (list_values.length !== 0) {
        data[i].cKPIvalue = (list_values.reduce((totValue, currValue) => totValue + currValue) / list_values.length)
      }
    */
    // check to see if calculated KPI data are available for currently selected KPI and datetime
    if (kpi.length !== 0) {
      let list_values = []
      get(kpi, '[0].data', []).filter(value => value.time >= from && value.time <= to)
                 .forEach(value => list_values.push(value.value))
      if (list_values.length !== 0) {
        data[i].cKPIvalue = (list_values.reduce((totValue, currValue) => totValue + currValue) / list_values.length)
      }

    } else {
      data[i].cKPIvalue = 0
    }

    // adds the category name to each selected kpi shown in graph
    for (let j = 0; j < categories.length; j++) {
      categories[j]["kpi_names"]
        .forEach(category => {
          if (category["name"] === data[i]["name"]) {
            data[i]["name"] += ("[" + categories[j]["name"] + "]")
        }
      })
    }

  }

  return data
}



export default class RadarGraph extends Component {

  render() {
    
    let graphData = makeData(this.props.kpis, this.props.rKpis, this.props.cKpiSet, this.props.currentKpisSelected, this.props.fromDateTime, this.props.toDateTime, this.props.categories)

    return (
        
        <div id='radarGraphId'>
            <RadarChart
              cx={this.props.chartSize*0.5*1.35}
              cy={this.props.chartSize*0.52}
              outerRadius={this.props.chartSize*0.38}
              width={this.props.chartSize*1.35}
              height={this.props.chartSize}
              /*data={this.props.currentKpisSelected.map(selectKpi => get(this.props, 'cKpiSet.values', []).find(kpi => kpi.name === selectKpi))}*/
              data={graphData}
              margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
            >
                <PolarGrid />
                <PolarAngleAxis dataKey="name" />
                <Radar name="Calculated KPI" dataKey="cKPIvalue" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                <Radar name="Reference KPI" dataKey="rKPIvalue" stroke="red" fill="#82ca9d" fillOpacity={0.0} />
                <Tooltip />
                <Legend />
            </RadarChart>
        </div>
    );
  }
}
