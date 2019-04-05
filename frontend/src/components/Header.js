import React, { Component } from "react"
import { connect } from "react-redux"

import { push } from "connected-react-router"

import { updateShowSideMenu } from '../actions/uiReducerActions'

import styles from "./Header.module.css"

import zenLogo from "../images/zen.png"
import fmeLogo from "../images/fme.png"
import menuLogo from "../images/menu.png" //taken from https://material.io/tools/icons/?icon=menu&style=round

function mapStateToProps(state) {
  const pathname = state.router.location.pathname
  return {
    showHamburger: (pathname === '/home/' || pathname === "/home/myData" || pathname === "/home/refData"),
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

  onLogoClick = () => {
    if (!this.props.showHamburger) {
      this.props.push("/")
    }
  }
  render() {
    return (
      <div className={styles.Header}>
        <div
          onClick={this.onLogoClick}
          className={styles.HeaderLogo + (this.props.showHamburger ? "" : (" " + styles.link))}
        >
          <img src={zenLogo} className={styles.logo} alt="zen logo" />
          <img src={fmeLogo} className={styles.logo} alt="fme logo" />
        </div>
        {this.props.showHamburger && <div
          onClick={() => this.props.updateShowSideMenu(!this.props.showSideMenu)}
          className={styles.HeaderLogo + " " + styles.link}
        >
          <img src={menuLogo} className={styles.humburger} alt="menu logo" />
        </div>}
        <div className={styles.headerRightSide}>
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
          <div onClick={() => this.props.push("/Faq")} className={styles.link}>
            FAQ
          </div>
        </div>

      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)
