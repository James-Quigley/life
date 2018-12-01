import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import AutoTick from './AutoTick';
import Grid from './Grid';
import Canvas from './Canvas';
import Navbar from './Navbar';

interface State {
  size: number
  grid: Grid
  ticksPerSec: number,
  isAutoTicking: boolean,
  ticks: number,
  cellSize: number
}

const gridSize = 20;

const defaultState: State = {
  size: gridSize,
  grid: new Grid(gridSize),
  ticksPerSec: 15,
  isAutoTicking: false,
  ticks: 0,
  cellSize: 10
};

class App extends React.Component<{}, State> {

  constructor(props: {}) {
    super(props);
    this.state = defaultState;
    this.tick = this.tick.bind(this);
    this.toggleCell = this.toggleCell.bind(this);
    this.clear = this.clear.bind(this);
  }

  tick() {
    const newGrid = this.state.grid.tick();
    this.setState({ ...this.state, grid: newGrid, ticks: this.state.ticks + 1 });
  }

  toggleCell(x: number, y: number) {
    const newState = { ...this.state, grid: new Grid(this.state.size) };
    for (let index = 0; index < this.state.grid.cells.length; index++) {
      const row = this.state.grid.cells[index];
      for (let cellIndex = 0; cellIndex < row.length; cellIndex++) {
        const cell = row[cellIndex];
        newState.grid.cells[index][cellIndex].alive = this.state.grid.cells[index][cellIndex].alive;
      }
    }
    newState.grid.cells[x][y].alive = !newState.grid.cells[x][y].alive;
    this.setState(newState);
  }

  clear() {
    this.setState({ grid: new Grid(this.state.size), isAutoTicking: false, ticks: 0 });
  }

  render() {
    return (
      <div>
        <Navbar />

        <div className="container">
          <div className="row">
            <div className="col-sm">
            <form>
              <h3>Grid Controls</h3>
              <div className="form-group">
                <label htmlFor="size">Grid Size: {this.state.size}</label>
                <input type="range" className="form-control-range" id="size" min="3" max="200" value={this.state.size} onChange={(e) => {
                  const newSize = parseInt(e.target.value);
                  this.setState({
                    size: newSize,
                    grid: new Grid(newSize),
                    isAutoTicking: false,
                    ticks: 0
                  })
                }} />
              </div>
              <div className="form-group">
                <label htmlFor="cellsize">Cell Size: {this.state.cellSize}</label>
                <input className="form-control-range" type="range" min="3" max="100" value={this.state.cellSize} name="cellsize" onChange={(e) => {
                  const newSize = parseInt(e.target.value);
                  this.setState({
                    cellSize: newSize
                  })
                }} />
              </div>
              <div className="form-group">
                <button type="button" className="btn btn-outline-warning" onClick={() => {
                  const grid = new Grid(this.state.size);

                  for (let x = 0; x < this.state.size; x++) {
                    for (let y = 0; y < this.state.size; y++) {
                      grid.cells[x][y].alive = Math.random() > .5;
                    }
                  }
                  this.setState({grid, isAutoTicking: false, ticks: 0});
                }}>Random</button>
                <button type="button" className="btn btn-outline-danger" onClick={() => this.clear()}>Clear</button>
              </div>
            </form>
            </div>
            <div className="col-sm">
                <h3>Game Controls</h3>
                <div className="form-group">
                  <label htmlFor="ticks">Ticks Per Second: {this.state.ticksPerSec}</label>
                  <input type="range" className="form-control-range" id="ticks" min="1" max="20" value={this.state.ticksPerSec} onChange={(e) => {
                    const tps = parseInt(e.target.value);
                    this.setState({
                      ...this.state,
                      ticksPerSec: tps
                    })
                  }} />
                </div>
                <div className="form-group">
                  <div className="btn-group">
                  <button className="btn btn-primary" disabled={this.state.isAutoTicking} onClick={this.tick}>Tick</button>
                  <button className="btn btn-primary" disabled={this.state.isAutoTicking} onClick={() => {
                    this.setState({
                      ...this.state,
                      isAutoTicking: true
                    })
                  }}>AutoTick</button>
                  <button className="btn btn-primary" disabled={!this.state.isAutoTicking} onClick={() => {
                    this.setState({
                      ...this.state,
                      isAutoTicking: false
                    })
                  }}>Stop</button>
                  </div>
                </div>
            </div>
          </div>
        </div>

        {this.state.isAutoTicking ? <AutoTick onTick={this.tick} interval={1000 / this.state.ticksPerSec} /> : ''}

        
        <br />
        <p>Ticks: {this.state.ticks}</p>
        <br />
        <Canvas cellClick={this.toggleCell} gridSize={this.state.size} cellSize={this.state.cellSize} grid={this.state.grid} isAutoTicking={this.state.isAutoTicking} />
      </div>
    );
  }

}

export default App;
