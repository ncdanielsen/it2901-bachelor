import React, { Component } from 'react'
import { connect } from 'react-redux'

import { updateSelectedFromDateTime, updateSelectedToDateTime } from '../../actions/uiReducerActions'

//import moment from 'moment'
import MomentUtils from '@date-io/moment';
import {
  DateTimePicker,
  MuiPickersUtilsProvider
} from "material-ui-pickers";

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

    handleDateChangeFrom = (dateTime) => this.props.updateSelectedFromDateTime(dateTime)
    handleDateChangeTo = (dateTime) => this.props.updateSelectedToDateTime(dateTime)

    render() {

        //console.log(this.props.currentSelectedFromDateTime.unix())

        return (
            <div className={styles.timeDatePicker}>
                <MuiPickersUtilsProvider utils={MomentUtils}>
                    <div className="pickers">
                        <DateTimePicker 
                            label="From" 
                            value={this.props.currentSelectedFromDateTime} 
                            onChange={this.handleDateChangeFrom} />
                    </div>
                </MuiPickersUtilsProvider>
                <MuiPickersUtilsProvider utils={MomentUtils}>
                    <div className="pickers">
                        <DateTimePicker 
                            label="To" 
                            value={this.props.currentSelectedToDateTime} 
                            onChange={this.handleDateChangeTo} />
                    </div>
                </MuiPickersUtilsProvider>
            </div>
        )
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(TimeDateSelection);