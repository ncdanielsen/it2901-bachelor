import axios from 'axios'
import * as types from "../actionTypes/serverReducerTypes"
import { rkpiDataEnergy } from "../data/mock_rkpi_data"
import { ckpiDataEnergy } from "../data/mock_ckpi_data"

export const getKpiList = () => {
  return dispatch => {
    dispatch(getKpiListStarted())
    axios
      .get("http://localhost:4000/kpi-list/list")
      .then(res => {
        dispatch(getKpiListSuccess(res.data))
      })
      .catch(err => {
        dispatch(getKpiListFailure(err.message))
      })
  }
}

// TODO: get data from server when it is available, only mockdata in local file now


const getKpiListStarted = () => ({type: types.GET_KPI_LIST_STARTED})
const getKpiListSuccess = data => ({type: types.GET_KPI_LIST_SUCCESS, payload: {...data}})
const getKpiListFailure = error => ({type: types.GET_KPI_LIST_FAILURE, payload: {error}})


export const getrKpiDataEnergy = () => ({type: types.GET_rKPI_DATA, payload: [rkpiDataEnergy]})
export const getcKpiDataEnergy = () => ({type: types.GET_cKPI_DATA, payload: {ckpiDataEnergy}})

export const updateCurrent_rKpiName = (name) => ({type: types.UPDATE_CURRENT_rKPI_NAME, payload: {name}})
export const updateCurrent_cKpiName = (name) => ({type: types.UPDATE_CURRENT_cKPI_NAME, payload: {name}})



export const updateKpiIsSelected = (kpiName, isSelected) => ({type: types.UPDATE_KPI_IS_SELECTED, payload: {kpiName, isSelected}})
export const updateMultiSelect = multiSelect => ({type: types.UPDATE_MULTI_SELECT, payload: {multiSelect}})


export const getKpiCategories = () => {
  return dispatch => {
    dispatch(getKpiCategoriesStarted())
    axios
      .get("http://localhost:4000/kpi-list/categories")
      .then(res => {
        dispatch(getKpiCategoriesSuccess(res.data))
      })
      .catch(err => {
        dispatch(getKpiCategoriesFailure(err.message))
      })
  }
}
const getKpiCategoriesStarted = () => ({type: types.GET_KPI_CATEGORIES_STARTED})
const getKpiCategoriesSuccess = data => ({type: types.GET_KPI_CATEGORIES_SUCCESS, payload: {...data}})
const getKpiCategoriesFailure = error => ({type: types.GET_KPI_CATEGORIES_FAILURE, payload: {error}})
