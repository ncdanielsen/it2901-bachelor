import * as types from '../actionTypes/serverReducerTypes'

const initialState = {
  kpis: [],
  kpiCategories: []
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
    default:
      return state
  }
}
