import React, { Component } from 'react'
import { connect } from 'react-redux'
import { replace } from 'connected-react-router'

import { updateCurrent_rKpiName } from '../../actions/serverReducerActions'
import { setEmtpy_rKpi, updateCurrentInputViewRefData, setCurrentInput_rKpi } from '../../actions/uiReducerActions'

import styles from './RefData.module.css'

import KpiSetInputView from './KpiSetInputView'
import UploadNewKpiSet from './UploadNewKpiSet'
import KpiSetListItem from './KpiSetListItem'

/*
  This component shows an overview of the existing rKpiSets and a button for creating a new rKpiSet.
  It also contains an instance of the KpiSetInputView component, which is another smart component.
  Note: Currently there are only minor differences between MyData and RefData,
  and they could probably be turned into just one component. However, differences are expected to increase.
*/

function mapStateToProps(state) {
  return {
    current_rKpiName: state.serverReducer.current_rKpiName,
    rKpiSets: state.serverReducer.rKpiSets,
    currentInputViewRefData: state.uiReducer.currentInputViewRefData
  }
}

function mapDispatchToProps(dispatch) {
  return {
    replace: (url) => dispatch(replace(url)),
    updateCurrent_rKpiName: name => dispatch(updateCurrent_rKpiName(name)),
    setEmtpy_rKpi: () => dispatch(setEmtpy_rKpi()),
    updateCurrentInputViewRefData: currentInputView => dispatch(updateCurrentInputViewRefData(currentInputView)),
    setCurrentInput_rKpi: rKpiSet => dispatch(setCurrentInput_rKpi(rKpiSet))
  }
}

class RefData extends Component {

  uploadNew_rKpiSet = () => {
    this.props.setEmtpy_rKpi() // update the state to be ready for fresh input
    this.props.updateCurrentInputViewRefData("new_rKpi") // activates input view
  }

  editKpiSet = kpiSetName => {
    // make sure there exists an rKpiSet with kpiSetName
    const kpiSetIndex = this.props.rKpiSets.findIndex(rKpiSet => rKpiSet._id === kpiSetName)
    if (kpiSetIndex !== -1) {
      // inserts copy of the rKpiSet in the reducer which can be edited without touching the original
      this.props.setCurrentInput_rKpi(this.props.rKpiSets[kpiSetIndex])
      this.props.updateCurrentInputViewRefData("edit_rKpi")
    }
  }

  selectKpiSet = kpiSetName => this.props.updateCurrent_rKpiName(kpiSetName)

  render() {
    return (
      <div className={styles.refDataContainer}>
        <div className={this.props.currentInputViewRefData !== "none" ? styles.overflowHidden : ""}>
          <UploadNewKpiSet text="existing sets of reference KPIs" uploadNew={this.uploadNew_rKpiSet} />
          <div className={styles.kpiSets}>
            {this.props.rKpiSets.map((kpiSet, index) => (
              <KpiSetListItem
                key={index}
                kpiSetIsSelected={kpiSet._id === this.props.current_rKpiName}
                isCalculatedKpi={false}
                showOwner={true}
                kpiSet={kpiSet}
                editKpiSet={() => this.editKpiSet(kpiSet._id)}
                selectKpiSet={() => this.selectKpiSet(kpiSet._id)}
              />
            ))}
          </div>
          <div className={styles.paddingBottom} />
        </div>
        {this.props.currentInputViewRefData !== "none" && <KpiSetInputView type="refData" />}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RefData)
