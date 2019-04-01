import * as types from '../actionTypes/graphReducerTypes'

import data from '../data/data'

const graphIndex = 0

const initialState = {
  graphIndex,
  cKpi: data[graphIndex],
  numberOfDataSets: data.length
}

export default function graphReducer(state = initialState, action) {
  switch (action.type) {
    case types.UPDATE_GRAPH_INDEX:
      return {...state,
        graphIndex: action.payload.graphIndex, // this way to identify graphs is just a temporary solution
        cKpi: data[action.payload.graphIndex]
      }
    default:
      return state
  }
}
