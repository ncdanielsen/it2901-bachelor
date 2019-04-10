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

const data = () => ([{time:0,value:Math.random()*100},{time:1,value:Math.random()*100},{time:2,value:Math.random()*100}])

const currentInput_cKpi = {
  name: "",
  created: new Date(),
  lastUpdated: new Date(),
  owner: "Private",
  description: "",
  values: [
    {name: "Energy need", score: 1, full: 100, data: data()},
    {name: "Energy use", score: 1, full: 100, data: data()},
    {name: "Energy generation", score: 1, full: 100, data: data()},
    {name: "Delivered energy", score: 1, full: 100, data: data()},
    {name: "Exported energy", score: 1, full: 100, data: data()},
    {name: "Self consumption", score: 1, full: 100, data: data()},
    {name: "Self generation", score: 1, full: 100, data: data()},
  ]
}

const initialState = {
  showSideMenu: true,
  currentInputViewMyData: "none", // possible values: none || new_cKpi || edit_cKpi
  currentInputViewRefData: "none", // possible values: none || new_rKpi || edit_rKpi
  chartType: "Radar",
  currentInput_rKpi: {...currentInput_rKpi, ...{}},
  currentInput_cKpi: {...currentInput_cKpi, ...{}}
}

export default function uiReducer(state = initialState, action) {
  let newState, keyName, newValue
  switch (action.type) {
    case types.UPDATE_SHOW_SIDE_MENU:
      return {...state, showSideMenu: get(action.payload, 'showSideMenu', true)}
    case types.UPDATE_CHART_TYPE:
      return {...state, chartType: get(action.payload, 'chartType', "Radar")}
    case types.UPDATE_R_KPI_INPUT_VALUE:
      newState = {...state, ...{}}
      keyName = get(action.payload, 'keyName', "")
      newValue = get(action.payload, 'newValue', "")
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
    case types.UPDATE_CURRENT_INPUT_VIEW_MY_DATA:
      return {...state, currentInputViewMyData: get(action.payload, 'currentInputView', false)}
    case types.UPDATE_CURRENT_INPUT_VIEW_REF_DATA:
      return {...state, currentInputViewRefData: get(action.payload, 'currentInputView', false)}
    case types.SET_EMPTY_C_KPI:
      return {...state, currentInput_cKpi: {...currentInput_cKpi, ...{}}}
    case types.SET_CURRENT_INPUT_C_KPI:
      return {...state, currentInput_cKpi: get(action.payload, 'cKpiSet', {...currentInput_cKpi, ...{}})}
    case types.UPDATE_C_KPI_INPUT_VALUE:
      newState = {...state, ...{}}
      keyName = get(action.payload, 'keyName', "")
      newValue = get(action.payload, 'newValue', "")
      if (has(newState.currentInput_cKpi, keyName)) {
        set(newState.currentInput_cKpi, keyName, newValue)
      }
      return newState
    case types.INSERT_NEW_C_KPI_VALUES:
      newState = {...state, ...{}}
      const cKPIs = get(action.payload, 'cKPIs', [])
      cKPIs.forEach(cKpi => {
        const kpiName = get(cKpi, 'name', "")
        const newData = get(cKpi, 'data', "")
        const keyNameIndexInValuesList = newState.currentInput_cKpi.values.findIndex(cKpi => cKpi.name === kpiName)
        if (keyNameIndexInValuesList !== -1) {
          set(newState.currentInput_cKpi, 'values[' + keyNameIndexInValuesList + '].data', newData)
        }
      })
      return newState
    default:
      return state
  }
}
