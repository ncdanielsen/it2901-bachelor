import React, { Component } from "react"
import { connect } from "react-redux"

import { push } from "connected-react-router"

import { login } from '../actions/serverReducerActions'

import styles from './Login.module.css'

function mapStateToProps(state) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {
    login: (username="", password="") => dispatch(login(username, password)),
    push: newUrl => dispatch(push(newUrl))
  }
}

class Login extends Component {

  login = () => {
    this.props.login()
    this.props.push("/")
  }

  render () {
    return (
      <div className={styles.loginContainer}>
        <div>
          <div>Username</div>
          <div>Password</div>
          <div
            className={styles.loginButton}
            onClick={this.login}
          >
            Log in
          </div>
        </div>
      </div>
    )
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
