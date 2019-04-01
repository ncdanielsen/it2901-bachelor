import React, { Component } from "react"
import { connect } from "react-redux"

import styles from "./Header.module.css"

import { push } from "connected-react-router"

import zenLogo from "../images/zen.png"
import fmeLogo from "../images/fme.png"
import menuLogo from "../images/menu.png" //taken from https://material.io/tools/icons/?icon=menu&style=round

function mapStateToProps(state) {
  const pathname = state.router.location.pathname
  return {
    showHamburger: (pathname === '/home/' || pathname === "/home/myData" || pathname === "/home/refData")
  }
}

function mapDispatchToProps(dispatch) {
  return {
    push: newUrl => dispatch(push(newUrl)),
    toggleShowSideMenu: () => console.log("toggleShowSideMenu here")
  }
}

class Header extends Component {

  render() {
    return (
      <div className={styles.Header}>
        <div
          onClick={() => this.props.push("/")}
          className={styles.HeaderLogo + " " + styles.link}
        >
          <img src={zenLogo} className={styles.logo} alt="zen logo" />
          <img src={fmeLogo} className={styles.logo} alt="fme logo" />
        </div>
        {this.props.showHamburger && <div
          onClick={() => this.props.toggleShowSideMenu()}
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
        </div>

      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)
