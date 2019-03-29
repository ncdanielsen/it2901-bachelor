import React, { Component } from 'react'
import { connect } from 'react-redux'

import { updateCurrent_cKpiName } from '../../actions/serverReducerActions'

import styles from './MyData.module.css'

import { replace } from 'connected-react-router'

import UploadNewKpiSet from './UploadNewKpiSet'
import KpiSetListItem from './KpiSetListItem'

function mapStateToProps(state) {
  return {
    kpiSets: [
      {
        name: "Some name",
        building: {
          name: "Da name",
          description: "Some description"
        },
        created: new Date(),
        lastUpdated: new Date()
      }
    ]
  }
}

function mapDispatchToProps(dispatch) {
  return {
    replace: (url) => dispatch(replace(url)),
    updateCurrent_cKpiName: name => dispatch(updateCurrent_cKpiName(name))
  }
}

class MyData extends Component {

  close = () => this.props.replace("/")

  viewBuildingDetails = kpiSetName => console.log("viewBuildingDetails, kpiSetName:", kpiSetName)
  editKpiSet = kpiSetName => console.log("editKpiSet, kpiSetName:", kpiSetName)
  selectKpiSet = kpiSetName => {
    console.log("selectKpiSet, kpiSetName:", kpiSetName)
    this.props.updateCurrent_cKpiName(kpiSetName)
  }

  render() {
    return (
      <div className={styles.myDataContainer}>
        <div onClick={this.close} className={styles.closeButtonMyData}>X</div>
        <UploadNewKpiSet uploadNew={() => console.log("uploadNew")} />
        <div className={styles.kpiSets}>
          {this.props.kpiSets.map((kpiSet, index) => (
            <KpiSetListItem
              key={index}
              isCalculatedKpi={true}
              kpiSet={kpiSet}
              editKpiSet={() => this.editKpiSet(kpiSet.name)}
              selectKpiSet={() => this.selectKpiSet(kpiSet.name)}
              viewBuildingDetails={() => this.viewBuildingDetails(kpiSet.name)}
            />
          ))}
        </div>
        <div className={styles.paddingBottom} />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyData)
