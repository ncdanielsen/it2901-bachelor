import * as types from '../actionTypes/serverReducerTypes'

const initialState = {
  kpis: []
}

export default function serverReducer(state = initialState, action) {
  switch (action.type) {
    case types.GET_KPI_LIST_SUCCESS:
      console.log("GET_KPI_LIST_SUCCESS", action)
      return {...state,
        kpis: action.payload
      }
    case types.GET_KPI_LIST_STARTED:
      console.log("GET_KPI_LIST_STARTED", action)
      return state
    case types.GET_KPI_LIST_FAILURE:
      console.log("GET_KPI_LIST_FAILURE", action)
      return state
    default:
      return state
  }
}
