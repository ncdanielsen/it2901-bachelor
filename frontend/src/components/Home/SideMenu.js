import React, { Component } from "react";
import { connect } from "react-redux";

import styles from "./SideMenu.module.css";

import { kpiCategories } from "../../data/data"; // will be replaced with data from server

import { updateGraphIndex } from "../../actions/graphReducerActions";
import { getKpiList } from "../../actions/serverReducerActions";

import { push, replace } from "connected-react-router";

import DataSource from "./DataSource.js";
import KpiCategory from "./KpiCategory.js";

function mapStateToProps(state) {
  /* the path props are used to figure out where the user is,
     which is needed to determine whether to go to or from the graph view
     when clicking on myData and refData in this SideMenu */
  const currentPath = state.router.location.pathname;
  const currentPathSplitted = currentPath.split("/");
  const currentPathEnd = currentPathSplitted[currentPathSplitted.length - 1];
  const isMyDataPath = currentPathEnd === "myData";
  const isRefDataPath = currentPathEnd === "refData";
  return {
    graphIndex: state.graphReducer.graphIndex,
    numberOfDataSets: state.graphReducer.numberOfDataSets,
    isMyDataPath,
    isRefDataPath
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateGraphIndex: graphIndex => dispatch(updateGraphIndex(graphIndex)),
    push: url => dispatch(push(url)),
    replace: url => dispatch(replace(url)),
    getKpiList: () => dispatch(getKpiList())
  };
}

class SideMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // might wanna move this state into a reducer at some point
      openKpiCategory: 0 // currently only one category of KPIs can be open in the menu simultaneously
    };
  }

  componentDidMount() {
    this.props.getKpiList();
  }

  // open category if closed, close if open
  openCategory = index =>
    this.setState({
      openKpiCategory: index === this.state.openKpiCategory ? -1 : index
    });

  // temprorary implementation of updateChosenKpiInCategory. To be changed.
  updateChosenKpiInCategory = i =>
    this.props.updateGraphIndex(Math.min(this.props.numberOfDataSets - 1, i));

  // open or close myData and refData
  goTo = path => {
    if (
      (path === "myData" && this.props.isMyDataPath) ||
      (path === "refData" && this.props.isRefDataPath)
    ) {
      this.props.replace("/home/");
    } else {
      this.props.push(path);
    }
  };

  render() {
    return (
      <div className={styles.SideMenuContainer}>
        <DataSource
          title="My Data Source"
          nameOfChosenSource="My_new_building_1"
          select={() => this.goTo("myData")}
          isActive={this.props.isMyDataPath}
        />
        <DataSource
          title="Comparison Data"
          nameOfChosenSource="Perleporten"
          select={() => this.goTo("refData")}
          isActive={this.props.isRefDataPath}
        />

        <div className={styles.kpiContainer}>
          <div className={styles.buttonTitle + " " + styles.kpiTitle}>KPI</div>
          <div className={styles.kpiContent}>
            {kpiCategories.map((category, i) => (
              <KpiCategory
                key={i}
                category={category}
                categoryIsSelected={this.state.openKpiCategory === i}
                selectCategory={() => this.openCategory(i)}
                graphIndex={this.props.graphIndex}
                selectKpi={this.updateChosenKpiInCategory}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SideMenu);
