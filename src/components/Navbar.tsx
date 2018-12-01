import * as React from 'react';

export default () => {

  return <nav className="navbar navbar-dark bg-dark">
    <span className="navbar-brand mb-0 h1">Game of Life</span>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div className="navbar-nav">
        <a className="nav-item nav-link" target="_blank" href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life#Rules">Game Rules</a>
        <a className="nav-item nav-link" target="_blank" href="https://github.com/James-Quigley/life">Source Code</a>
      </div>
    </div>
  </nav>
};
