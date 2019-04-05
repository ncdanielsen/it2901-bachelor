import React from "react"

import styles from "./App.module.css"

import { history } from "../store/configureStore"
import { Route, Switch, Redirect } from "react-router" // react-router v4
import { ConnectedRouter } from "connected-react-router"

import Header from "./Header"
import MainView from "./Home/MainView"
import Profile from "./Profile/Profile"
import About from "./About/About"
import Faq from "./FAQ/FAQ"
import Login from "./Login"

const App = () => (
  <div className={styles.App}>
    <Header /> {/*Header always visible on top*/}
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
        <Route render={() => <div>Unknown route</div>} />
      </Switch>
    </ConnectedRouter>
  </div>
)

export default App
