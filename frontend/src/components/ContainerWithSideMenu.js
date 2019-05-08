import React, { Component } from "react"
import styles from "./ContainerWithSideMenu.module.css"

import { connect } from "react-redux"
import Header from "./Header"
import SideMenu from "./SideMenu/SideMenu"


function mapStateToProps(state) {
  return {
    showSideMenu: state.uiReducer.showSideMenu
  }
}

class ContainerWithSideMenu extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className={styles.ContentWithSideMenu}>
          {this.props.showSideMenu && <SideMenu />}
          <div className={styles.ContentContainer + (this.props.showSideMenu ? "" : (" " + styles.ContentContainerFullScreen))}>
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps)(ContainerWithSideMenu)
