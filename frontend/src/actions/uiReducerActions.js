import * as types from '../actionTypes/uiReducerTypes'

export function updateShowSideMenu(showSideMenu) {
  return {
    type: types.UPDATE_SHOW_SIDE_MENU,
    payload: {
      showSideMenu
    }
  }
}

export function updateChartType(chartType) {
  return {
    type: types.UPDATE_CHART_TYPE,
    payload: {
      chartType
    }
  }
}


export function updateR_KpiInputValue(keyName, newValue) {
  return {
    type: types.UPDATE_R_KPI_INPUT_VALUE,
    payload: {
      keyName, newValue
    }
  }
}

export function setEmtpy_rKpi() {
  return {
    type: types.SET_EMPTY_R_KPI,
    payload: {}
  }
}

export function updateShowInputView(showInputView) {
  return {
    type: types.UPDATE_SHOW_INPUT_VIEW,
    payload: {
      showInputView
    }
  }
}
