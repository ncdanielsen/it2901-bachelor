import React, { Component } from 'react'
import { connect } from 'react-redux'

import './App.css'

import { history } from '../store/configureStore'
import { Route, Switch, Redirect } from 'react-router' // react-router v4
import { ConnectedRouter, push } from 'connected-react-router'

import SideMenu from './SideMenu'
import Graph from './Graph'

import RefData from './RefData'
import MyData from './MyData'


const MainView = () => (
  <div className="Content">
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

function mapStateToProps(state) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {
    push: (newUrl) => dispatch(push(newUrl))
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="Header">
          <div onClick={()=>this.props.push("/")} className="HeaderLogo link">
            <img src="zen.png" className="logo" alt="zen logo" />
            <img src="fme_farge.png" className="logo" alt="fme logo" />
            {/*<img src="ntnu.png" className="logo" />*/}
          </div>
          <div className="headerRightSide">
            <div onClick={()=>this.props.push("/about")} className="link">
              About
            </div>
            <div onClick={()=>this.props.push("/profile")} className="link">
              Profile
            </div>
          </div>
        </div>
        <ConnectedRouter history={history}>
          <Switch>
            <Route exact path="/home/*" component={MainView} />
            <Route exact path="/about" render={() => (<div>About</div>)} />
            <Route exact path="/profile" render={() => (<div>Profile</div>)} />
            <Route exact path="/login" render={() => (<div>Login</div>)} />
            <Route exact path="/" render={() => <Redirect to="/home/"/>} />
            <Route render={() => (<div>Unknown route</div>)} />
          </Switch>
        </ConnectedRouter>

      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
