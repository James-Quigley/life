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
  const [getState, setState] = useState(defaultState);

  const toggleCell = (x: number, y: number) => {
    const newState = { ...getState, grid: new Grid(getState.size) };
    for (let index = 0; index < getState.grid.cells.length; index++) {
      const row = getState.grid.cells[index];
      for (let cellIndex = 0; cellIndex < row.length; cellIndex++) {
        const cell = row[cellIndex];
        newState.grid.cells[index][cellIndex].alive = getState.grid.cells[index][cellIndex].alive;
      }
    }
    newState.grid.cells[x][y].alive = !newState.grid.cells[x][y].alive;
    setState(newState);
  };

  const tick = () => {
    const newGrid = getState.grid.tick();
    setState({ ...getState, grid: newGrid, ticks: getState.ticks + 1 });
  }

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (getState.isAutoTicking){
      interval = setInterval(tick, 1000/getState.ticksPerSec);
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
              <GridControls getState={getState} setState={setState} />
              <GameControls getState={getState} setState={setState} tick={tick} />
            </div>
          </div>
        </div>
      </div>    

      <div className="text-center pagination-centered mt-2">
        <Canvas cellClick={toggleCell} gridSize={getState.size} cellSize={getState.cellSize} grid={getState.grid} isAutoTicking={getState.isAutoTicking} />
      </div>
    </div>
  );
};