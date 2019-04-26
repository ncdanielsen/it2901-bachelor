import React, { Component } from "react"
import { connect } from "react-redux"

import { get } from 'lodash'

import { push } from "connected-react-router"

import { login } from '../actions/serverReducerActions'

import zenLogo from "../images/zen.png"
import fmeLogo from "../images/fme.png"

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

  constructor(props) {
    super(props)

    this.state = {
      loginUsername: "",
      loginPassword: "",
      createNewUserUsername: "",
      createNewUserPassword: ""
    }
  }

  updateField = (e, fieldName) => {
    const newValue = get(e, 'target.value', "")
    if (fieldName === "loginUsername") {
      this.setState({loginUsername: newValue})
    } else if (fieldName === "loginUsername") {
      this.setState({loginPassword: newValue})
    } else if (fieldName === "loginUsername") {
      this.setState({createNewUserUsername: newValue})
    } else if (fieldName === "loginUsername") {
      this.setState({createNewUserPassword: newValue})
    } else {
      // unknown field name
    }
  }


  login = (e) => {
    e.preventDefault()
    this.props.login()
    this.props.push("/")
  }

  createNewUser = (e) => {
    e.preventDefault()
    console.log("createNewUser")
    this.props.login() // NB NB temporary
    this.props.push("/") // NB NB temporary
  }

  render () {
    return (
      <div className={styles.loginContainer}>
        <div>
          <div className={styles.logoContainer}>
            <img src={zenLogo} className={styles.logo} alt="zen logo" />
            <img src={fmeLogo} className={styles.logo} alt="fme logo" />
          </div>
          <div className={styles.inputs}>
            <div className={styles.login}>
              <form id="login" onSubmit={this.login} ref="login">
                <label>
                  <div className={styles.label}>Username</div>
                  <input
                    onChange={(e) => this.updateField(e, "loginUsername")}
                    id="loginUsername"
                    className={styles.formInput}
                    type="text"
                  />
                </label>
                <label>
                  <div className={styles.label}>Password</div>
                  <input
                    onChange={(e) => this.updateField(e, "loginPassword")}
                    id="loginPassword"
                    className={styles.formInput}
                    type="password"
                  />
                </label>
                <br />
                <button
                  className={styles.loginButton}
                  type="submit"
                >
                  Log in
                </button>
              </form>
            </div>
            <div className={styles.orText}>
              or
            </div>
            <div className={styles.login}>
              <form onSubmit={this.createNewUser}>
                <label>
                  <div className={styles.label}>Username</div>
                  <input
                    onChange={(e) => this.updateField(e, "createNewUserUsername")}
                    id="createNewUserUsername"
                    className={styles.formInput}
                    type="text"
                  />
                </label>
                <label>
                  <div className={styles.label}>Password</div>
                  <input
                    onChange={(e) => this.updateField(e, "createNewUserPassword")}
                    id="createNewUserPassword"
                    className={styles.formInput}
                    type="password"
                  />
                </label>
                <br />
                <button
                  className={styles.loginButton}
                  type="submit"
                >
                  Create new user
                </button>
              </form>
            </div>
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
