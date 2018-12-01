import * as React from 'react';

interface Props {
    getState: any,
    setState: any,
    tick: () => void
}

export default ({ getState, setState, tick}: Props) => {
    return <div className="card">
    <div className="card-body">
      <div className="card-title">
        <h3>Game Controls</h3>
      </div>
      <div className="form-group">
        <label htmlFor="ticks">Ticks Per Second: {getState.ticksPerSec}</label>
        <input type="range" className="form-control-range custom-range" id="ticks" min="1" max="20" value={getState.ticksPerSec} onChange={(e) => {
          setState({
            ...getState,
            ticksPerSec: parseInt(e.target.value)
          })
        }} />
      </div>
      <div className="form-group">
        <p>Ticks: {getState.ticks}</p>
      </div>
      <div className="form-group">
        <div className="btn-group">
          <button className="btn btn-primary" disabled={getState.isAutoTicking} onClick={tick}>Tick</button>
          <button className="btn btn-success" disabled={getState.isAutoTicking} onClick={() => {
            setState({
              ...getState,
              isAutoTicking: true
            });
          }}>AutoTick</button>
          <button className="btn btn-danger" disabled={!getState.isAutoTicking} onClick={() => {
            setState({
              ...getState,
              isAutoTicking: false
            });
          }}>Stop</button>
        </div>
      </div>
    </div>
  </div>
};