import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

const aliveStyle = {
  backgroundColor: "#5be018"
}

const gridSize = 20;
function App() {
  const [state, setState] = useState({
    grid: new Grid(gridSize),
    started: false
  });

  const gridStr = state.grid.cells.map(arr =>
    <tr key={arr[0].x}>
      {arr.map(cell =>
        <td key={cell.x + "" + cell.y}>
          <button style={cell.alive ? aliveStyle : {}} disabled={state.started} onClick={() => {
            const newState = state;
            newState.grid.cells[cell.x][cell.y].alive = !newState.grid.cells[cell.x][cell.y].alive;
            setState(newState);
          }}>
            {cell.alive ? 1 : 0}
          </button>
        </td>
      )}
    </tr>
  );
  return (
    <div>
      <table>
        <tbody>
          {gridStr}
        </tbody>
      </table>

      <button disabled={state.started} onClick={() => setState({ ...state, started: true })}>Start</button>
      <button disabled={!state.started} onClick={() => {
        const newState = state;
        state.grid.tick();
        newState.grid.cells = state.grid.cells;
        setState(newState);
      }}>Tick</button>
      <button onClick={() => {
        setState({
          grid: new Grid(gridSize),
          started: false
        })
      }}>Reset</button>
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
    const grid = new Grid(gridSize);
    for (let x = 0; x < this.size; x++) {
      for (let y = 0; y < this.size; y++) {
        grid.cells[x][y].alive = this.cells[x][y].shouldBeAlive();
      }
    }
    this.cells = grid.cells;
  }
}