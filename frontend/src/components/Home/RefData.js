import React, { Component } from 'react'
import { connect } from 'react-redux'
import { replace } from 'connected-react-router'

import { updateCurrent_rKpiName } from '../../actions/serverReducerActions'
import { setEmtpy_rKpi, updateCurrentInputView, setCurrentInput_rKpi } from '../../actions/uiReducerActions'

import styles from './RefData.module.css'

import KpiSetInputView from './KpiSetInputView'
import UploadNewKpiSet from './UploadNewKpiSet'
import KpiSetListItem from './KpiSetListItem'

function mapStateToProps(state) {
  return {
    // mock data at the moment, should come from the server
    current_rKpiName: state.serverReducer.current_rKpiName,
    rKpiSets: state.serverReducer.rKpiSets,
    showSideMenu: state.uiReducer.showSideMenu,
    currentInputView: state.uiReducer.currentInputView
  }
}

function mapDispatchToProps(dispatch) {
  return {
    replace: (url) => dispatch(replace(url)),
    updateCurrent_rKpiName: name => dispatch(updateCurrent_rKpiName(name)),
    setEmtpy_rKpi: () => dispatch(setEmtpy_rKpi()),
    updateCurrentInputView: currentInputView => dispatch(updateCurrentInputView(currentInputView)),
    setCurrentInput_rKpi: rKpiSet => dispatch(setCurrentInput_rKpi(rKpiSet))
  }
}

class RefData extends Component {

  editKpiSet = kpiSetName => {
    const kpiSetIndex = this.props.rKpiSets.findIndex(rKpiSet => rKpiSet.name === kpiSetName)
    if (kpiSetIndex !== -1) {
      this.props.setCurrentInput_rKpi(this.props.rKpiSets[kpiSetIndex])
      this.props.updateCurrentInputView("edit_rKpi")
    }
  }

  selectKpiSet = kpiSetName => this.props.updateCurrent_rKpiName(kpiSetName)

  uploadNew_rKpiSet = () => {
    this.props.setEmtpy_rKpi()
    this.props.updateCurrentInputView("new_rKpi")
  }

  hideInputView = () => this.props.updateCurrentInputView("none")

  render() {
    return (
      <div className={styles.refDataContainer + (this.props.showSideMenu ? "" : (" " + styles.refDataContainerFullScreen))}>
        <div className={this.props.currentInputView !== "none" ? styles.overflowHidden : ""}>
          <UploadNewKpiSet text="existing sets of reference KPIs" uploadNew={this.uploadNew_rKpiSet} />
          <div className={styles.kpiSets}>
            {this.props.rKpiSets.map((kpiSet, index) => (
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
        {
          this.props.currentInputView !== "none" && <div className={styles.inputViewContainer}>
            <div className={styles.darkBg} onClick={this.hideInputView} />
            <KpiSetInputView type={this.props.currentInputView} />
            <div className={styles.smallPaddingBottom} />
          </div>
        }
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RefData)
