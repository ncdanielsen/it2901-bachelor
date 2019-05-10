import React, { Component } from 'react'

import styles from './Dropdown.module.css'

export default class Dropdown extends Component {

  /*
    This component displays a box with this.props.title as title.
    When the box is hovered, it expands to also show options,
    which trigger this.props.updateActiveOption(option) when clicked.
    this.props.options = list of strings
  */

  constructor(props) {
    super(props)
    this.state = {
      showOptions: false
    }
  }

  toggleShowOptions = () => this.setState({showOptions: !this.state.showOptions})
  updateShowOptions = showOptions => this.setState({showOptions})

  updateActiveOption = (option) => this.props.updateActiveOption(option)

  render() {

    return (
      <div
        className={styles.chartTypeDropdown}
        onMouseEnter={() => this.updateShowOptions(true)}
        onMouseLeave={() => this.updateShowOptions(false)}
        onTouchEnd={this.toggleShowOptions}
      >
        <div className={styles.dropdownTitle}>{this.props.title}</div>
        {this.state.showOptions && <div className={styles.dropdownOptions}>
          {
            this.props.options.map((option, index) => (
              <div
                key={index}
                className={styles.dropdownOption + (this.props.activeOption === option ? (" " + styles.activeOption) : "")}
                onClick={() => this.updateActiveOption(option)}
              >
                {option}
              </div>
            ))
          }
        </div>}
      </div>
    )}
}
