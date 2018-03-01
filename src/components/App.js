import React, { Component } from 'react';

// App components
import Header from './Header'
import AnimeDex from './AnimeDex'

class App extends Component {
  render() {
    return (
      <div className="app">
        <Header />
        <AnimeDex />
      </div>
    )
  }
}

export default App
