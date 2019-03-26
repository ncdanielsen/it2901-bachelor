import React, { Component } from 'react'
import { connect } from 'react-redux'

import styles from './RadarGraph.module.css'

import { Radar, RadarChart, PolarGrid, PolarAngleAxis } from 'recharts'


export default class RadarGraph extends Component {

    constructor(props) {
        super(props);
      }

    render() {
        return (
            <div>
                <RadarChart cx={this.props.chartSize*0.5*1.2} cy={this.props.chartSize*0.5} outerRadius={this.props.chartSize*0.3} 
                            width={this.props.chartSize*1.2} height={this.props.chartSize} data={this.props.data}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <Radar name="Andy" dataKey="B" stroke="#e034de" fill="#f145ef" fillOpacity={0.6} />
                    <Radar name="Mike" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                </RadarChart>
            </div>
        );
    }
}