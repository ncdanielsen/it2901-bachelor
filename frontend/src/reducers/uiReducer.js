import * as types from '../actionTypes/uiReducerTypes'

import { get } from 'lodash'

const initialState = {
  showSideMenu: true
}

export default function uiReducer(state = initialState, action) {
  switch (action.type) {
    case types.UPDATE_SHOW_SIDE_MENU:
      return {...state, showSideMenu: get(action.payload, 'showSideMenu', true)}
    default:
      return state
  }
}
