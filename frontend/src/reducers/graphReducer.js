import * as types from '../actionTypes/graphReducerTypes'

import data from '../data/data'

const graphIndex = 0

const initialState = {
  graphIndex,
  data: data[graphIndex],
  numberOfDataSets: data.length
}

export default function graphReducer(state = initialState, action) {
  switch (action.type) {
    case types.UPDATE_GRAPH_INDEX:
      return {...state,
        graphIndex: action.payload.graphIndex,
        data: data[action.payload.graphIndex]
      }
    default:
      return state
  }
}
