import React, { Component } from 'react'
import { connect } from 'react-redux'
import { replace } from 'connected-react-router'

import { updateCurrent_rKpiName } from '../../actions/serverReducerActions'

import styles from './RefData.module.css'


import UploadNewKpiSet from './UploadNewKpiSet'
import KpiSetListItem from './KpiSetListItem'

function mapStateToProps(state) {
  return {
    // mock data at the moment, should come from the server
    current_rKpiName: state.serverReducer.current_rKpiName,
    kpiSets: [
      {
        name: "Some name",
        created: new Date(),
        lastUpdated: new Date(),
        owner: "Private",
        description: "A set of KPIs for buildings built before 1980 and in a temperated location."
      },
      {
        name: "Another name",
        created: new Date(),
        lastUpdated: new Date(),
        owner: "Shared",
        description: "Anothe nice and useful set of KPIs."
      }
    ]
  }
}

function mapDispatchToProps(dispatch) {
  return {
    replace: (url) => dispatch(replace(url)),
    updateCurrent_rKpiName: name => dispatch(updateCurrent_rKpiName(name))
  }
}

class RefData extends Component {

  editKpiSet = kpiSetName => console.log("editKpiSet, kpiSetName:", kpiSetName)

  selectKpiSet = kpiSetName => {
    console.log("selectKpiSet, kpiSetName:", kpiSetName)
    this.props.updateCurrent_rKpiName(kpiSetName)
  }

  render() {
    return (
      <div className={styles.refDataContainer}>
        <UploadNewKpiSet text="existing sets of reference KPIs" />
        <div className={styles.kpiSets}>
          {this.props.kpiSets.map((kpiSet, index) => (
            <KpiSetListItem
              key={index}
              kpiSetIsSelected={kpiSet.name === this.props.current_rKpiName}
              isCalculatedKpi={false}
              showOwner={true}
              kpiSet={kpiSet}
              description={kpiSet.description}
              editKpiSet={() => this.editKpiSet(kpiSet.name)}
              selectKpiSet={() => this.selectKpiSet(kpiSet.name)}
            />
          ))}
        </div>
        <div className={styles.paddingBottom} />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RefData)
