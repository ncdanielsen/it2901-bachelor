import React, { Component } from "react"
import { connect } from "react-redux"

import { get } from 'lodash'

import { login, createUser } from '../actions/serverReducerActions'

import zenLogo from "../images/zen.png"
import fmeLogo from "../images/fme.png"

import styles from './Login.module.css'

function mapStateToProps(state) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {
    login: (email, password) => dispatch(login(email, password)),
    createUser: (email, password) => dispatch(createUser(email, password))
  }
}

class Login extends Component {

  constructor(props) {
    super(props)

    this.state = {
      loginEmail: "",
      loginPassword: "",
      createNewUserEmail: "",
      createNewUserPassword: ""
    }
  }

  updateField = (e, fieldName) => {
    const newValue = get(e, 'target.value', "")
    if (fieldName === "loginEmail") {
      this.setState({loginEmail: newValue})
    } else if (fieldName === "loginPassword") {
      this.setState({loginPassword: newValue})
    } else if (fieldName === "createNewUserEmail") {
      this.setState({createNewUserEmail: newValue})
    } else if (fieldName === "createNewUserPassword") {
      this.setState({createNewUserPassword: newValue})
    } else {
      // unknown field name
    }
  }


  login = (e) => {
    e.preventDefault()
    this.props.login(this.state.loginEmail, this.state.loginPassword)
  }

  createNewUser = (e) => {
    e.preventDefault()
    this.props.createUser(this.state.createNewUserEmail, this.state.createNewUserPassword)
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
                  <div className={styles.label}>Email</div>
                  <input
                    onChange={(e) => this.updateField(e, "loginEmail")}
                    id="loginEmail"
                    className={styles.formInput}
                    type="email"
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
                  <div className={styles.label}>Email</div>
                  <input
                    onChange={(e) => this.updateField(e, "createNewUserEmail")}
                    id="createNewUserEmail"
                    className={styles.formInput}
                    type="email"
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
