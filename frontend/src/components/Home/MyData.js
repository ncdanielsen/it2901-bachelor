import React, { Component } from 'react'
import { connect } from 'react-redux'

import styles from './MyData.module.css'

import { replace } from 'connected-react-router'

import moment from 'moment'

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
    replace: (url) => dispatch(replace(url))
  }
}

class MyData extends Component {

  close = () => this.props.replace("/")

  viewBuildingDetails = kpiSetName => console.log("viewBuildingDetails, kpiSetName:", kpiSetName)
  editKpiSet = kpiSetName => console.log("editKpiSet, kpiSetName:", kpiSetName)
  selectKpiSet = kpiSetName => console.log("selectKpiSet, kpiSetName:", kpiSetName)

  render() {
    return (
      <div className={styles.myDataContainer}>
        <div onClick={this.close} className={styles.closeButtonMyData}>X</div>
        <div className={styles.uploadButton}>Upload New</div>
        <div className={styles.orTextContainer}>
          <div className={styles.separationLine} />
          <div className={styles.orText}>or choose from<br/>existing sets of calculated KPIs</div>
        </div>
        <div className={styles.kpiSets}>
          {this.props.kpiSets.map((kpiSet, index) => (
            <div key={index} className={styles.kpiSet}>
              <div className={styles.kpiSection}>
                <div className={styles.kpiNameLabel}>Name</div>
                <div className={styles.kpiName}>{kpiSet.name}</div>
                <div className={styles.kpiDates}>
                  <div>
                    Created: {moment(kpiSet.created).format('DD.MM.YY')}
                  </div>
                  <div>
                    Last updated: {moment(kpiSet.lastUpdated).format('DD.MM.YY')}
                  </div>
                </div>
              </div>
              <div className={styles.kpiSection}>
                <div className={styles.kpiNameLabel}>Building</div>
                <div className={styles.kpiName}>{kpiSet.building.name}</div>
                <div onClick={() => this.viewBuildingDetails(kpiSet.name)} className={styles.viewDetailsButton}>
                  View Details
                </div>
              </div>
              <div className={styles.kpiButtonSection}>
                <div className={styles.kpiOptionTop}>
                  <div onClick={() => this.editKpiSet(kpiSet.name)} className={styles.editButton}>
                    Edit
                  </div>
                </div>
                <div onClick={() => this.selectKpiSet(kpiSet.name)} className={styles.kpiOptionBottom}>
                  <div className={styles.selectButton}>
                    Select
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyData)
