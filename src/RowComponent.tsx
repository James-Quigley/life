import React from 'react';
import Cell from './Cell';
import CellComponent from './CellComponent';

interface Props {
    style: React.CSSProperties,
    row: Cell[],
    cellClick: (x: number, y: number) => void,
    started: boolean,
    cellSize: number
}

class RowComponent extends React.Component<Props, {}> {
    constructor(props: Props) {
        super(props);
    }

    shouldComponentUpdate(nextProps: Props) {
        if (this.props.cellSize != nextProps.cellSize){
            return true;
        }
        if (this.props.started != nextProps.started) {
            return true;
        }

        if (this.props.row.length != nextProps.row.length) {
            return true;
        }

        for (let index = 0; index < this.props.row.length; index++) {
            const oldCell = this.props.row[index];
            const newCell = nextProps.row[index];

            if (oldCell.alive != newCell.alive) {
                return true;
            }
        }
        return false;
    }

    render() {
        const cells = this.props.row.map(cell =>
            <CellComponent
                alive={cell.alive}
                onClick={() => this.props.cellClick(cell.x, cell.y)}
                key={cell.x + "." + cell.y}
                style={{ pointerEvents: this.props.started ? 'none' : 'auto', padding: 0, margin: 0, height: '0px' }}
                cellSize={this.props.cellSize}
            />
        );

        // return {[cells] <br />};
        return <div style={this.props.style}>
            { cells }
        </div >
    }

}

export default RowComponent;