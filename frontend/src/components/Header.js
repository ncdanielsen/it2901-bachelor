import React, { Component } from "react"
import { connect } from "react-redux"

import { push } from "connected-react-router"

import { updateShowSideMenu } from '../actions/uiReducerActions'

import styles from "./Header.module.css"

import zenLogo from "../images/zen-white.png"
import fmeLogo from "../images/fme-white.png"
import menuLogo from "../images/menu-white.png" //taken from https://material.io/tools/icons/?icon=menu&style=round


/*
  This component is the header section always visible at the top (apart from when not logged in).
  On the left side, it has
    - a hamburger menu icon which toggles showSideMenu when clicked
    - zen logo, which goes to /home/ when clicked
  On the right side, it has
    - go to FAQ button
    - go to About button
    - go to Profile button
*/


function mapStateToProps(state) {
  return {
    showSideMenu: state.uiReducer.showSideMenu
  }
}

function mapDispatchToProps(dispatch) {
  return {
    push: newUrl => dispatch(push(newUrl)),
    updateShowSideMenu: showSideMenu => dispatch(updateShowSideMenu(showSideMenu))
  }
}

class Header extends Component {

  render() {
    return (
      <div className={styles.Header}>

        <div
          onClick={() => this.props.updateShowSideMenu(!this.props.showSideMenu)}
          className={styles.HeaderLogo + " " + styles.link}
        >
          <img src={menuLogo} className={styles.humburger} alt="menu logo" />
        </div>

        <div
          onClick = {() => this.props.push("/")}
          className = {styles.HeaderLogo + " " + styles.link}
        >
          <img src={zenLogo} className={styles.logo} alt="zen logo" />
          <img src={fmeLogo} className={styles.logo} alt="fme logo" />
        </div>

        <div className={styles.headerRightSide}>
          <div
            onClick={() => this.props.push("/faq")}
            className={styles.link}
          >
            FAQ
          </div>
          <div
            onClick={() => this.props.push("/about")}
            className={styles.link}
          >
            About
          </div>
          <div
            onClick={() => this.props.push("/profile")}
            className={styles.link}
          >
            Profile
          </div>
        </div>

      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)
