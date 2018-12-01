import * as React from 'react';
import InfoModal from './InfoModal';

export default () => {

  return <div>
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <span className="navbar-brand mb-0 h1">Game of Life</span>
      <div className="collapse navbar-collapse">
        <div className="navbar-nav">
          <a className="nav-item nav-link" data-toggle="modal" data-target="#infoModal">Game Rules</a>
          <a className="nav-item nav-link" target="_blank" href="https://github.com/James-Quigley/life">Source Code</a>
        </div>
      </div>
    </nav>
    <InfoModal />
  </div>
};
