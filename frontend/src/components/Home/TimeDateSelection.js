import React, { Component } from 'react'
import { connect } from 'react-redux'

import { updateSelectedFromDateTime, updateSelectedToDateTime } from '../../actions/uiReducerActions'

import MomentUtils from '@date-io/moment'; // used by and needed for the 'MuiPickersUtilsProvider'
import {
  DateTimePicker,
  MuiPickersUtilsProvider
} from "material-ui-pickers"; // offers a time and date selection component with a universal design. Made by MIT
                              // More info can be found at: https://material-ui.com/demos/pickers/

import styles from './TimeDateSelection.module.css'


function mapStateToProps(state) {
    return {
        currentSelectedFromDateTime: state.uiReducer.fromDateTime,
        currentSelectedToDateTime: state.uiReducer.toDateTime
    }
}

function mapDispatchToProps(dispatch) {
    return {
      updateSelectedFromDateTime: (currentSelectedFromDateTime) => dispatch(updateSelectedFromDateTime(currentSelectedFromDateTime)),
      updateSelectedToDateTime: (currentSelectedToDateTime) => dispatch(updateSelectedToDateTime(currentSelectedToDateTime)),
    }
  }


class TimeDateSelection extends Component {

    // to functions for handling change in the selected dates. Triggers a change in the store through the mapDispatchToProps function
    handleDateChangeFrom = (dateTime) => this.props.updateSelectedFromDateTime(dateTime)
    handleDateChangeTo = (dateTime) => this.props.updateSelectedToDateTime(dateTime)

    render() {

        return (
            <div className={styles.timeDatePickerContainer}>
              <div className={styles.timeDatePicker}>
                  <MuiPickersUtilsProvider utils={MomentUtils}>
                      <div className="pickers">
                          <DateTimePicker
                              label="From"
                              value={this.props.currentSelectedFromDateTime}
                              onChange={this.handleDateChangeFrom} />
                      </div>
                  </MuiPickersUtilsProvider>
                </div>
                <div className={styles.timeDatePicker}>
                  <MuiPickersUtilsProvider utils={MomentUtils}>
                      <div className="pickers">
                          <DateTimePicker
                              label="To"
                              value={this.props.currentSelectedToDateTime}
                              onChange={this.handleDateChangeTo} />
                      </div>
                  </MuiPickersUtilsProvider>
                </div>
            </div>
        )
    }
  }

  export default connect(mapStateToProps, mapDispatchToProps)(TimeDateSelection);
