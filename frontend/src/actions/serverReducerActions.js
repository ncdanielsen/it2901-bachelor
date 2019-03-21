import axios from 'axios'
import * as types from "../actionTypes/serverReducerTypes"
import { rkpiDataEnergy } from "../data/mock_rkpi_data"

export const getKpiList = () => {
  return dispatch => {
    dispatch(getKpiListStarted())

    axios
      .get("http://localhost:4000/kpi-list")
      .then(res => {
        dispatch(getKpiListSuccess(res.data))
      })
      .catch(err => {
        dispatch(getKpiListFailure(err.message))
      })
  }
}

// TODO: get data from server when it is available, only mockdata in local file now


const getKpiListSuccess = data => ({type: types.GET_KPI_LIST_SUCCESS, payload: {...data}})
const getKpiListStarted = () => ({type: types.GET_KPI_LIST_STARTED})
const getKpiListFailure = error => ({type: types.GET_KPI_LIST_FAILURE, payload: {error}})
export const getrKpiDataEnergy = () => ({type: types.GET_rKPI_DATA, payload: {rkpiDataEnergy}}) 