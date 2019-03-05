import React from 'react'

import styles from './MainView.module.css'

import { history } from '../../store/configureStore'
import { Route, Switch } from 'react-router' // react-router v4
import { ConnectedRouter } from 'connected-react-router'

import SideMenu from './SideMenu'
import Graph from './Graph'

import RefData from './RefData'
import MyData from './MyData'

const MainView = () => (
  <div className={styles.Content}>
    <SideMenu />
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact path="/home" component={Graph} />
        <Route exact path="/home/refData" component={RefData} />
        <Route exact path="/home/myData" component={MyData} />
        <Route render={() => (<div>Unknown route</div>)} />
      </Switch>
    </ConnectedRouter>
  </div>
)

export default MainView
