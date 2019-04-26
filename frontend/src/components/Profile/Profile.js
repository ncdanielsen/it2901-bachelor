import React, { Component } from "react"
import { connect } from "react-redux"

import { push } from "connected-react-router"
import { logout } from '../../actions/serverReducerActions'

import styles from './Profile.module.css'

import Header from "../Header"

function mapStateToProps(state) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(logout()),
    push: newUrl => dispatch(push(newUrl))
  }
}

class Profile extends Component {

  logout = () => {
    this.props.logout()
    this.props.push("/login")
  }

  render() {
    return (
      <div>
        <Header />
        <div className={styles.ProfileContainer}>
          <div className={styles.ProfileMain}>
            <div>
              <h1>Profile</h1>
            </div>
            <div>
              <h3>Email</h3>
              <p>User One</p>
              <div className={styles.paddingBottom} />
            </div>
            <div
              className={styles.logoutButton}
              onClick={this.logout}
            >
              Log out
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
)(Profile)
