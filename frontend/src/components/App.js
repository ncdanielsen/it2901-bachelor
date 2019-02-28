import React, { Component } from 'react'
import './App.css'
import SideMenu from './SideMenu'
import Graph from './Graph'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="Header">
          <img src="zen.png" className="logo" />
          <img src="fme_farge.png" className="logo" />
          {/*<img src="ntnu.png" className="logo" />*/}
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
