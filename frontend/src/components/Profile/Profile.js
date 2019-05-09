import React, { Component } from "react"
import { connect } from "react-redux"

import { get } from 'lodash'

import { push } from "connected-react-router"
import { getUserInfo, deleteUser, logout } from '../../actions/serverReducerActions'

import styles from './Profile.module.css'


function mapStateToProps(state) {
  const userInfo = state.serverReducer.userInfo
  return {
    admin: get(userInfo, 'admin', false),
    email: get(userInfo, 'email', ""),
    superuser: get(userInfo, 'superuser', false),
    id: get(userInfo, '_id', "")
  }
}

function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(logout()),
    push: newUrl => dispatch(push(newUrl)),
    getUserInfo: () => dispatch(getUserInfo()),
    deleteUser: userId => dispatch(deleteUser(userId))
  }
}

class Profile extends Component {

  componentWillMount() {
    this.props.getUserInfo()
  }

  logout = () => {
    this.props.logout()
    this.props.push("/login")
  }

  deleteUser = () => {
    if (this.props.id === "") {
      alert("User id not found, can't delete")
    } else {
      let isSure = window.confirm("Are you sure you want to delete this user?")
      if (isSure) {
        this.props.deleteUser(this.props.id)
      }
    }
  }

  render() {
    return (
      <div className={styles.ProfileMain}>
        <div>
          <h1>Profile</h1>
        </div>
        <div>
          <h3>Email address</h3>
          <p>{this.props.email}</p>
        </div>
        <div>
          <h3>Is admin?</h3>
          <p>{this.props.admin ? "Yes" : "No"}</p>
        </div>
        <div>
          <h3>Is superuser?</h3>
          <p>{this.props.superuser ? "Yes" : "No"}</p>
        </div>
        <div className={styles.paddingBottom} />
        <div
          className={styles.logoutButton}
          onClick={this.logout}
        >
          Log out
        </div>
        <div
          className={styles.logoutButton}
          style={{background: 'red'}}
          onClick={this.deleteUser}
        >
          Delete user
        </div>
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile)
