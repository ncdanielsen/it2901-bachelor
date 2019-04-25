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

export function updateCurrentInputView(currentInputView) {
  return {
    type: types.UPDATE_CURRENT_INPUT_VIEW,
    payload: {
      currentInputView
    }
  }
}

export function setCurrentInput_rKpi(rKpiSet) {
  return {
    type: types.SET_CURRENT_INPUT_R_KPI,
    payload: {
      rKpiSet
    }
  }
}

export function updateSelectedFromDateTime(fromDateTime) {
  return {
    type: types.UPDATE_SELECTED_FROM_DATETIME,
    payload: {
      fromDateTime
    }
  }
}

export function updateSelectedToDateTime(toDateTime) {
  return {
    type: types.UPDATE_SELECTED_TO_DATETIME,
    payload: {
      toDateTime
    }
  }
}
