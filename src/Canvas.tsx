import * as React from 'react';
import Grid from './Grid';

const { useRef } = React;

interface Props {
  gridSize: number
  cellSize: number
  grid: Grid
  cellClick: (x: number, y: number) => void,
  isAutoTicking: boolean
}

const getCursorPosition = (rect:ClientRect, event:React.MouseEvent) => {
  var x = event.clientX - rect.left;
  var y = event.clientY - rect.top;
  return {x, y}
}

export default React.memo((props: Props)=>{

  const canvasRef: any = useRef(null);
  
  requestAnimationFrame(() => {
    const canvas = canvasRef.current.getContext('2d');
    for(let x = 0; x < props.gridSize; x++){
      for (let y = 0; y < props.gridSize; y++) {
        canvas.fillStyle = "#ccc";
        canvas.fillRect(y * props.cellSize, x * props.cellSize, props.cellSize, props.cellSize);
        canvas.fillStyle = props.grid.cells[x][y].alive ? "#5be018" : "#fff"
        canvas.fillRect(y * props.cellSize + 1, x * props.cellSize + 1, props.cellSize - 2, props.cellSize - 2);
      }
    }
  });

  return <canvas ref={canvasRef} onClick={(e) => {
    if (!props.isAutoTicking){
      const { x, y } = getCursorPosition(e.currentTarget.getBoundingClientRect(), e);
      const xIndex = Math.floor(y/props.cellSize);
      const yIndex = Math.floor(x/props.cellSize);

      props.cellClick(xIndex, yIndex);
    }
  }} width={(props.cellSize * props.gridSize)} height={(props.cellSize * props.gridSize)}/>;
})
