import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import AutoTick from './AutoTick';
import CellComponent from './CellComponent';

interface State {
  size: number
  grid: Grid
  started: boolean,
  ticksPerSec: number,
  isAutoTicking: boolean,
  ticks: number
}

const gridSize = 20;
function App() {

  const defaultState: State = {
    size: gridSize,
    grid: new Grid(gridSize),
    started: false,
    ticksPerSec: 15,
    isAutoTicking: false,
    ticks: 0
  };

  const [state, setState] = useState(defaultState);



  const tick = function () {
    const newState = state;
    state.grid.tick();
    newState.grid.cells = state.grid.cells;
    newState.ticks++;
    setState(newState);
  }

  const buttonStyle = state.started ? { pointerEvents: 'none' } : { pointerEvents: 'auto' };

  const gridStr = state.grid.cells.map(arr =>
    <tr key={arr[0].x} style={{ padding: 0, margin: 0, height: '1px' }}>
      {arr.map(cell =>
        <td onClick={() => {
          const newState = state;
          newState.grid.cells[cell.x][cell.y].alive = !newState.grid.cells[cell.x][cell.y].alive;
          setState(newState);
        }} key={cell.x + "" + cell.y} style={{ pointerEvents: state.started ? 'none' : 'auto', padding: 0, margin: 0, height: '0px' }}>
          <CellComponent alive={cell.alive} started={state.started} />
        </td>
      )}
    </tr>
  );

  const autoTicker = state.isAutoTicking ? <AutoTick onTick={tick} interval={1000 / state.ticksPerSec} /> : ''
  return (
    <div>

      {autoTicker}

      <label htmlFor="size">Grid Size: {state.size}</label>
      <br />
      <input type="range" min="3" max="75" value={state.size} name="size" onChange={(e) => {
        const newSize = parseInt(e.target.value);
        setState({
          ...defaultState,
          size: newSize,
          grid: new Grid(newSize)
        })
      }} />
      <br />
      <label htmlFor="ticks">Ticks Per Second: {state.ticksPerSec}</label>
      <br />
      <input type="range" min="1" max="20" value={state.ticksPerSec} name="ticks" onChange={(e) => {
        const tps = parseInt(e.target.value);
        setState({
          ...state,
          ticksPerSec: tps
        })
      }} />
      <br />
      <button disabled={state.started} onClick={() => setState({ ...state, started: true })}>Start</button>
      <button disabled={!state.started} onClick={tick}>Tick</button>
      <button disabled={!state.started || (state.isAutoTicking && state.started)} onClick={() => {
        setState({
          ...state,
          isAutoTicking: true
        })
      }}>AutoTick</button>
      <button disabled={!state.started || (!state.isAutoTicking && state.started)} onClick={() => {
        setState({
          ...state,
          isAutoTicking: false
        })
      }}>Stop</button>
      <button onClick={() => {
        setState(defaultState)
      }}>Reset</button>

      <button onClick={() => {
        const newState = defaultState;
        newState.size = state.size;
        newState.grid = new Grid(state.size);

        for (let x = 0; x < newState.size; x++) {
          for (let y = 0; y < newState.size; y++) {
            newState.grid.cells[x][y].alive = Math.random() > .5
          }
        }
        setState(newState);
      }}>Random</button>
      <br />
      <p>Ticks: {state.ticks}</p>

      <table>
        <tbody>
          {gridStr}
        </tbody>
      </table>
    </div>
  );
}

export default App;

class Cell {
  neighbors: {
    northeast: Cell | null,
    north: Cell | null,
    northwest: Cell | null,
    west: Cell | null,
    southwest: Cell | null,
    south: Cell | null,
    southeast: Cell | null,
    east: Cell | null,
    [key: string]: Cell | null,
  };
  alive: boolean;
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.alive = false;
    this.neighbors = {
      northeast: null,
      north: null,
      northwest: null,
      west: null,
      southwest: null,
      south: null,
      southeast: null,
      east: null
    }
    this.x = x;
    this.y = y;
  }
  countAliveNeighbors(): number {
    let count = 0;
    for (const neighbor of Object.keys(this.neighbors)) {
      if (this.neighbors[neighbor] != null && this.neighbors[neighbor]!.alive) {
        count++;
      }
    }
    return count;
  }

  shouldBeAlive(): boolean {
    const aliveNeighbors = this.countAliveNeighbors();
    let alive = false;
    if (!this.alive) {
      if (aliveNeighbors == 3) {
        alive = true;
      }
    } else {
      if (aliveNeighbors >= 2 && aliveNeighbors <= 3) {
        alive = true;
      }
    }
    return alive;
  }
}

class Grid {

  cells: Cell[][];
  size: number;

  constructor(size: number) {
    this.size = size;

    this.cells = [];
    // Create cell grid
    for (let x = 0; x < size; x++) {
      this.cells[x] = [];
      for (let y = 0; y < size; y++) {
        this.cells[x][y] = new Cell(x, y);
      }
    }

    // Add cell neighbors
    for (let x = 0; x < size; x++) {
      for (let y = 0; y < size; y++) {
        const cell = this.cells[x][y];
        if (x == 0) {
          if (y == 0) {
            cell.neighbors.east = this.cells[x][y + 1];
            cell.neighbors.southeast = this.cells[x + 1][y + 1];
            cell.neighbors.south = this.cells[x + 1][y];
          } else if (y == size - 1) {
            cell.neighbors.west = this.cells[x][y - 1];
            cell.neighbors.southwest = this.cells[x + 1][y - 1];
            cell.neighbors.south = this.cells[x + 1][y];
          } else {
            cell.neighbors.east = this.cells[x][y + 1];
            cell.neighbors.southeast = this.cells[x + 1][y + 1];
            cell.neighbors.south = this.cells[x + 1][y];
            cell.neighbors.southwest = this.cells[x + 1][y - 1];
            cell.neighbors.west = this.cells[x][y - 1];
          }
        } else if (x == size - 1) {
          if (y == 0) {
            cell.neighbors.north = this.cells[x - 1][y];
            cell.neighbors.northeast = this.cells[x - 1][y + 1];
            cell.neighbors.east = this.cells[x][y + 1];
          } else if (y == size - 1) {
            cell.neighbors.north = this.cells[x - 1][y];
            cell.neighbors.northwest = this.cells[x - 1][y - 1];
            cell.neighbors.west = this.cells[x][y - 1];
          } else {
            cell.neighbors.east = this.cells[x][y + 1];
            cell.neighbors.northeast = this.cells[x - 1][y + 1];
            cell.neighbors.north = this.cells[x - 1][y];
            cell.neighbors.northwest = this.cells[x - 1][y - 1];
            cell.neighbors.west = this.cells[x][y - 1];
          }
        } else {
          if (y == 0) {
            cell.neighbors.east = this.cells[x][y + 1];
            cell.neighbors.northeast = this.cells[x - 1][y + 1];
            cell.neighbors.north = this.cells[x - 1][y];
            cell.neighbors.southwest = this.cells[x + 1][y - 1];
            cell.neighbors.south = this.cells[x + 1][y];
            cell.neighbors.southeast = this.cells[x + 1][y + 1];
          } else if (y == size - 1) {
            cell.neighbors.north = this.cells[x - 1][y];
            cell.neighbors.northwest = this.cells[x - 1][y - 1];
            cell.neighbors.west = this.cells[x][y - 1];
            cell.neighbors.southwest = this.cells[x + 1][y - 1];
            cell.neighbors.south = this.cells[x + 1][y];
          } else {
            cell.neighbors.east = this.cells[x][y + 1];
            cell.neighbors.north = this.cells[x - 1][y];
            cell.neighbors.northwest = this.cells[x - 1][y - 1];
            cell.neighbors.west = this.cells[x][y - 1];
            cell.neighbors.southwest = this.cells[x + 1][y - 1];
            cell.neighbors.south = this.cells[x + 1][y];
            cell.neighbors.northeast = this.cells[x - 1][y + 1];
            cell.neighbors.southeast = this.cells[x + 1][y + 1];
          }
        }
      }
    }
  }

  tick(): void {
    const grid = new Grid(this.size);
    for (let x = 0; x < this.size; x++) {
      for (let y = 0; y < this.size; y++) {
        grid.cells[x][y].alive = this.cells[x][y].shouldBeAlive();
      }
    }
    this.cells = grid.cells;
  }
}