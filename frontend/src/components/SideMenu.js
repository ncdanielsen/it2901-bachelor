import React, { Component } from 'react'
import { connect } from 'react-redux'

import './SideMenu.css'

import { updateGraphIndex } from '../actions/graphReducerActions'

function mapStateToProps(state) {
  return {
    graphIndex: state.graphReducer.graphIndex,
    numberOfDataSets: state.graphReducer.numberOfDataSets
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateGraphIndex: (graphIndex) => dispatch(updateGraphIndex(graphIndex))
  }
}

class SideMenu extends Component {

  render() {
    return (
      <div className="SideMenuContainer">
        {[...Array(this.props.numberOfDataSets)].map((x, i) =>
          <div
            key={i}
            className={this.props.graphIndex === i ? "Button ButtonSelected" : "Button"}
            onClick={() => this.props.updateGraphIndex(i)}
          >
            Graph {i}
          </div>
        )}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu)
