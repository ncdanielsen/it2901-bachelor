import React, { Component } from 'react'
import { connect } from 'react-redux'

import { updateR_KpiInputValue, setEmtpy_rKpi, updateCurrentInputView } from '../../actions/uiReducerActions'
//import { saveUpdated_rKpiSet } from '../../actions/serverReducerActions' // uncomment when server is ready

import { get } from 'lodash'

import styles from './KpiSetInputView.module.css'

function mapStateToProps(state, ownProps) {
  const currentInputView = state.uiReducer.currentInputView
  if (currentInputView === "new_rKpi") {
    const currentInput_rKpi = state.uiReducer.currentInput_rKpi
    const inputs = [
      {name: "Name", type: "text"},
      {name: "Description", type: "textarea"},
      //{name: "Owner", type: "text"}
    ]
    return {
      title: "Create New Reference KPI Set",
      inputs,
      currentInput_rKpi,
      kpiCategories: state.serverReducer.kpiCategories,
      buttons: ["cancel", "create"]
    }
  } else if (currentInputView === "edit_rKpi") {
    const currentInput_rKpi = state.uiReducer.currentInput_rKpi
    const inputs = [
      {name: "Name", type: "text"},
      {name: "Description", type: "textarea"},
      //{name: "Owner", type: "text"}
    ]
    return {
      title: "Edit Reference KPI Set",
      inputs,
      currentInput_rKpi,
      kpiCategories: state.serverReducer.kpiCategories,
      buttons: ["cancel", "save"] // "delete"
    }
  } else {
    return {}
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateR_KpiInputValue: (keyName, newValue) => dispatch(updateR_KpiInputValue(keyName, newValue)),
    setEmtpy_rKpi: () => dispatch(setEmtpy_rKpi()),
    updateCurrentInputView: currentInputView => dispatch(updateCurrentInputView(currentInputView)),
    createNew_rKpiSet: (new_rKpiSet) => console.log("new_rKpiSet", new_rKpiSet),
    saveUpdated_rKpiSet: (updated_rKpiSet) => {
      //dispatch(saveUpdated_rKpiSet(updated_rKpiSet)) // uncomment when server is ready
      console.log("saveUpdated_rKpiSet", updated_rKpiSet)
    }
  }
}

class KpiSetInputView extends Component {

  componentWillUnmount() {
    this.props.setEmtpy_rKpi()
  }

  cancel = () => this.props.updateCurrentInputView("none")

  create = () => {
    //this.refs.form.submit()
    this.props.createNew_rKpiSet(this.props.currentInput_rKpi)
    this.props.updateCurrentInputView("none")
  }

  save = () => {
    this.props.saveUpdated_rKpiSet(this.props.currentInput_rKpi)
    this.props.updateCurrentInputView("none")
  }

  render() {
    return (
      <div className={styles.inputViewContainer}>
        <div className={styles.darkBg} onClick={this.cancel} />
        <div className={styles.kpiSet}>
          <div className={styles.title}>{this.props.title}</div>
          <div className={styles.separationLine} />
          <form ref="form">
            <div className={styles.inputsContainer}>
              {
                this.props.inputs.map((input, index) => (
                  <label key={index} className={styles.label}>
                    <div className={styles.inputItem}>
                      <div className={styles.inputTitle}><b>{input.name}</b></div>
                      {(input.type === "text"/* || input.type === "number"*/) && <input
                        type={input.type}
                        value={get(this.props.currentInput_rKpi, '[' + input.name.toLowerCase() + ']', "")}
                        onChange={(e) => this.props.updateR_KpiInputValue(input.name.toLowerCase(), get(e, 'target.value', ""))}
                        className={styles.inputField}
                      />}
                      {input.type === "textarea" && <textarea
                        value={get(this.props.currentInput_rKpi, '[' + input.name.toLowerCase() + ']', "")}
                        onChange={(e) => this.props.updateR_KpiInputValue(input.name.toLowerCase(), get(e, 'target.value', ""))}
                        className={styles.inputField + " " + styles.textarea}
                      />}
                    </div>
                  </label>
                ))
              }
            </div>
            <div className={styles.separationLine} />
            <div>
              {
                Object.keys(this.props.kpiCategories).map((kpiCategoryKey, i) => {
                  const kpiCategory = this.props.kpiCategories[kpiCategoryKey]
                  return (
                    <div key={i} className={styles.kpiCategoryContainer}>
                      <div className={styles.kpiCategoryTitle}>{kpiCategory.name}</div>
                      <div className={styles.inputsContainer}>
                        {
                          get(kpiCategory, 'kpi_names', []).map((kpi, j) => {
                            const valueIndex = this.props.currentInput_rKpi.values.findIndex(rKpi => rKpi.name === kpi.name)
                            const value = valueIndex === -1 ? "-1" : get(this.props.currentInput_rKpi, "values[" + valueIndex + "].value", 0)
                            return (
                              <label key={j} className={styles.label}>
                                <div className={styles.inputItem}>
                                  <div className={styles.inputTitle}><b>{kpi.name}</b><br />{" [" + kpi.unit + "]"}</div>
                                  <input
                                    type="number"
                                    value={value}
                                    onChange={(e) => this.props.updateR_KpiInputValue(kpi.name, get(e, 'target.value', ""))}
                                    className={styles.inputField}
                                  />
                                </div>
                              </label>
                            )
                          })
                        }
                      </div>
                      <div className={styles.separationLine} />
                    </div>
                  )
                })
              }
              </div>
            </form>

          <div className={styles.buttonsContainer}>
            {
              this.props.buttons.map((button, i) => {
                if (button === "cancel") {
                  return <div key={i} onClick={this.cancel} className={styles.button + " " + styles.cancelButton}>
                    Cancel
                  </div>
                } else if (button === "create") {
                  return <div key={i} onClick={this.create} className={styles.button + " " + styles.saveButton}>
                    Create
                  </div>
                } else if (button === "save") {
                  return <div key={i} onClick={this.save} className={styles.button + " " + styles.saveButton}>
                    Save
                  </div>
                } else {
                  return <div />
                }
              })
            }
          </div>

        </div>
        <div className={styles.smallPaddingBottom} />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(KpiSetInputView)
