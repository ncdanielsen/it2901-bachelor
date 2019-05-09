import React, { Component } from "react"
import { connect } from "react-redux"

import styles from "./MainView.module.css"

import { Route, Switch } from "react-router" // react-router v4

import {
  get_rKpiData,
  get_cKpiData
} from "../../actions/serverReducerActions"

import Graph from "./Graph"

import RefData from "../KpiSetsOverview/RefData"
import MyData from "../KpiSetsOverview/MyData"
import Instructions from "./Instructions"

function mapStateToProps(state) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {
    get_rKpiData: () => dispatch(get_rKpiData()),
    get_cKpiData: () => dispatch(get_cKpiData())
  }
}

class MainView extends Component {

  componentWillMount() {
    // every time the user enters this view (Home), reload rKpiData and cKpiData from server
    this.props.get_rKpiData()
    this.props.get_cKpiData()
  }

  render() {
    return (
      <Switch>
        {/* The Switch checks which route matches current pathname, it returns only that child.
            It receives pathname as prop since it is a subcomponent of ConnectedRouter.
            Only paths starting with "/home/" will work here, since "/home/*" is already decided in App.js */}
        <Route exact path="/home" component={Instructions} />
        <Route exact path="/home/refData" component={RefData} />
        <Route exact path="/home/myData" component={MyData} />
        <Route exact path="/home/graph" component={Graph} />
        <Route render={() => (<div>Unknown route</div>)} />
      </Switch>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainView)
