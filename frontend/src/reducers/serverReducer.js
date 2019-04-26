import * as types from '../actionTypes/serverReducerTypes'

const initialState = {
  isLoggedIn: false,
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
    case types.LOGIN_SUCCESS:
      return {...state, isLoggedIn: !state.isLoggedIn} // NB NB temporary simulation
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
    case types.GET_R_KPI_SETS_STARTED:
      return state
    case types.GET_R_KPI_SETS_SUCCESS:
      return {...state, rKpiSets: action.payload}
    case types.GET_R_KPI_SETS_FAILURE:
      return state
    case types.SAVE_UPDATED_C_KPI_SET_STARTED: // will be useful for showing spinning wheel
      return state
    case types.SAVE_UPDATED_C_KPI_SET_SUCCESS: // will be useful for showing spinning wheel
      return state
    case types.SAVE_UPDATED_C_KPI_SET_FAILURE: // will be useful for showing spinning wheel
      return state
    case types.GET_C_KPI_SETS_STARTED:
      return state
    case types.GET_C_KPI_SETS_SUCCESS:
      return {...state, cKpiSets: action.payload}
    case types.GET_C_KPI_SETS_FAILURE:
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
        currentKpisSelected = [action.payload.kpiName]
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
