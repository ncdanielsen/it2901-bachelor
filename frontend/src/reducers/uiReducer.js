import * as types from '../actionTypes/uiReducerTypes'

import { get, has, set } from 'lodash'
import moment from 'moment'

const currentInput_rKpi = { // default values in form when creating new rKpi
  name: "",
  created: new Date(),
  lastUpdated: new Date(),
  owner: "Private",
  description: "",
  values: [
    {name: "Energy need", value: 0},
    {name: "Energy use", value: 0},
    {name: "Energy generation", value: 0},
    {name: "Delivered energy", value: 0},
    {name: "Exported energy", value: 0},
    {name: "Self consumption", value: 0},
    {name: "Self generation", value: 0},
  ]
}

const initialState = {
  showSideMenu: true,
  currentInputView: "none", // possible values: none || new_rKpi || edit_rKpi
  chartType: "Radar",
  currentInput_rKpi: {...currentInput_rKpi, ...{}},
  currentInput_cKpi: {},
  fromDateTime: moment(new Date().getTime()), 
  toDateTime: moment(new Date().getTime())
}

export default function uiReducer(state = initialState, action) {
  switch (action.type) {
    case types.UPDATE_SELECTED_FROM_DATETIME:
      return {...state, fromDateTime: get(action.payload, 'fromDateTime', moment(new Date().getTime()))}
    case types.UPDATE_SELECTED_TO_DATETIME:
      return {...state, toDateTime: get(action.payload, 'toDateTime', moment(new Date().getTime()))}
    case types.UPDATE_SHOW_SIDE_MENU:
      return {...state, showSideMenu: get(action.payload, 'showSideMenu', true)}
    case types.UPDATE_CHART_TYPE:
      return {...state, chartType: get(action.payload, 'chartType', "Radar")}
    case types.UPDATE_R_KPI_INPUT_VALUE:
      let newState = {...state, ...{}}
      const keyName = get(action.payload, 'keyName', "")
      const newValue = get(action.payload, 'newValue', "")
      if (has(newState.currentInput_rKpi, keyName)) {
        set(newState.currentInput_rKpi, keyName, newValue)
      } else {
        const keyNameIndexInValuesList = newState.currentInput_rKpi.values.findIndex(rKpi => rKpi.name === keyName)
        if (keyNameIndexInValuesList !== -1) {
          set(newState.currentInput_rKpi, 'values[' + keyNameIndexInValuesList + '].value', newValue)
        }
      }
      return newState
    case types.SET_EMPTY_R_KPI:
      return {...state, currentInput_rKpi: {...currentInput_rKpi, ...{}}}
    case types.SET_CURRENT_INPUT_R_KPI:
      return {...state, currentInput_rKpi: get(action.payload, 'rKpiSet', {...currentInput_rKpi, ...{}})}
    case types.UPDATE_CURRENT_INPUT_VIEW:
      return {...state, currentInputView: get(action.payload, 'currentInputView', false)}
    default:
      return state
  }
}
