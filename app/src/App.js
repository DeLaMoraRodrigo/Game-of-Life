import React, { Component } from 'react';

import './App.css';
import Canvas from "./components/Canvas";

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Conway's Game of Life</h1>
        <Canvas />
      </div>
    )
  }
}

export default App;
