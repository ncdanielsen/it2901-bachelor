import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
  updateCurrentInputViewMyData,
  updateCurrentInputViewRefData,
  setEmtpy_rKpi,
  update_rKpiInputValue,
  setEmtpy_cKpi,
  update_cKpiInputValue,
  insertNew_cKpiValues
} from '../../actions/uiReducerActions'
import {
  saveUpdated_rKpiSet,
  saveUpdated_cKpiSet,
  delete_rKpiSet,
  delete_cKpiSet,
  updateCurrent_rKpiName,
  updateCurrent_cKpiName
} from '../../actions/serverReducerActions' // uncomment when server is ready

import { get } from 'lodash'

import styles from './KpiSetInputView.module.css'

function mapStateToProps(state, ownProps) {
  const currentInputView = ownProps.type === "myData" ? state.uiReducer.currentInputViewMyData : state.uiReducer.currentInputViewRefData
  if (currentInputView === "new_rKpi") {
    const currentInputKpi = state.uiReducer.currentInput_rKpi
    const inputs = [
      {name: "Name", type: "text"},
      {name: "Description", type: "textarea"},
      //{name: "Owner", type: "text"}
    ]
    return {
      currentInputView,
      title: "Create New Reference KPI Set",
      inputs,
      currentInputKpi,
      kpiCategories: state.serverReducer.kpiCategories,
      buttons: ["cancel", "create"]
    }
  } else if (currentInputView === "edit_rKpi") {
    const currentInputKpi = state.uiReducer.currentInput_rKpi
    const inputs = [
      {name: "Name", type: "text"},
      {name: "Description", type: "textarea"},
      //{name: "Owner", type: "text"}
    ]
    return {
      currentInputView,
      title: "Edit Reference KPI Set",
      inputs,
      currentInputKpi,
      current_rKpiName: state.serverReducer.current_rKpiName,
      kpiCategories: state.serverReducer.kpiCategories,
      buttons: ["delete", "cancel", "save"]
    }
  } else if (currentInputView === "new_cKpi") {
    const currentInputKpi = state.uiReducer.currentInput_cKpi
    const inputs = [
      {name: "Name", type: "text"},
      {name: "Description", type: "textarea"},
      //{name: "Owner", type: "text"}
    ]
    return {
      currentInputView,
      title: "Create New Calculated KPI Set",
      inputs,
      currentInputKpi,
      kpiCategories: {},
      buttons: ["cancel", "create"]
    }
  } else if (currentInputView === "edit_cKpi") {
    const currentInputKpi = state.uiReducer.currentInput_cKpi
    const inputs = [
      {name: "Name", type: "text"},
      {name: "Description", type: "textarea"},
      //{name: "Owner", type: "text"}
    ]
    return {
      currentInputView,
      title: "Edit Calculated KPI Set",
      inputs,
      currentInputKpi,
      current_cKpiName: state.serverReducer.current_cKpiName,
      kpiCategories: {},
      buttons: ["delete", "cancel", "save"]
    }
  } else {
    return { // shouldn't happen
      currentInputView,
      title: "Unknown KPI set",
      inputs: [],
      kpiCategories: [],
      buttons: ["cancel"]
    }
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateKpiInputValue: (keyName, newValue, currentInputView) => {
      if (currentInputView === "new_rKpi" || currentInputView === "edit_rKpi") {
        dispatch(update_rKpiInputValue(keyName, newValue))
      } else if (currentInputView === "new_cKpi" || currentInputView === "edit_cKpi") {
        dispatch(update_cKpiInputValue(keyName, newValue))
      }
    },
    setEmtpy_rKpi: () => dispatch(setEmtpy_rKpi()),
    setEmtpy_cKpi: () => dispatch(setEmtpy_cKpi()),
    updateCurrentInputViewMyData: currentInputView => dispatch(updateCurrentInputViewMyData(currentInputView)),
    updateCurrentInputViewRefData: currentInputView => dispatch(updateCurrentInputViewRefData(currentInputView)),
    createNew_rKpiSet: (new_rKpiSet) => {
      console.log("new_rKpiSet", new_rKpiSet)
      dispatch(saveUpdated_rKpiSet(new_rKpiSet, false))
    },
    createNew_cKpiSet: (new_cKpiSet) => {
      console.log("new_cKpiSet", new_cKpiSet)
      dispatch(saveUpdated_cKpiSet(new_cKpiSet, false))
    },
    saveUpdated_rKpiSet: (updated_rKpiSet) => {
      console.log("saveUpdated_rKpiSet", updated_rKpiSet)
      dispatch(saveUpdated_rKpiSet(updated_rKpiSet, true))
    },
    saveUpdated_cKpiSet: (updated_cKpiSet) => {
      console.log("saveUpdated_cKpiSet", updated_cKpiSet)
      dispatch(saveUpdated_cKpiSet(updated_cKpiSet, true))
    },
    insertNew_cKpiValues: values => dispatch(insertNew_cKpiValues(values)),
    delete_rKpiSet: id => {
      if (id) dispatch(delete_rKpiSet(id))
    },
    delete_cKpiSet: id => {
      if (id) dispatch(delete_cKpiSet(id))
    },
    updateCurrent_rKpiName: name => dispatch(updateCurrent_rKpiName(name)),
    updateCurrent_cKpiName: name => dispatch(updateCurrent_cKpiName(name)),
  }
}

class KpiSetInputView extends Component {

  componentWillUnmount() {
    this.props.setEmtpy_rKpi()
    this.props.setEmtpy_cKpi()
  }

  cancel = () => {
    if (this.props.currentInputView === "new_rKpi" || this.props.currentInputView === "edit_rKpi") {
      this.props.updateCurrentInputViewRefData("none")
    } else if (this.props.currentInputView === "new_cKpi" || this.props.currentInputView === "edit_cKpi") {
      this.props.updateCurrentInputViewMyData("none")
    }
  }

  create = () => {
    if (this.props.currentInputView === "new_rKpi") {
      this.props.createNew_rKpiSet(this.props.currentInputKpi)
      this.props.updateCurrentInputViewRefData("none")
    } else if (this.props.currentInputView === "new_cKpi") {
      this.props.createNew_cKpiSet(this.props.currentInputKpi)
      this.props.updateCurrentInputViewMyData("none")
    }

  }

  save = () => {
    if (this.props.currentInputView === "edit_rKpi") {
      this.props.saveUpdated_rKpiSet(this.props.currentInputKpi)
      this.props.updateCurrentInputViewRefData("none")
    } else if (this.props.currentInputView === "edit_cKpi") {
      this.props.saveUpdated_cKpiSet(this.props.currentInputKpi)
      this.props.updateCurrentInputViewMyData("none")
    }
  }

  delete = () => {
    if (this.props.currentInputView === "edit_rKpi") {
      if (this.props.current_rKpiName === get(this.props, 'currentInputKpi.name', "")) {
        this.props.updateCurrent_rKpiName("")
      }
      this.props.delete_rKpiSet(get(this.props, 'currentInputKpi._id', false))
      this.props.updateCurrentInputViewRefData("none")
    } else if (this.props.currentInputView === "edit_cKpi") {
      if (this.props.current_cKpiName === get(this.props, 'currentInputKpi.name', "")) {
        this.props.updateCurrent_cKpiName("")
      }
      this.props.delete_cKpiSet(get(this.props, 'currentInputKpi._id', false))
      this.props.updateCurrentInputViewMyData("none")
    }
  }

  uploadOnChange = (e) => {
    const file = get(e, 'target.files[0]', "")
    let fr = new FileReader()
    fr.onload = this.receivedText
    fr.readAsText(file)
  }

  receivedText = (e) => {
    const values = JSON.parse(get(e, "target.result", "[]"))
    this.props.insertNew_cKpiValues(values)
  }

  render() {
    return (
      <div className={styles.inputViewContainer}>
        <div className={styles.darkBg} onClick={this.cancel} />
        <div className={styles.kpiSet}>
          <div className={styles.title}>{this.props.title}</div>
          <div className={styles.separationLine} />
          <form onSubmit={e => e.preventDefault()}>
            <div className={styles.inputsContainer}>
              {
                this.props.inputs.map((input, index) => (
                  <label key={index} className={styles.label}>
                    <div className={styles.inputItem}>
                      <div className={styles.inputTitle}><b>{input.name}</b></div>
                      {(input.type === "text"/* || input.type === "number"*/) && <input 
                        id="ckpiNameInput"
                        type={input.type}
                        value={get(this.props.currentInputKpi, '[' + input.name.toLowerCase() + ']', "")}
                        onChange={(e) => this.props.updateKpiInputValue(input.name.toLowerCase(), get(e, 'target.value', ""), this.props.currentInputView)}
                        className={styles.inputField}
                      />}
                      {input.type === "textarea" && <textarea
                        id="ckpiDescInput"
                        value={get(this.props.currentInputKpi, '[' + input.name.toLowerCase() + ']', "")}
                        onChange={(e) => this.props.updateKpiInputValue(input.name.toLowerCase(), get(e, 'target.value', ""), this.props.currentInputView)}
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
                            const valueIndex = get(this.props, 'currentInputKpi.values', []).findIndex(rKpi => rKpi.name === kpi.name)
                            const value = valueIndex === -1 ? "-1" : get(this.props.currentInputKpi, "values[" + valueIndex + "].value", 0)
                            return (
                              <label key={j} className={styles.label}>
                                <div className={styles.inputItem}>
                                  <div className={styles.inputTitle}><b>{kpi.name}</b><br />{" [" + kpi.unit + "]"}</div>
                                  <input
                                    type="number"
                                    value={value}
                                    onChange={(e) => this.props.updateKpiInputValue(kpi.name, get(e, 'target.value', ""), this.props.currentInputView)}
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

              {(this.props.currentInputView === "new_cKpi" || this.props.currentInputView === "edit_cKpi") && (
                <div>
                  <div className={styles.uploadContainer}>
                    <label htmlFor="kpiSetSourceFile"><b>{this.props.currentInputView === "new_cKpi" ? "Upload new data set" : "Update data set"}</b></label>
                    <br /><br />
                    <input
                      type="file"
                      id="kpiSetSourceFile"
                      name="kpiSetSourceFile"
                      //accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                      accept=".json, application/json"
                      onChange={this.uploadOnChange}
                    />
                  </div>
                  <div className={styles.separationLine} />
                  <div className={styles.formatInstructionsContainer}>
                    JSON Format:
                    <pre>{JSON.stringify([{name: "Exact KPI Name",data: [{time: 0, value: 10}]}], null, 2) }</pre>
                  </div>
                  <div className={styles.separationLine} />
                </div>
              )}
              </div>
            </form>

          <div className={styles.buttonsContainer}>
            {
              this.props.buttons.map((button, i) => {
                if (button === "cancel") {
                  return <div id='refDataCancel' key={i} onClick={this.cancel} className={styles.button + " " + styles.cancelButton}>
                    Cancel
                  </div>
                } else if (button === "create") {
                  return <div id='refDataCreate' key={i} onClick={this.create} className={styles.button + " " + styles.saveButton}>
                    Create
                  </div>
                } else if (button === "save") {
                  return <div id='refDataSave' key={i} onClick={this.save} className={styles.button + " " + styles.saveButton}>
                    Save
                  </div>
                } else if (button === "delete") {
                  return <div id='refDataDelete' key={i} onClick={this.delete} className={styles.button + " " + styles.deleteButton}>
                    Delete
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
