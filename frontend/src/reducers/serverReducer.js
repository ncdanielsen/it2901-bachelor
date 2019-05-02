import * as types from '../actionTypes/serverReducerTypes'

import { setCookie, deleteCookie, getCookie } from '../utils'

import axios from 'axios'

import { get } from 'lodash'



const tokenFromCookie = getCookie("access_token")
const tokenFromCookieIsSet = tokenFromCookie !== ""

if (tokenFromCookieIsSet) {
  axios.defaults.headers.common['Authorization'] = "Bearer " + tokenFromCookie
}

const initialState = {
  isLoggedIn: tokenFromCookieIsSet,
  userInfo: {},
  kpis: [],
  kpiCategories: [],
  rKpiSets: [],
  cKpiSets: [],
  current_rKpiName: "",
  current_cKpiName: "",
  currentKpisSelected: [],
  multiSelect: false,
  multiSelectKpisWereSelected: []
}

export default function serverReducer(state = initialState, action) {
  switch (action.type) {
    //case types.LOGIN_SUCCESS:
      //return {...state, isLoggedIn: !state.isLoggedIn} // NB NB temporary simulation

    case types.LOGIN_STARTED:
      console.log("LOGIN_STARTED", action)
      return state
    case types.LOGIN_SUCCESS:
      console.log("LOGIN_SUCCESS", action)
      const token = get(action, 'payload.token', "")
      axios.defaults.headers.common['Authorization'] = "Bearer " + token
      setCookie("access_token", token, 50)
      return {...state, isLoggedIn: true}
    case types.LOGIN_FAILURE:
      console.log("LOGIN_FAILURE", action)
      return state

    case types.LOGOUT:
      deleteCookie("access_token")
      return {...state, isLoggedIn: false}


    case types.GET_USER_INFO_STARTED:
      console.log("GET_USER_INFO_STARTED", action)
      return state
    case types.GET_USER_INFO_SUCCESS:
      console.log("GET_USER_INFO_SUCCESS", action)
      return {...state, userInfo: get(action, "payload", {})}
    case types.GET_USER_INFO_FAILURE:
      console.log("GET_USER_INFO_FAILURE", action)
      return state


    /*case types.DELETE_USER_STARTED:
      console.log("DELETE_USER_STARTED", action)
      return state
    case types.DELETE_USER_SUCCESS:
      console.log("DELETE_USER_SUCCESS", action)
      return state
    case types.DELETE_USER_FAILURE:
      console.log("DELETE_USER_FAILURE", action)
      return state*/


    case types.CREATE_USER_STARTED:
      console.log("CREATE_USER_STARTED", action)
      return state
    case types.CREATE_USER_SUCCESS:
      console.log("CREATE_USER_SUCCESS", action)
      return state
    case types.CREATE_USER_FAILURE:
      console.log("CREATE_USER_FAILURE", action)
      return state


    case types.GET_KPI_LIST_STARTED:
      return state
    case types.GET_KPI_LIST_SUCCESS:
      return {...state, kpis: action.payload}
    case types.GET_KPI_LIST_FAILURE:
      return state

    case  types.GET_R_KPI_DATA_STARTED:
      return state
    case  types.GET_R_KPI_DATA_SUCCESS:
      console.log("GET_R_KPI_DATA_SUCCESS", action)
      return {...state, rKpiSets: action.payload}
    case  types.GET_R_KPI_DATA_FAILURE:
      return state

    case  types.GET_C_KPI_DATA_STARTED:
      return state
    case  types.GET_C_KPI_DATA_SUCCESS:
      console.log("GET_C_KPI_DATA_SUCCESS", action)
      return {...state, cKpiSets: action.payload}
    case  types.GET_C_KPI_DATA_FAILURE:
      return state

    case types.GET_KPI_CATEGORIES_STARTED:
      return state
    case types.GET_KPI_CATEGORIES_SUCCESS:
      return {...state, kpiCategories: action.payload}
    case types.GET_KPI_CATEGORIES_FAILURE:
      return state
    case types.SAVE_UPDATED_R_KPI_SET_STARTED: // will be useful for showing spinning wheel
      return state
    case types.SAVE_UPDATED_R_KPI_SET_SUCCESS: // will be useful for showing spinning wheel
      return state
    case types.SAVE_UPDATED_R_KPI_SET_FAILURE: // will be useful for showing spinning wheel
      return state
    case types.SAVE_UPDATED_C_KPI_SET_STARTED: // will be useful for showing spinning wheel
      return state
    case types.SAVE_UPDATED_C_KPI_SET_SUCCESS: // will be useful for showing spinning wheel
      return state
    case types.SAVE_UPDATED_C_KPI_SET_FAILURE: // will be useful for showing spinning wheel
      return state

    case types.UPDATE_CURRENT_R_KPI_NAME:
      return {...state, current_rKpiName: (action.payload.name === state.current_rKpiName ? "" : action.payload.name)}

    case types.UPDATE_CURRENT_C_KPI_NAME:
      return {...state, current_cKpiName: (action.payload.name === state.current_cKpiName ? "" : action.payload.name)}

    case types.UPDATE_KPI_IS_SELECTED:
      const kpiIndex = state.currentKpisSelected.findIndex(selectedKpi => selectedKpi === action.payload.kpiName)
      let currentKpisSelected
      if (state.multiSelect) {
        currentKpisSelected = [...[], ...state.currentKpisSelected]
        if (action.payload.isSelected && kpiIndex === -1) {
          currentKpisSelected.push(action.payload.kpiName)
        } else if (!action.payload.isSelected && kpiIndex !== -1) {
          currentKpisSelected.splice(kpiIndex, 1)
        }
      } else {
        if (action.payload.isSelected) {
          currentKpisSelected = [action.payload.kpiName]
        } else {
          currentKpisSelected = []
        }
      }
      return {...state, currentKpisSelected}

    case types.UPDATE_MULTI_SELECT:
      let newState = {...{}, ...state}
      if (!action.payload.multiSelect && newState.currentKpisSelected.length > 1) {
        newState.multiSelectKpisWereSelected = [...[], ...newState.currentKpisSelected]
        newState.currentKpisSelected.splice(1)
      }
      if (action.payload.multiSelect && newState.multiSelectKpisWereSelected.length > 1) {
        newState.currentKpisSelected = newState.multiSelectKpisWereSelected
      }
      newState.multiSelect = action.payload.multiSelect
      return newState

    default:
      return state
  }
}
