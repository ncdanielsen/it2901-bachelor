import * as types from '../actionTypes/serverReducerTypes'

import { setCookie, deleteCookie, getCookie } from '../utils'

import axios from 'axios'

import { get } from 'lodash'



const tokenFromCookie = getCookie("access_token")
const tokenFromCookieIsSet = tokenFromCookie !== ""

if (tokenFromCookieIsSet) {
  // add header to all requests
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

/* note: check out serverReducerTypes for types which currently only
  return state and so are not checked for here, but which might be
  interesting to check for in the future, e.g. for showing spinning wheels
  or handling failures */


export default function serverReducer(state = initialState, action) {
  switch (action.type) {

    case types.LOGIN_SUCCESS:
      // add header to all requests
      const token = get(action, 'payload.token', "")
      axios.defaults.headers.common['Authorization'] = "Bearer " + token
      setCookie("access_token", token, 50) // store token in cookie
      return {...state, isLoggedIn: true}

    case types.LOGOUT:
      deleteCookie("access_token")
      return {...initialState, isLoggedIn: false}

    case types.GET_USER_INFO_SUCCESS:
      return {...state, userInfo: get(action, "payload", {})}

    case types.GET_KPI_LIST_SUCCESS:
      return {...state, kpis: action.payload}

    case  types.GET_R_KPI_DATA_SUCCESS:
      return {...state, rKpiSets: action.payload}

    case  types.GET_C_KPI_DATA_SUCCESS:
      return {...state, cKpiSets: action.payload}

    case types.GET_KPI_CATEGORIES_SUCCESS:
      return {...state, kpiCategories: action.payload}

    case types.UPDATE_CURRENT_R_KPI_NAME: // deselect (set to blank string) if already selected, otherwise select
      return {...state, current_rKpiName: (action.payload.name === state.current_rKpiName ? "" : action.payload.name)}

    case types.UPDATE_CURRENT_C_KPI_NAME: // deselect (set to blank string) if already selected, otherwise select
      return {...state, current_cKpiName: (action.payload.name === state.current_cKpiName ? "" : action.payload.name)}

    case types.UPDATE_KPI_IS_SELECTED:
      // check it the kpi is already selected, kpiIndex === -1 if not
      const kpiIndex = state.currentKpisSelected.findIndex(selectedKpi => selectedKpi === action.payload.kpiName)
      let currentKpisSelected
      if (state.multiSelect) { // when multiSelect activated
        currentKpisSelected = [...[], ...state.currentKpisSelected] // new array, copy state.currentKpisSelected
        if (action.payload.isSelected && kpiIndex === -1) {
          currentKpisSelected.push(action.payload.kpiName) // add kpi to list of selected kpis
        } else if (!action.payload.isSelected && kpiIndex !== -1) {
          currentKpisSelected.splice(kpiIndex, 1) // remove kpi from list of selected kpis
        }
      } else { // when multiSelect not activated
        if (action.payload.isSelected) {
          currentKpisSelected = [action.payload.kpiName] // only one kpi in the array
        } else {
          currentKpisSelected = [] // deselect
        }
      }
      return {...state, currentKpisSelected} // update list of currentKpisSelected

    case types.UPDATE_MULTI_SELECT:
      let newState = {...{}, ...state} // fresh copy of the state
      if (!action.payload.multiSelect && newState.currentKpisSelected.length > 1) {
        /*
          when deselecting multiSelect,
          store info about which kpis were selected in multiSelectKpisWereSelected,
          for the purpose of restoring this state when re-activating
        */
        newState.multiSelectKpisWereSelected = [...[], ...newState.currentKpisSelected]
        newState.currentKpisSelected.splice(1) // remove all kpis from list except the one at index 0
      }
      if (action.payload.multiSelect && newState.multiSelectKpisWereSelected.length > 1) {
        // restore multiSelect state
        newState.currentKpisSelected = newState.multiSelectKpisWereSelected
      }
      newState.multiSelect = action.payload.multiSelect // actually update multiSelect
      return newState

    default:
      return state
  }
}
