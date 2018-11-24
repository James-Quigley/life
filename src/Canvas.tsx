import * as React from 'react';
import Grid from './Grid';
import Cell from './Cell';

interface Props {
  gridSize: number
  cellSize: number
  grid: Grid
}

export default class extends React.PureComponent {
  props: Props;

  constructor(props: Props){
    super(props);
    this.props = props;
  }

  componentWillUpdate(nextProps: Props) {
    // @ts-ignore
    let canvas = this.refs.canvas.getContext('2d');
    if (canvas){
      for(let x = 0; x < nextProps.gridSize; x++){
        for (let y = 0; y < nextProps.gridSize; y++) {
          canvas.fillStyle = nextProps.grid.cells[x][y].alive ? "#5be018" : "#fff"
          canvas.fillRect(x * nextProps.cellSize, y * nextProps.cellSize, nextProps.cellSize, nextProps.cellSize);
        }
      }
    }
  }

  render() {
    
    return <canvas ref="canvas" width={(this.props.cellSize * this.props.gridSize)} height={(this.props.cellSize * this.props.gridSize)}/>;
  }
}
