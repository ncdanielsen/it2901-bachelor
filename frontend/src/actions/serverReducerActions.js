import axios from 'axios'
import * as types from "../actionTypes/serverReducerTypes"

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

const getKpiListSuccess = data => ({type: types.GET_KPI_LIST_SUCCESS, payload: {...data}})
const getKpiListStarted = () => ({type: types.GET_KPI_LIST_STARTED})
const getKpiListFailure = error => ({type: types.GET_KPI_LIST_FAILURE, payload: {error}})
