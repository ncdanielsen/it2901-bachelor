import * as types from '../actionTypes/graphReducerTypes'

export function updateGraphIndex(graphIndex) {
  return {
    type: types.UPDATE_GRAPH_INDEX,
    payload: {
      graphIndex
    }
  }
}
