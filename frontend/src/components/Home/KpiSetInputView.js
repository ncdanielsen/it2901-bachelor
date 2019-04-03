import React, { Component } from 'react'
import { connect } from 'react-redux'

import { updateR_KpiInputValue, setEmtpy_rKpi, updateShowInputView } from '../../actions/uiReducerActions'

import { get, has } from 'lodash'

import styles from './KpiSetInputView.module.css'

function mapStateToProps(state, ownProps) {
  if (ownProps.type === "new_rKpi") {
    const currentInput_rKpi = state.uiReducer.currentInput_rKpi
    const inputs = [
      {name: "Name", type: "text"},
      {name: "Description", type: "textarea"},
      //{name: "Owner", type: "text"}
    ]
    /*inputs.forEach((input, i) => { // find values for each input name
      if (has(currentInput_rKpi, input.name)) {
        inputs[i]["value"] = currentInput_rKpi[input.name]
      }
    })*/

    /*
    const valueIndex = currentInput_rKpi.values.findIndex(rKpi => rKpi.name === input.name)
    if (valueIndex !== -1) {
      inputs[i]["value"] = get(currentInput_rKpi, "values[" + valueIndex + "].value", 0)
    }
    */

    return {
      title: "Create New Reference KPI Set",
      inputs,
      currentInput_rKpi,
      kpiCategories: state.serverReducer.kpiCategories
    }
  } else {
    return {}
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateR_KpiInputValue: (keyName, newValue) => dispatch(updateR_KpiInputValue(keyName, newValue)),
    setEmtpy_rKpi: () => dispatch(setEmtpy_rKpi()),
    updateShowInputView: showInputView => dispatch(updateShowInputView(showInputView)),
    createNew_rKpiSet: (new_rKpiSet) => console.log("new_rKpiSet", new_rKpiSet)
  }
}

class KpiSetInputView extends Component {

  componentWillUnmount() {
    this.props.setEmtpy_rKpi()
  }

  cancel = () => {
    this.props.updateShowInputView(false)
  }

  create = () => {
    //this.refs.form.submit()
    this.props.createNew_rKpiSet(this.props.currentInput_rKpi)
    this.props.updateShowInputView(false)
  }

  render() {
    return (
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
                      value={get(this.props.currentInput_rKpi, '[' + input.name + ']', "")}
                      onChange={(e) => this.props.updateR_KpiInputValue(input.name, e)}
                      className={styles.inputField}
                    />}
                    {input.type === "textarea" && <textarea
                      value={input.value}
                      onChange={(e) => this.props.updateR_KpiInputValue(input.name, e)}
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
          <div onClick={this.cancel} className={styles.button + " " + styles.cancelButton}>
            Cancel
          </div>
          <div onClick={this.create} className={styles.button + " " + styles.saveButton}>
            Create
          </div>
        </div>

      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(KpiSetInputView)
