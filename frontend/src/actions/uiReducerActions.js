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


export function update_rKpiInputValue(keyName, newValue) {
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

export function updateCurrentInputViewMyData(currentInputView) {
  return {
    type: types.UPDATE_CURRENT_INPUT_VIEW_MY_DATA,
    payload: {
      currentInputView
    }
  }
}


export function updateCurrentInputViewRefData(currentInputView) {
  return {
    type: types.UPDATE_CURRENT_INPUT_VIEW_REF_DATA,
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

export function setCurrentInput_cKpi(cKpiSet) {
  return {
    type: types.SET_CURRENT_INPUT_C_KPI,
    payload: {
      cKpiSet
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

export function setEmtpy_cKpi() {
  return {
    type: types.SET_EMPTY_C_KPI,
    payload: {}
  }
}

export function update_cKpiInputValue(keyName, newValue) {
  return {
    type: types.UPDATE_C_KPI_INPUT_VALUE,
    payload: {
      keyName, newValue
    }
  }
}

export function insertNew_cKpiValues(cKPIs) {
  return {
    type: types.INSERT_NEW_C_KPI_VALUES,
    payload: {
      cKPIs
    }
  }
}
