import React, { Component } from "react";
import { connect } from "react-redux";

import styles from "./Header.module.css";

import { push } from "connected-react-router";

import zenLogo from "../images/zen.png";
import fmeLogo from "../images/fme.png";

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    push: newUrl => dispatch(push(newUrl))
  };
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
)(Header);
