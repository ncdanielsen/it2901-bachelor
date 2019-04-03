import React, { Component } from 'react'
import { connect } from 'react-redux'
import { replace } from 'connected-react-router'

import { updateCurrent_rKpiName } from '../../actions/serverReducerActions'
import { setEmtpy_rKpi, updateShowInputView } from '../../actions/uiReducerActions'

import styles from './RefData.module.css'

import KpiSetInputView from './KpiSetInputView'
import UploadNewKpiSet from './UploadNewKpiSet'
import KpiSetListItem from './KpiSetListItem'

function mapStateToProps(state) {
  return {
    // mock data at the moment, should come from the server
    current_rKpiName: state.serverReducer.current_rKpiName,
    kpiSets: state.serverReducer.rKpiSets,
    showSideMenu: state.uiReducer.showSideMenu,
    showInputView: state.uiReducer.showInputView
  }
}

function mapDispatchToProps(dispatch) {
  return {
    replace: (url) => dispatch(replace(url)),
    updateCurrent_rKpiName: name => dispatch(updateCurrent_rKpiName(name)),
    setEmtpy_rKpi: () => dispatch(setEmtpy_rKpi()),
    updateShowInputView: showInputView => dispatch(updateShowInputView(showInputView))
  }
}

class RefData extends Component {

  editKpiSet = kpiSetName => {
    console.log("editKpiSet, kpiSetName:", kpiSetName)
    this.uploadNew_rKpiSet()
  }

  selectKpiSet = kpiSetName => {
    console.log("selectKpiSet, kpiSetName:", kpiSetName)
    this.props.updateCurrent_rKpiName(kpiSetName)
  }

  uploadNew_rKpiSet = () => {
    this.props.setEmtpy_rKpi()
    this.props.updateShowInputView(true)
  }

  hideInputView = () => this.props.updateShowInputView(false)

  render() {
    return (
      <div className={styles.refDataContainer + (this.props.showSideMenu ? "" : (" " + styles.refDataContainerFullScreen))}>
        <div className={this.props.showInputView ? styles.overflowHidden : ""}>
          <UploadNewKpiSet text="existing sets of reference KPIs" uploadNew={this.uploadNew_rKpiSet} />
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
        {
          this.props.showInputView && <div className={styles.inputViewContainer}>
            <div className={styles.darkBg} onClick={this.hideInputView} />
            <KpiSetInputView type="new_rKpi" />
            <div className={styles.smallPaddingBottom} />
          </div>
        }
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RefData)
