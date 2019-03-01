import React, { Component } from 'react'
import { connect } from 'react-redux'

import './SideMenu.css'

import { kpiCategories } from '../data/data'

import { updateGraphIndex } from '../actions/graphReducerActions'

import { push, replace } from 'connected-react-router'

function mapStateToProps(state) {
  const currentPath = state.router.location.pathname
  const currentPathSplitted = currentPath.split("/")
  const currentPathEnd = currentPathSplitted[currentPathSplitted.length-1]
  const isMyDataPath = currentPathEnd === "myData"
  const isRefDataPath = currentPathEnd === "refData"
  return {
    graphIndex: state.graphReducer.graphIndex,
    numberOfDataSets: state.graphReducer.numberOfDataSets,
    isMyDataPath,
    isRefDataPath
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateGraphIndex: (graphIndex) => dispatch(updateGraphIndex(graphIndex)),
    push: (url) => dispatch(push(url)),
    replace: (url) => dispatch(replace(url))
  }
}

class SideMenu extends Component {

  constructor(props) {
    super(props)
    this.state = {
      openKpiCategory: 0
    }
  }

  openCategory = (index) => {
    if (index === this.state.openKpiCategory) {
      this.setState({openKpiCategory: -1})
    } else {
      this.setState({openKpiCategory: index})
    }
  }

  updateChosenKpiInCategory = (i) => {
    this.props.updateGraphIndex(Math.min(this.props.numberOfDataSets-1, i))
  }

  goTo = (path) => {
    if ((path === "myData" && this.props.isMyDataPath) || (path === "refData" && this.props.isRefDataPath))  {
      this.props.replace("/home/")
    } else {
      this.props.push(path)
    }
  }

  render() {
    return (
      <div className="SideMenuContainer">
        <div
          onClick={() => this.goTo("refData")}
          className={this.props.isRefDataPath ? "Button ButtonSelected" : "Button"}
        >
            <div>
              <div className="buttonTitle">
                Comparison Data
              </div>
              <div className="buttonContent">
                Perleporten
              </div>
            </div>
        </div>
        <div
          onClick={() => this.goTo("myData")}
          className={this.props.isMyDataPath ? "Button ButtonSelected" : "Button"}
        >
            <div>
              <div className="buttonTitle">
                My Data Source
              </div>
              <div className="buttonContent">
                My_new_building_1
              </div>
            </div>
        </div>
        <div className="kpiContainer">
            <div>
              <div className="buttonTitle kpiTitle">
                KPI
              </div>
              <div className="kpiContent">
                {kpiCategories.map((category, index) => {
                  const categoryIsSelected = this.state.openKpiCategory === index
                  return (
                    <div key={index}>
                      <div
                        className={categoryIsSelected ? "kpiCategory categorySelected" : "kpiCategory"}
                        onClick={() => this.openCategory(index)}
                      >
                        <div>{category.categoryName}</div><div>{categoryIsSelected ? "–" : "+"}</div>
                      </div>
                      {categoryIsSelected && (<div className="categorySubBox">
                        {category.kpis.map((kpi, i) => {
                          const kpiIsSelected = this.props.graphIndex === i
                          return (
                            <div
                              key={i}
                              onClick={() => this.updateChosenKpiInCategory(i)}
                              className={kpiIsSelected ? "kpi kpiIsSelected" : "kpi"}
                            >
                              {kpi.name} [{kpi.unit}]
                            </div>
                          )
                        })}
                      </div>)}
                    </div>
                  )
                })}
              </div>
            </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu)
