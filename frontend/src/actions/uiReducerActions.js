import * as types from '../actionTypes/uiReducerTypes'

export function updateShowSideMenu(showSideMenu) {
  return {
    type: types.UPDATE_SHOW_SIDE_MENU,
    payload: {
      showSideMenu
    }
  }
}
