import React, { Component } from 'react'
import { connect } from 'react-redux'

import { updateCurrent_cKpiName } from '../../actions/serverReducerActions'
import {
  setEmtpy_cKpi,
  updateCurrentInputViewMyData,
  setCurrentInput_cKpi
} from '../../actions/uiReducerActions'

import styles from './MyData.module.css'

import UploadNewKpiSet from './UploadNewKpiSet'
import KpiSetListItem from './KpiSetListItem'
import KpiSetInputView from './KpiSetInputView'

/*
  This component shows an overview of the existing cKpiSets and a button for creating a new cKpiSet.
  It also contains an instance of the KpiSetInputView component, which is another smart component.
  Note: Currently there are only minor differences between MyData and RefData,
  and they could probably be turned into just one component. However, differences are expected to increase.
  Also note: viewBuildingDetails is currently not in use, but something
  similar is expected to be useful in the future. Can be removed without issues.
*/

function mapStateToProps(state) {
  return {
    current_cKpiName: state.serverReducer.current_cKpiName,
    cKpiSets: state.serverReducer.cKpiSets,
    currentInputViewMyData: state.uiReducer.currentInputViewMyData
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateCurrent_cKpiName: name => dispatch(updateCurrent_cKpiName(name)),
    updateCurrentInputViewMyData: currentInputView => dispatch(updateCurrentInputViewMyData(currentInputView)),
    setEmtpy_cKpi: () => dispatch(setEmtpy_cKpi()),
    setCurrentInput_cKpi: cKpiSet => dispatch(setCurrentInput_cKpi(cKpiSet))
  }
}

class MyData extends Component {

  //viewBuildingDetails = kpiSetName => console.log("viewBuildingDetails, kpiSetName:", kpiSetName)

  uploadNew_cKpiSet = () => {
    this.props.setEmtpy_cKpi() // update the state to be ready for fresh input
    this.props.updateCurrentInputViewMyData("new_cKpi") // activates input view
  }

  editKpiSet = kpiSetName => {
    // make sure there exists a cKpiSet with kpiSetName
    const kpiSetIndex = this.props.cKpiSets.findIndex(cKpiSet => cKpiSet._id === kpiSetName)
    if (kpiSetIndex !== -1) {
      // inserts copy of the cKpiSet in the reducer which can be edited without touching the original
      this.props.setCurrentInput_cKpi(this.props.cKpiSets[kpiSetIndex])
      this.props.updateCurrentInputViewMyData("edit_cKpi") // activates input view
    }
  }

  selectKpiSet = kpiSetName => this.props.updateCurrent_cKpiName(kpiSetName)

  render() {
    return (
      <div className={styles.myDataContainer}>
        <div className={this.props.currentInputViewMyData !== "none" ? styles.overflowHidden : ""}>
          <UploadNewKpiSet uploadNew={this.uploadNew_cKpiSet} text="existing sets of calculated KPIs" />
          <div className={styles.kpiSets}>
            {this.props.cKpiSets.map((kpiSet, index) => (
              <KpiSetListItem
                key={index}
                kpiSetIsSelected={kpiSet._id === this.props.current_cKpiName}
                isCalculatedKpi={true}
                showOwner={true}
                kpiSet={kpiSet}
                editKpiSet={() => this.editKpiSet(kpiSet._id)}
                selectKpiSet={() => this.selectKpiSet(kpiSet._id)}
                //viewBuildingDetails={() => this.viewBuildingDetails(kpiSet._id)}
              />
            ))}
          </div>
          <div className={styles.paddingBottom} />
        </div>
        {this.props.currentInputViewMyData !== "none" && <KpiSetInputView type="myData" />}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyData)
