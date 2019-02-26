import React, { Component } from 'react'
import './App.css'
import SideMenu from './SideMenu'
import Graph from './Graph'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="Header">
          ZEN logo and stuff up here
        </div>
        <div className="Content">
          <SideMenu />
          <Graph />
        </div>
      </div>
    )
  }
}

export default App
