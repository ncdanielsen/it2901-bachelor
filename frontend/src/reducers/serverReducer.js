import * as types from '../actionTypes/serverReducerTypes'

const initialState = {
  kpis: [],
  kpiCategories: [],
  rkpis: [],
  ckpis: [],
  currentKpisSelected: [],
  multiSelect: false,
  multiSelectKpisWereSelected: []
}

export default function serverReducer(state = initialState, action) {
  switch (action.type) {
    case types.GET_KPI_LIST_STARTED:
      return state
    case types.GET_KPI_LIST_SUCCESS:
      return {...state, kpis: action.payload}
    case types.GET_KPI_LIST_FAILURE:
      return state
    case types.GET_KPI_CATEGORIES_STARTED:
      return state
    case types.GET_KPI_CATEGORIES_SUCCESS:
      return {...state, kpiCategories: action.payload}
    case types.GET_KPI_CATEGORIES_FAILURE:
      return state
    case types.GET_rKPI_DATA:
      return {...state, rkpis: action.payload}
    case types.GET_cKPI_DATA:
      return {...state, ckpis: action.payload.ckpiDataEnergy}
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
