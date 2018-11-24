import * as React from 'react';
import Grid from './Grid';
import Cell from './Cell';

interface Props {
  gridSize: number
  cellSize: number
  grid: Grid
  started: boolean
  cellClick: (x: number, y: number) => void
}

export default class extends React.PureComponent {
  props: Props;

  constructor(props: Props){
    super(props);
    this.props = props;
  }

  componentDidMount() {
    // console.log("DID MOUNT");
    // @ts-ignore
    let canvas = this.refs.canvas.getContext('2d');
    if (canvas){
      for(let x = 0; x < this.props.gridSize; x++){
        for (let y = 0; y < this.props.gridSize; y++) {
          canvas.fillStyle = "#ccc";
          canvas.fillRect(x * this.props.cellSize, y * this.props.cellSize, this.props.cellSize, this.props.cellSize);
          canvas.fillStyle = this.props.grid.cells[x][y].alive ? "#5be018" : "#fff"
          canvas.fillRect(x * this.props.cellSize + 1, y * this.props.cellSize + 1, this.props.cellSize - 2, this.props.cellSize - 2);
        }
      }
    }
  }

  componentDidUpdate() {
    // @ts-ignore
    let canvas = this.refs.canvas.getContext('2d');
    if (canvas){
      for(let x = 0; x < this.props.gridSize; x++){
        for (let y = 0; y < this.props.gridSize; y++) {
          // console.log("drawing cell");
          // @ts-ignore
          // this.refs.canvas.width = (this.props.cellSize * this.props.gridSize);
          // @ts-ignore
          // console.log(this.refs.canvas.width);
          // @ts-ignore
          // this.refs.canvas.height = (this.props.cellSize * this.props.gridSize);
          canvas.fillStyle = "#ccc";
          canvas.fillRect(x * this.props.cellSize, y * this.props.cellSize, this.props.cellSize, this.props.cellSize);
          canvas.fillStyle = this.props.grid.cells[x][y].alive ? "#5be018" : "#fff"
          canvas.fillRect(x * this.props.cellSize + 1, y * this.props.cellSize + 1, this.props.cellSize - 2, this.props.cellSize - 2);
        }
      }
    }
  }

  getCursorPosition(rect:ClientRect, event:React.MouseEvent) {
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;
    return {x, y}
}

  render() {
    // console.log("RENDER");
    // @ts-ignore
    return <canvas ref="canvas" onClick={(e) => {
      if (!this.props.started){
        const { x, y } = this.getCursorPosition(e.currentTarget.getBoundingClientRect(), e);
        const xIndex = Math.floor(x/this.props.cellSize);
        const yIndex = Math.floor(y/this.props.cellSize);

        this.props.cellClick(xIndex, yIndex);
      }
    }} width={(this.props.cellSize * this.props.gridSize)} height={(this.props.cellSize * this.props.gridSize)}/>;
  }
}
