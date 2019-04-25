import axios from 'axios'
import * as types from "../actionTypes/serverReducerTypes"
//import { mock_rkpi_data } from "../data/mock_rkpi_data"
//import { mock_ckpi_data } from "../data/mock_ckpi_data"

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


export const getrKpiDataEnergy = () => {
  return dispatch => {
    dispatch(getrKpiDataEnergyStarted())
    axios
      .get("http://localhost:4000/rkpi")
      .then(res => {
        dispatch(getrKpiDataEnergySuccess(res.data))
      })
      .catch(err => {
        dispatch(getrKpiDataEnergyFailure(err.message))
      })
  }
}

export const getrKpiDataEnergyStarted = () => ({type: types.GET_R_KPI_DATA_STARTED})
export const getrKpiDataEnergySuccess = data => ({type: types.GET_R_KPI_DATA_SUCCESS, payload: data})
export const getrKpiDataEnergyFailure = error => ({type: types.GET_R_KPI_DATA_FAILURE, payload: {error}})



export const getcKpiDataEnergy = () => {
  return dispatch => {
    dispatch(getcKpiDataEnergyStarted())
    axios
      .get("http://localhost:4000/ckpi")
      .then(res => {
        dispatch(getcKpiDataEnergySuccess(res.data))
      })
      .catch(err => {
        dispatch(getcKpiDataEnergyFailure(err.message))
      })
  }
}

export const getcKpiDataEnergyStarted = () => ({type: types.GET_C_KPI_DATA_STARTED})
export const getcKpiDataEnergySuccess = data => ({type: types.GET_C_KPI_DATA_SUCCESS, payload: data})
export const getcKpiDataEnergyFailure = error => ({type: types.GET_C_KPI_DATA_FAILURE, payload: {error}})



export const updateCurrent_rKpiName = (name) => ({type: types.UPDATE_CURRENT_R_KPI_NAME, payload: {name}})
export const updateCurrent_cKpiName = (name) => ({type: types.UPDATE_CURRENT_C_KPI_NAME, payload: {name}})



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



export const saveUpdated_rKpiSet = (updated_rKpiSet) => {
  return dispatch => {
    dispatch(saveUpdated_rKpiSetStarted())
    axios.post("http://localhost:4000/rkpi", updated_rKpiSet)
    .then(function (result) {
      saveUpdated_rKpiSetSuccess(result.data)

      dispatch(get_rKpiSetsStarted())
      axios
        .get("http://localhost:4000/rkpi")
        .then(res => {
          dispatch(get_rKpiSetsSuccess(res.data))
        })
        .catch(err => {
          dispatch(get_rKpiSetsFailure(err.message))
        })
    })
    .catch(function (err) {
      dispatch(saveUpdated_rKpiSetFailure(err.message))
    })
  }
}

const saveUpdated_rKpiSetStarted = () => ({type: types.SAVE_UPDATED_R_KPI_SET_STARTED})
const saveUpdated_rKpiSetSuccess = data => ({type: types.SAVE_UPDATED_R_KPI_SET_SUCCESS, payload: {...data}})
const saveUpdated_rKpiSetFailure = error => ({type: types.SAVE_UPDATED_R_KPI_SET_FAILURE, payload: {error}})

const get_rKpiSetsStarted = () => ({type: types.GET_R_KPI_SETS_STARTED})
const get_rKpiSetsSuccess = data => ({type: types.GET_R_KPI_SETS_SUCCESS, payload: {...data}})
const get_rKpiSetsFailure = error => ({type: types.GET_R_KPI_SETS_FAILURE, payload: {error}})






export const saveUpdated_cKpiSet = (updated_cKpiSet) => {
  return dispatch => {
    dispatch(saveUpdated_cKpiSetStarted())
    axios.post("http://localhost:4000/ckpi", updated_cKpiSet)
    .then(function (result) {
      saveUpdated_cKpiSetSuccess(result.data)

      dispatch(get_cKpiSetsStarted())
      axios
        .get("http://localhost:4000/ckpi")
        .then(res => {
          dispatch(get_cKpiSetsSuccess(res.data))
        })
        .catch(err => {
          dispatch(get_cKpiSetsFailure(err.message))
        })
    })
    .catch(function (err) {
      dispatch(saveUpdated_cKpiSetFailure(err.message))
    })
  }
}

const saveUpdated_cKpiSetStarted = () => ({type: types.SAVE_UPDATED_C_KPI_SET_STARTED})
const saveUpdated_cKpiSetSuccess = data => ({type: types.SAVE_UPDATED_C_KPI_SET_SUCCESS, payload: {...data}})
const saveUpdated_cKpiSetFailure = error => ({type: types.SAVE_UPDATED_C_KPI_SET_FAILURE, payload: {error}})

const get_cKpiSetsStarted = () => ({type: types.GET_C_KPI_SETS_STARTED})
const get_cKpiSetsSuccess = data => ({type: types.GET_C_KPI_SETS_SUCCESS, payload: {...data}})
const get_cKpiSetsFailure = error => ({type: types.GET_C_KPI_SETS_FAILURE, payload: {error}})
