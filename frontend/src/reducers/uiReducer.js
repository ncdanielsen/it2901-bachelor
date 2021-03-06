import * as types from '../actionTypes/uiReducerTypes'
import { LOGOUT } from '../actionTypes/serverReducerTypes'

import { get, has, set } from 'lodash'
import moment from 'moment'

const currentInput_rKpi = { // default values in form when creating new rKpi, should perhaps move this to another file?
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
    {name: "Yearly net load profile", value: 0},
    {name: "Yearly net load profile", value: 0},
    {name: "Net load duration curve", value: 0},
    {name: "Peak load", value: 0},
    {name: "Peak export", value: 0},
    {name: "Utilisation factor", value: 0},
    {name: "Daily net load profile", value: 0},
    {name: "Total gas emissions", value: 0},
    {name: "Total gas emissions pr. m^2", value: 0},
    {name: "Greenhouse gas emissions", value: 0},
    {name: "Life cycle cost", value: 0},
    {name: "Life cycle cost pr. m^2", value: 0},
    {name: "Mode of transport", value: 0},
    {name: "Access to public transport", value: 0},
    {name: "Number of services, facilities and amenities", value: 0},
    {name: "Meters from services, facilities and amenities", value: 0},
  ]
}

// the data function is used by currentInput_cKpi for default values, probably wanna change this
const data = () => ([{time:0,value:Math.random()*100},{time:1,value:Math.random()*100},{time:2,value:Math.random()*100}])

const currentInput_cKpi = { // default values in form when creating new cKpi, should perhaps move this to another file?
  name: "",
  created: new Date(),
  lastUpdated: new Date(),
  owner: "Private",
  description: "",
  values: [
    {name: "Energy need", data: data()},
    {name: "Energy use", data: data()},
    {name: "Energy generation", data: data()},
    {name: "Delivered energy", data: data()},
    {name: "Exported energy", data: data()},
    {name: "Self consumption", data: data()},
    {name: "Self generation", data: data()},
    {name: "Yearly net load profile", data: data()},
    {name: "Yearly net load profile", data: data()},
    {name: "Net load duration curve", data: data()},
    {name: "Peak load", data: data()},
    {name: "Peak export", data: data()},
    {name: "Utilisation factor", data: data()},
    {name: "Daily net load profile", data: data()},
    {name: "Total gas emissions", data: data()},
    {name: "Total gas emissions pr. m^2", data: data()},
    {name: "Greenhouse gas emissions", data: data()},
    {name: "Life cycle cost", data: data()},
    {name: "Life cycle cost pr. m^2", data: data()},
    {name: "Mode of transport", data: data()},
    {name: "Access to public transport", data: data()},
    {name: "Number of services, facilities and amenities", data: data()},
    {name: "Meters from services, facilities and amenities", data: data()}
  ]
}

const initialState = {
  showSideMenu: true,
  currentInputViewMyData: "none", // possible values: none || new_cKpi || edit_cKpi
  currentInputViewRefData: "none", // possible values: none || new_rKpi || edit_rKpi
  chartType: "Line", // possible values: Line || Radar, probably want to expand options here in the future
  currentInput_rKpi: {...currentInput_rKpi, ...{}},
  fromDateTime: moment(new Date().getTime()).subtract(7, 'days'), // set to one week before the current date
  toDateTime: moment(new Date().getTime()), // right now
  currentInput_cKpi: {...currentInput_cKpi, ...{}}
}

export default function uiReducer(state = initialState, action) {
  let newState, keyName, newValue
  switch (action.type) {
    case LOGOUT:
      return {...initialState, ...{}}
    case types.UPDATE_SELECTED_FROM_DATETIME:
      return {...state, fromDateTime: get(action.payload, 'fromDateTime', moment(new Date().getTime()))}
    case types.UPDATE_SELECTED_TO_DATETIME:
      return {...state, toDateTime: get(action.payload, 'toDateTime', moment(new Date().getTime()))}
    case types.UPDATE_SHOW_SIDE_MENU:
      return {...state, showSideMenu: get(action.payload, 'showSideMenu', true)}
    case types.UPDATE_CHART_TYPE:
      return {...state, chartType: get(action.payload, 'chartType', "Radar")}
    case types.UPDATE_R_KPI_INPUT_VALUE: // for the edit/new rKpiSet view, this is where the values are changed
      newState = {...state, ...{}}
      keyName = get(action.payload, 'keyName', "")
      newValue = get(action.payload, 'newValue', 0)
      if (has(newState.currentInput_rKpi, keyName)) { // look for the keyName on currentInput_rKpi
        set(newState.currentInput_rKpi, keyName, newValue)
      } else { // look for the keyName in currentInput_rKpi.values
        // make sure the value to be updated exists
        const keyNameIndexInValuesList = newState.currentInput_rKpi.values.findIndex(rKpi => rKpi.name === keyName)
        if (keyNameIndexInValuesList !== -1) {
          set(newState.currentInput_rKpi, 'values[' + keyNameIndexInValuesList + '].value', parseFloat(newValue))
        } // if keyName not found anywhere, do nothing. Might wanna display warning?
      }
      return newState
    case types.SET_EMPTY_R_KPI:
      return {...state, currentInput_rKpi: {...currentInput_rKpi, ...{}}}
    case types.SET_CURRENT_INPUT_R_KPI:
      /* when an rKpiSet is selected, create a copy of it for the input view,
      which can be edited without touching the original */
      return {...state, currentInput_rKpi: get(action.payload, 'rKpiSet', {...currentInput_rKpi, ...{}})}
    case types.UPDATE_CURRENT_INPUT_VIEW_MY_DATA:
      return {...state, currentInputViewMyData: get(action.payload, 'currentInputView', false)}
    case types.UPDATE_CURRENT_INPUT_VIEW_REF_DATA:
      return {...state, currentInputViewRefData: get(action.payload, 'currentInputView', false)}
    case types.SET_EMPTY_C_KPI:
      return {...state, currentInput_cKpi: {...currentInput_cKpi, ...{}}}
    case types.SET_CURRENT_INPUT_C_KPI:
      /* when a cKpiSet is selected, create a copy of it for the input view,
      which can be edited without touching the original */
      return {...state, currentInput_cKpi: get(action.payload, 'cKpiSet', {...currentInput_cKpi, ...{}})}
    case types.UPDATE_C_KPI_INPUT_VALUE:
      // update value in current copy of cKpiSet
      newState = {...state, ...{}}
      keyName = get(action.payload, 'keyName', "")
      newValue = get(action.payload, 'newValue', "")
      if (has(newState.currentInput_cKpi, keyName)) {
        set(newState.currentInput_cKpi, keyName, newValue) // update value if keyName found
      }
      return newState
    case types.INSERT_NEW_C_KPI_VALUES: // when uploading file for a cKpiSet, do this
      // Asssumes specific format as shown in the <pre> tag in KpiSetInputView
      newState = {...state, ...{}}
      const cKPIs = get(action.payload, 'cKPIs', [])
      cKPIs.forEach(cKpi => {
        const kpiName = get(cKpi, 'name', "")
        const newData = get(cKpi, 'data', "")
        // look for keyName in currentInput_cKpi.values, update value if found
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
