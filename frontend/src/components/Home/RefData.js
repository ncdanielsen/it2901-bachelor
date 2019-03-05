import React, { Component } from 'react'
import { connect } from 'react-redux'

import styles from './RefData.module.css'

import { replace } from 'connected-react-router'

function mapStateToProps(state) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {
    replace: (url) => dispatch(replace(url))
  }
}

class RefData extends Component {

  render() {
    return (
      <div>
        <div>Ref Data</div>
        <div onClick={() => this.props.replace("/")} className={styles.closeButtonRefData}>Close</div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RefData)
