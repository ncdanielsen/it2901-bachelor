import React, { Component } from 'react'

import styles from './GraphInfo.module.css'

export default class GraphInfo extends Component {

  /*
    This component displays a box with this.props.title as title.
    When the box is hovered, it expands to also show info items.
    this.props.info = list of strings with information
  */

  constructor(props) {
    super(props)
    this.state = {
      showInfo: false
    }
  }

  toggleShowOptions = () => this.setState({showInfo: !this.state.showInfo})
  updateShowOptions = showInfo => this.setState({showInfo})

  render() {

    return (
      <div
        className={styles.graphDropdownInfo}
        onMouseEnter={() => this.updateShowOptions(true)}
        onMouseLeave={() => this.updateShowOptions(false)}
        onTouchEnd={this.toggleShowOptions}
      >
        <div className={styles.dropdownInfoTitle}>{this.props.title}</div>
        {this.state.showInfo && <div className={styles.dropdownInfoAll}>
          {this.props.info.map((info, index) => <div
            key={index}
            className={styles.dropdownInfo}
          >
            {info}
          </div>)}
        </div>}
      </div>
    )}
}
