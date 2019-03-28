import React from 'react'

import styles from './MainView.module.css'

import { Route, Switch } from 'react-router' // react-router v4

import SideMenu from './SideMenu'
import Graph from './Graph'

import RefData from './RefData'
import MyData from './MyData'

const MainView = () => (
  <div className={styles.Content}>
    <SideMenu />
    <Switch>
      {/* The Switch checks which route matches current pathname, it returns only that child.
          It receives pathname as prop since it is a subcomponent of ConnectedRouter.
          Only paths starting with "/home/" will work here, since "/home/*" is already decided in App.js */}
      <Route exact path="/home" component={Graph} />
      <Route exact path="/home/refData" component={RefData} />
      <Route exact path="/home/myData" component={MyData} />
      <Route render={() => (<div>Unknown route</div>)} />
    </Switch>
  </div>
)

export default MainView