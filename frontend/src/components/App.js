import React from 'react'

import styles from './App.module.css'

import { history } from '../store/configureStore'
import { Route, Switch, Redirect } from 'react-router' // react-router v4
import { ConnectedRouter } from 'connected-react-router'

import Header from './Header'
import MainView from './Home/MainView'
import Profile from './Profile/Profile'
import About from './About/About'
import Login from './Login'

const App = () => (
  <div className={styles.App}>
    <Header />
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact path="/home/*" component={MainView} />
        <Route exact path="/about" component={About} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/" render={() => <Redirect to="/home/"/>} />
        <Route render={() => (<div>Unknown route</div>)} />
      </Switch>
    </ConnectedRouter>

  </div>
)

export default App
