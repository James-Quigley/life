import React, { useState, useEffect } from 'react';
import Grid from '../Grid';
import Canvas from './Canvas';
import Navbar from './Navbar';
import GridControls from './GridControls';
import GameControls from './GameControls';

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

export default () => {
  const [state, setState] = useState(defaultState);

  const toggleCell = (x: number, y: number) => {
    const newState = { ...state, grid: new Grid(state.size) };
    for (let index = 0; index < state.grid.cells.length; index++) {
      const row = state.grid.cells[index];
      for (let cellIndex = 0; cellIndex < row.length; cellIndex++) {
        const cell = row[cellIndex];
        newState.grid.cells[index][cellIndex].alive = state.grid.cells[index][cellIndex].alive;
      }
    }
    newState.grid.cells[x][y].alive = !newState.grid.cells[x][y].alive;
    setState(newState);
  };

  const tick = () => {
    const newGrid = state.grid.tick();
    setState({ ...state, grid: newGrid, ticks: state.ticks + 1 });
  }

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (state.isAutoTicking){
      interval = setInterval(tick, 1000/state.ticksPerSec);
    }

    return () => clearInterval(interval);
  })

  return (
    <div>
      <Navbar />

      <div className="container mt-4">
        <div className="row">
          <div className="col-sm">
            <div className="card-group">
              <GridControls getState={state} setState={setState} />
              <GameControls getState={state} setState={setState} tick={tick} />
            </div>
          </div>
        </div>
      </div>    

      <div className="text-center pagination-centered mt-2">
        <Canvas cellClick={toggleCell} gridSize={state.size} cellSize={state.cellSize} grid={state.grid} isAutoTicking={state.isAutoTicking} />
      </div>
    </div>
  );
};