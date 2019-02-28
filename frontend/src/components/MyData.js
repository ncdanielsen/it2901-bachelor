import React, { Component } from 'react'
import { connect } from 'react-redux'

import './MyData.css'

import { replace } from 'connected-react-router'

function mapStateToProps(state) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {
    replace: (url) => dispatch(replace(url))
  }
}

class MyData extends Component {

  render() {
    return (
      <div>
        <div>My Data</div>
        <div onClick={() => this.props.replace("/")} className="closeButtonMyData">Close</div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyData)
