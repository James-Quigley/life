import * as React from 'react';

export default () => {

  return <div className="modal fade" id="infoModal" role="dialog" aria-labelledby="infoModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="infoModalLabel">Game Rules</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        <h3>Click cells to toggle them!</h3>
        <p>
            Each <i>tick</i>, every cell interacts with its eight neighbours.
        </p>
        <p>If the cell is alive:</p>
        <ul>
            <li>&lt;2 live neighbors <span className="text-danger">dies</span></li>
            <li>2-3 live neighbors <span className="text-success">survives</span></li>
            <li>3+ live neighbors <span className="text-danger">dies</span></li>
        </ul>
        <p>If the cell is dead:</p>
        <ul>
            <li>Exactly 3 live neighbors becomes <span className="text-success">alive</span></li>
        </ul>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
};
