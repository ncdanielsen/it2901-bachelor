import * as types from '../actionTypes/uiReducerTypes'

import { get, has, set } from 'lodash'

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
  showInputView: false,
  chartType: "Radar",
  currentInput_rKpi,
  currentInput_cKpi: {}
}

export default function uiReducer(state = initialState, action) {
  switch (action.type) {
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
      return {...state, currentInput_rKpi}
    case types.UPDATE_SHOW_INPUT_VIEW:
      return {...state, showInputView: get(action.payload, 'showInputView', false)}
    default:
      return state
  }
}
