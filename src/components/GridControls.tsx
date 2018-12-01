import * as React from 'react';
import Grid from '../Grid';

interface Props {
    getState: any,
    setState: any
}

export default ({ getState, setState }: Props) => {
    return <div className="card">
    <div className="card-body">
      <form>
        <div className="card-title">
          <h3>Grid Controls</h3>
        </div>
        <div className="form-group">
          <label htmlFor="size">Grid Size: {getState.size}</label>
          <input type="range" className="form-control-range custom-range" id="size" min="3" max="200" value={getState.size} onChange={(e) => {
            const newSize = parseInt(e.target.value);
            setState({
              ...getState,
              size: newSize,
              grid: new Grid(newSize),
              isAutoTicking: false,
              ticks: 0
            })
          }} />
        </div>
        <div className="form-group">
          <label htmlFor="cellsize">Cell Size: {getState.cellSize}</label>
          <input className="form-control-range custom-range" type="range" min="3" max="100" value={getState.cellSize} name="cellsize" onChange={(e) => {
            const newSize = parseInt(e.target.value);
            setState({
              ...getState,
              cellSize: newSize
            })
          }} />
        </div>
        <div className="form-group">
          <div className="btn-group">
            <button type="button" className="btn btn-warning" onClick={() => {
              const grid = new Grid(getState.size);

              for (let x = 0; x < getState.size; x++) {
                for (let y = 0; y < getState.size; y++) {
                  grid.cells[x][y].alive = Math.random() > .5;
                }
              }
              setState({ ...getState, grid, isAutoTicking: false, ticks: 0 });
            }}>Random</button>
            <button type="button" className="btn btn-danger" onClick={() => setState({ ...getState, grid: new Grid(getState.size), isAutoTicking: false, ticks: 0 })}>Clear</button>
          </div>
        </div>
      </form>
    </div>
  </div>
}