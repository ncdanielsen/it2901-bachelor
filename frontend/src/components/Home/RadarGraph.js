import React, { Component } from 'react'

import { get } from 'lodash'

//import styles from './RadarGraph.module.css'

import { Radar, RadarChart, PolarGrid, PolarAngleAxis, Tooltip, Legend } from 'recharts'


function makeData(kpis, rKpis, cKpiSet, currentKpisSelected, fromDateTime, toDateTime) {
  let data = []
  let to = toDateTime
  let from = fromDateTime
 
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

    
    //console.log(get(cKpiSet, "values", []).filter(kpi => kpi.name === data[i].name))

    // get current kpi in iteration
    let kpi = (get(cKpiSet, "values", []).filter(kpi => kpi.name === data[i].name))

    // check to see if calculated KPI data are available for currently selected KPI and datetime
    if (kpi.length !== 0) { 
      let list_values = []  
      kpi[0].data.filter(value => value.time >= from && value.time <= to)
                 .forEach(value => list_values.push(value.value))
      if (list_values.length !== 0) {
        data[i].cKPIvalue = (list_values.reduce((totValue, currValue) => totValue + currValue) / list_values.length) 
      }
      
    } else {
      data[i].cKPIvalue = 0
    }
  }

  //console.log(data)
  // {name, cKPIvalue, rKPIvalue, fullMark}
  // cKPIvalue must be aggregated from time series data
  // refverdi må alltid være større enn fullmark

  return data
}




export default class RadarGraph extends Component {

  // receives: rKpis, cKpiSet, kpis (need for labels)

  /*
    currentKpisSelected={this.props.currentKpisSelected}
    rKpis={this.props.rKpis} 
    cKpiSet={this.props.current_cKpiSet}
    kpis={this.props.kpis}
  */ 

  // data --> must containt label(kpi-metadata), rKPI-value and cKPI-value
  // {name, score, full, data: []}

  

  render() {
    
    console.log(this.props.fromDateTime.format())
    let graphData = makeData(this.props.kpis, this.props.rKpis, this.props.cKpiSet, this.props.currentKpisSelected, this.props.fromDateTime, this.props.toDateTime)

    return (
        
        <div>
            <RadarChart
              cx={this.props.chartSize*0.5*1.2}
              cy={this.props.chartSize*0.5}
              outerRadius={this.props.chartSize*0.3}
              width={this.props.chartSize*1.2}
              height={this.props.chartSize}
              /*data={this.props.currentKpisSelected.map(selectKpi => get(this.props, 'cKpiSet.values', []).find(kpi => kpi.name === selectKpi))}*/
              data={graphData}
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
