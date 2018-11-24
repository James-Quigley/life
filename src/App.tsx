import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import AutoTick from './AutoTick';
import CellComponent from './CellComponent';
import RowComponent from './RowComponent';
import Cell from './Cell';
import Grid from './Grid';
import Canvas from './Canvas';

interface State {
  size: number
  grid: Grid
  started: boolean,
  ticksPerSec: number,
  isAutoTicking: boolean,
  ticks: number,
  cellSize: number
}

const gridSize = 20;

const defaultState: State = {
  size: gridSize,
  grid: new Grid(gridSize),
  started: false,
  ticksPerSec: 15,
  isAutoTicking: false,
  ticks: 0,
  cellSize: 10
};

class App extends React.Component<{}, State> {

  constructor(props: {}) {
    super(props);
    this.state = defaultState;
    this.getButtonStyle = this.getButtonStyle.bind(this);
    this.tick = this.tick.bind(this);
    this.toggleCell = this.toggleCell.bind(this);
    this.clear = this.clear.bind(this);
  }

  getButtonStyle() {
    return this.state.started ? { pointerEvents: 'none' } : { pointerEvents: 'auto' };
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
    this.setState({ grid: new Grid(this.state.size), isAutoTicking: false, started: false, ticks: 0 });
  }

  render() {
    return (
      <div>

        {this.state.isAutoTicking ? <AutoTick onTick={this.tick} interval={1000 / this.state.ticksPerSec} /> : ''}

        <label htmlFor="size">Grid Size: {this.state.size}</label>
        <br />
        <input type="range" min="3" max="200" value={this.state.size} name="size" onChange={(e) => {
          const newSize = parseInt(e.target.value);
          this.setState({
            size: newSize,
            grid: new Grid(newSize),
            isAutoTicking: false
          })
        }} />
        <br />

        <label htmlFor="cellsize">Cell Size: {this.state.cellSize}</label>
        <br />
        <input type="range" min="3" max="100" value={this.state.cellSize} name="cellsize" onChange={(e) => {
          const newSize = parseInt(e.target.value);
          this.setState({
            cellSize: newSize
          })
        }} />
        <br />


        <label htmlFor="ticks">Ticks Per Second: {this.state.ticksPerSec}</label>
        <br />
        <input type="range" min="1" max="20" value={this.state.ticksPerSec} name="ticks" onChange={(e) => {
          const tps = parseInt(e.target.value);
          this.setState({
            ...this.state,
            ticksPerSec: tps
          })
        }} />
        <br />
        <button disabled={this.state.started} onClick={() => this.setState({ ...this.state, started: true })}>Start</button>
        <button disabled={!this.state.started} onClick={this.tick}>Tick</button>
        <button disabled={!this.state.started || (this.state.isAutoTicking && this.state.started)} onClick={() => {
          this.setState({
            ...this.state,
            isAutoTicking: true
          })
        }}>AutoTick</button>
        <button disabled={!this.state.started || (!this.state.isAutoTicking && this.state.started)} onClick={() => {
          this.setState({
            ...this.state,
            isAutoTicking: false
          })
        }}>Stop</button>
        <button onClick={() => this.clear()}>Clear</button>

        <button onClick={() => {
          const grid = new Grid(this.state.size);

          for (let x = 0; x < this.state.size; x++) {
            for (let y = 0; y < this.state.size; y++) {
              grid.cells[x][y].alive = Math.random() > .5;
            }
          }
          this.setState({grid, isAutoTicking: false, started: false, ticks: 0});
        }}>Random</button>
        <br />
        <p>Ticks: {this.state.ticks}</p>
        <br />
        <Canvas gridSize={this.state.size} cellSize={this.state.cellSize} grid={this.state.grid} />
        {/* {
          this.state.grid.cells.map((arr) =>
            <RowComponent cellClick={this.toggleCell} key={arr[0].x} style={{ padding: 0, margin: 0, height: `${this.state.cellSize + 2}px` }} cellSize={this.state.cellSize} row={arr} started={this.state.started} />
          )
        } */}
      </div>
    );
  }

}

export default App;
