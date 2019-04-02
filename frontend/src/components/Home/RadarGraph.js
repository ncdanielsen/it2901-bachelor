import React, { Component } from 'react'

import { get } from 'lodash'

//import styles from './RadarGraph.module.css'

import { Radar, RadarChart, PolarGrid, PolarAngleAxis, Tooltip, Legend } from 'recharts'


function makeData(kpis, rKpis, cKpiSet, currentKpisSelected) {
  let data = []
 
  // filters through currently selected KPIs and adds a json object for each KPI to the data list
  Object.keys(kpis).filter(kpi => currentKpisSelected.includes(kpis[kpi].name))
                   .forEach(kpi => data.push({name: kpis[kpi].name, cKPIvalue: 0, rKPIvalue: 0, fullMark: 0}))
  

  // for each selected KPI add reference KPI data, fullmark and calculated KPI data if available
  for (let i = 0; i < data.length; i++) {
    data[i].rKPIvalue = rKpis[data[i].name]
    data[i].fullMark = 8000 //rKpis[data[i].name] + 100
    if (get(cKpiSet, "values", []).filter(kpi => kpi.name == data[i].name).length != 0) { // check to see if calculated KPI data is available
      data[i].cKPIvalue = cKpiSet.values[0].data[0]["value"]
    } else {
      data[i].cKPIvalue = 0
    }
   
  }

  {console.log(data)}
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
    
    let graphData = makeData(this.props.kpis, this.props.rKpis, this.props.cKpiSet, this.props.currentKpisSelected)

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
                <Radar name="Calculated" dataKey="cKPIvalue" stroke="#e034de" fill="#f145ef" fillOpacity={0.6} />
                <Tooltip />
                <Legend />
            </RadarChart>
        </div>
    );
  }
}
