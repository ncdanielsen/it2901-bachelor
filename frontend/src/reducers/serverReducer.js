import * as types from '../actionTypes/serverReducerTypes'
import { routerActions } from 'connected-react-router';

const initialState = {
  kpis: [],
  rkpis: []
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
    case types.GET_rKPI_DATA:
      console.log("GET_rKPI_DATA", action)
      return {...state,
        rkpis: action.payload
      }
    default:
      return state
  }
}
