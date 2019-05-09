import React, { Component } from "react"
import { connect } from "react-redux"

import styles from "./App.module.css"

import { history } from "../store/configureStore"
import { Route, Switch, Redirect } from "react-router" // react-router v4
import { ConnectedRouter } from "connected-react-router"

import axios from 'axios'
import { getCookie } from '../utils'
import { logout } from '../actions/serverReducerActions'

import MainView from "./Home/MainView"
import Profile from "./Profile/Profile"
import About from "./About/About"
import Faq from "./FAQ/FAQ"
import Login from "./Login"
import ContainerWithSideMenu from './ContainerWithSideMenu'

function mapStateToProps(state) {
  const pathname = state.router.location.pathname
  return {
    isLoggedIn: state.serverReducer.isLoggedIn,
    isInLoginView: pathname === "/login"
  }
}

function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(logout())
  }
}

class App extends Component {

  componentWillMount() {
    // check if token is valid
    const tokenFromCookie = getCookie("access_token")
    if (tokenFromCookie !== "") {
      axios
        .get("http://localhost:4000/users/")
        .then(res => {
          // all is fine
        })
        .catch(err => {
          this.props.logout()
        })
    }
  }

  render () {
    if (!this.props.isLoggedIn) {
      return (
        <ConnectedRouter history={history}>
          <Switch>
            {!this.props.isInLoginView && <Redirect from='/' to='/login'/>}
            <Route exact path="/login" component={Login} />
            <Route render={() => <div>Unknown route</div>} />
          </Switch>
        </ConnectedRouter>
      )
    } else {
      return (
        <div className={styles.App}>
          <ContainerWithSideMenu>
            <ConnectedRouter history={history}>
              <Switch>
                {" "}
                {/* Checks which route matches current pathname, returns only that child */}
                <Route exact path="/home/*" component={MainView} />{" "}
                {/* the * is there because /home/ also has subviews linked to pathname */}
                <Route exact path="/about" component={About} />
                <Route exact path="/profile" component={Profile} />
                <Route exact path="/faq" component={Faq} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/" render={() => <Redirect to="/home/" />} />{" "}
                {/* When going to "/", go to /home. When Login stuff ready, send to Login if not logged in */}
                <Route render={() => <div>Unknown route App</div>} />
              </Switch>
            </ConnectedRouter>
          </ContainerWithSideMenu>
        </div>
      )
    }
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
