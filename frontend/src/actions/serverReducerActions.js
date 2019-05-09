import axios from 'axios'
import * as types from "../actionTypes/serverReducerTypes"

import { push } from "connected-react-router"



export const login = (email, password) => {
  return dispatch => {
    dispatch(loginStarted())
    axios
      .post("http://localhost:4000/users/login", {email, password})
      .then(res => {
        dispatch(loginSuccess(res.data))
        dispatch(push("/"))
      })
      .catch(err => {
        dispatch(loginFailure(err.message))
      })
  }
}

const loginStarted = () => ({type: types.LOGIN_STARTED})
const loginSuccess = data => ({type: types.LOGIN_SUCCESS, payload: data})
const loginFailure = error => {
  alert("Login failed")
  return {type: types.LOGIN_FAILURE, payload: {error}}
}


export const createUser = (email, password) => {
  return dispatch => {
    dispatch(createUserStarted())
    axios
      .post("http://localhost:4000/users/signup", {email, password})
      .then(res => {
        dispatch(createUserSuccess(res.data))
        dispatch(login(email, password))
      })
      .catch(err => {
        dispatch(createUserFailure(err.message))
      })
  }
}

const createUserStarted = () => ({type: types.CREATE_USER_STARTED})
const createUserSuccess = data => ({type: types.CREATE_USER_SUCCESS, payload: data})
const createUserFailure = error => ({type: types.CREATE_USER_FAILURE, payload: {error}})


export const logout = () => {
  return dispatch => {
    dispatch({type: types.LOGOUT})
    dispatch(push("/"))
  }
}




export const getUserInfo = () => {
  return dispatch => {
    dispatch(getUserInfoStarted())
    axios
      .get("http://localhost:4000/users/profile")
      .then(res => {
        dispatch(getUserInfoSuccess(res.data))
      })
      .catch(err => {
        dispatch(getUserInfoFailure(err.message))
      })
  }
}

const getUserInfoStarted = () => ({type: types.GET_USER_INFO_STARTED})
const getUserInfoSuccess = data => ({type: types.GET_USER_INFO_SUCCESS, payload: data})
const getUserInfoFailure = error => ({type: types.GET_USER_INFO_FAILURE, payload: {error}})

export const deleteUser = (userId) => {
  return dispatch => {
    dispatch(deleteUserStarted())
    axios
      .delete("http://localhost:4000/users/delete/" + userId)
      .then(res => {
        dispatch(deleteUserSuccess(res.data))
        dispatch(logout())
      })
      .catch(err => {
        dispatch(deleteUserFailure(err.message))
      })
  }
}

const deleteUserStarted = () => ({type: types.DELETE_USER_STARTED})
const deleteUserSuccess = data => ({type: types.DELETE_USER_SUCCESS, payload: data})
const deleteUserFailure = error => ({type: types.DELETE_USER_FAILURE, payload: {error}})


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

const getKpiListStarted = () => ({type: types.GET_KPI_LIST_STARTED})
const getKpiListSuccess = data => ({type: types.GET_KPI_LIST_SUCCESS, payload: {...data}})
const getKpiListFailure = error => ({type: types.GET_KPI_LIST_FAILURE, payload: {error}})


export const get_rKpiData = () => {
  return dispatch => {
    dispatch(get_rKpiDataStarted())
    axios
      .get("http://localhost:4000/rkpi")
      .then(res => {
        dispatch(get_rKpiDataSuccess(res.data))
      })
      .catch(err => {
        dispatch(get_rKpiDataFailure(err.message))
      })
  }
}

export const get_rKpiDataStarted = () => ({type: types.GET_R_KPI_DATA_STARTED})
export const get_rKpiDataSuccess = data => ({type: types.GET_R_KPI_DATA_SUCCESS, payload: data})
export const get_rKpiDataFailure = error => ({type: types.GET_R_KPI_DATA_FAILURE, payload: {error}})



export const get_cKpiData = () => {
  console.log("get_cKpiData")
  return dispatch => {
    dispatch(get_cKpiDataStarted())
    axios
      .get("http://localhost:4000/ckpi")
      .then(res => {
        dispatch(get_cKpiDataSuccess(res.data))
      })
      .catch(err => {
        dispatch(get_cKpiDataFailure(err.message))
      })
  }
}

export const get_cKpiDataStarted = () => ({type: types.GET_C_KPI_DATA_STARTED})
export const get_cKpiDataSuccess = data => ({type: types.GET_C_KPI_DATA_SUCCESS, payload: data})
export const get_cKpiDataFailure = error => ({type: types.GET_C_KPI_DATA_FAILURE, payload: {error}})



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
const getKpiCategoriesSuccess = data => ({type: types.GET_KPI_CATEGORIES_SUCCESS, payload: data})
const getKpiCategoriesFailure = error => ({type: types.GET_KPI_CATEGORIES_FAILURE, payload: {error}})



export const saveUpdated_rKpiSet = (updated_rKpiSet, editExisting=false) => {
  return dispatch => {
    dispatch(saveUpdated_rKpiSetStarted())
    axios[editExisting ? "put" : "post"]("http://localhost:4000/rkpi", updated_rKpiSet)
    .then(function (result) {
      saveUpdated_rKpiSetSuccess(result.data)

      dispatch(get_rKpiData())
    })
    .catch(function (err) {
      dispatch(saveUpdated_rKpiSetFailure(err.message))
    })
  }
}

const saveUpdated_rKpiSetStarted = () => ({type: types.SAVE_UPDATED_R_KPI_SET_STARTED})
const saveUpdated_rKpiSetSuccess = data => ({type: types.SAVE_UPDATED_R_KPI_SET_SUCCESS, payload: data})
const saveUpdated_rKpiSetFailure = error => ({type: types.SAVE_UPDATED_R_KPI_SET_FAILURE, payload: {error}})



export const delete_rKpiSet = (id) => {
  return dispatch => {
    dispatch(delete_rKpiSetStarted())
    axios.delete("http://localhost:4000/rkpi", {data: {"_id": id}})
    .then(function (result) {
      delete_rKpiSetSuccess(result.data)
      dispatch(get_rKpiData())
    })
    .catch(function (err) {
      dispatch(delete_rKpiSetFailure(err.message))
    })
  }
}

const delete_rKpiSetStarted = () => ({type: types.DELETE_R_KPI_SET_STARTED})
const delete_rKpiSetSuccess = data => ({type: types.DELETE_R_KPI_SET_SUCCESS, payload: data})
const delete_rKpiSetFailure = error => ({type: types.DELETE_R_KPI_SET_FAILURE, payload: {error}})


export const delete_cKpiSet = (id) => {
  return dispatch => {
    dispatch(delete_cKpiSetStarted())
    axios.delete("http://localhost:4000/ckpi", {data: {"_id": id}})
    .then(function (result) {
      delete_cKpiSetSuccess(result.data)
      dispatch(get_cKpiData())
    })
    .catch(function (err) {
      dispatch(delete_cKpiSetFailure(err.message))
    })
  }
}

const delete_cKpiSetStarted = () => ({type: types.DELETE_C_KPI_SET_STARTED})
const delete_cKpiSetSuccess = data => ({type: types.DELETE_C_KPI_SET_SUCCESS, payload: data})
const delete_cKpiSetFailure = error => ({type: types.DELETE_C_KPI_SET_FAILURE, payload: {error}})


export const saveUpdated_cKpiSet = (updated_cKpiSet, editExisting=false) => {
  return dispatch => {
    dispatch(saveUpdated_cKpiSetStarted())
    axios[editExisting ? "put" : "post"]("http://localhost:4000/ckpi", updated_cKpiSet)
    .then(function (result) {
      saveUpdated_cKpiSetSuccess(result.data)

      dispatch(get_cKpiData())
    })
    .catch(function (err) {
      dispatch(saveUpdated_cKpiSetFailure(err.message))
    })
  }
}

const saveUpdated_cKpiSetStarted = () => ({type: types.SAVE_UPDATED_C_KPI_SET_STARTED})
const saveUpdated_cKpiSetSuccess = data => ({type: types.SAVE_UPDATED_C_KPI_SET_SUCCESS, payload: data})
const saveUpdated_cKpiSetFailure = error => ({type: types.SAVE_UPDATED_C_KPI_SET_FAILURE, payload: {error}})
