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
          {/* Changes width of content based on whether SideMenu is shown or not */}
          <div className={styles.ContentContainer + (this.props.showSideMenu ? "" : (" " + styles.ContentContainerFullScreen))}>
            {this.props.children}
            {/*this.props.children == components passed inside <ContainerWithSideMenu></ContainerWithSideMenu>*/}
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps)(ContainerWithSideMenu)
