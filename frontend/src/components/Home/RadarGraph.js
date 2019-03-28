import React, { Component } from 'react'

import styles from './RadarGraph.module.css'

import { Radar, RadarChart, PolarGrid, PolarAngleAxis, Tooltip, Legend } from 'recharts'


export default class RadarGraph extends Component {

  render() {
    return (
        <div>
            <RadarChart
              cx={this.props.chartSize*0.5*1.2}
              cy={this.props.chartSize*0.5}
              outerRadius={this.props.chartSize*0.3}
              width={this.props.chartSize*1.2}
              height={this.props.chartSize}
              data={this.props.currentKpisSelected.map(selectKpi => this.props.cKpis.find(cKpi => cKpi.name === selectKpi))}
            >
                <PolarGrid />
                <PolarAngleAxis dataKey="name" />
                <Radar name="Calculated" dataKey="score" stroke="#e034de" fill="#f145ef" fillOpacity={0.6} />
                <Tooltip />
                <Legend />
            </RadarChart>
        </div>
    );
  }
}
