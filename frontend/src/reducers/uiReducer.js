import * as types from '../actionTypes/uiReducerTypes'

import { get } from 'lodash'

const initialState = {
  showSideMenu: true,
  chartType: "Radar"
}

export default function uiReducer(state = initialState, action) {
  switch (action.type) {
    case types.UPDATE_SHOW_SIDE_MENU:
      return {...state, showSideMenu: get(action.payload, 'showSideMenu', true)}
    case types.UPDATE_CHART_TYPE:
      return {...state, chartType: get(action.payload, 'chartType', "Radar")}
    default:
      return state
  }
}
