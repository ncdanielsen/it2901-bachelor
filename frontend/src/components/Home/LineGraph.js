import React, { Component } from 'react'
import { connect } from 'react-redux'

import styles from './LineGraph.module.css'
import { LineChart, XAxis, Tooltip, CartesianGrid, Line, Brush } from 'recharts'


export default class LineGraph extends Component {

    constructor(props) {
        super(props);
      }


    render() {
        return (
        <div>
            <LineChart width={this.props.chartSize} height={this.props.chartSize} data={this.props.data}>
                <XAxis dataKey="name"/>
                <Tooltip/>
                <CartesianGrid stroke="#f5f5f5" />
                <Line type="monotone" dataKey="uv" stroke="#ff7300" yAxisId={0} />
                <Line type="monotone" dataKey="pv" stroke="#387908" yAxisId={1} />
                <Brush />
            </LineChart>
        </div> 
        )}
} 