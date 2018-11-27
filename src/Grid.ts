import Cell from './Cell';
export default class Grid {

    cells: Cell[][];
    size: number;

    constructor(size: number) {
        this.size = size;

        this.cells = [];
        // Create cell grid
        for (let x = 0; x < size; x++) {
            this.cells[x] = [];
            for (let y = 0; y < size; y++) {
                this.cells[x][y] = new Cell(x, y);
            }
        }

        // Add cell neighbors
        for (let x = 0; x < size; x++) {
            for (let y = 0; y < size; y++) {
                const cell = this.cells[x][y];
                if (x == 0) {
                    if (y == 0) {
                        cell.neighbors.north = this.cells[size - 1][y];
                        cell.neighbors.northeast = this.cells[size - 1][y + 1];
                        cell.neighbors.east = this.cells[x][y + 1];
                        cell.neighbors.southeast = this.cells[x + 1][y + 1];
                        cell.neighbors.south = this.cells[x + 1][y];
                        cell.neighbors.southwest = this.cells[x + 1][size - 1];
                        cell.neighbors.west = this.cells[x][size - 1];
                        cell.neighbors.northwest = this.cells[size - 1][size - 1];
                    } else if (y == size - 1) {
                        cell.neighbors.north = this.cells[size - 1][y];
                        cell.neighbors.northeast = this.cells[size - 1][0];
                        cell.neighbors.east = this.cells[x][0];
                        cell.neighbors.southeast = this.cells[x + 1][0];
                        cell.neighbors.south = this.cells[x + 1][y];
                        cell.neighbors.southwest = this.cells[x + 1][y - 1];
                        cell.neighbors.west = this.cells[x][y - 1];
                        cell.neighbors.northwest = this.cells[size - 1][y - 1];
                    } else {
                        cell.neighbors.north = this.cells[size - 1][y];
                        cell.neighbors.northeast = this.cells[size - 1][y + 1];
                        cell.neighbors.east = this.cells[x][y + 1];
                        cell.neighbors.southeast = this.cells[x + 1][y + 1];
                        cell.neighbors.south = this.cells[x + 1][y];
                        cell.neighbors.southwest = this.cells[x + 1][y - 1];
                        cell.neighbors.west = this.cells[x][y - 1];
                        cell.neighbors.northwest = this.cells[size - 1][y - 1];
                    }
                } else if (x == size - 1) {
                    if (y == 0) {
                        cell.neighbors.north = this.cells[x - 1][y];
                        cell.neighbors.northeast = this.cells[x - 1][y + 1];
                        cell.neighbors.east = this.cells[x][y + 1];
                        cell.neighbors.southeast = this.cells[0][y + 1];
                        cell.neighbors.south = this.cells[0][y];
                        cell.neighbors.southwest = this.cells[0][size - 1];
                        cell.neighbors.west = this.cells[x][size - 1];
                        cell.neighbors.northwest = this.cells[x - 1][size - 1];
                    } else if (y == size - 1) {
                        cell.neighbors.north = this.cells[x - 1][y];
                        cell.neighbors.northeast = this.cells[x - 1][0];
                        cell.neighbors.east = this.cells[x][0];
                        cell.neighbors.southeast = this.cells[0][0];
                        cell.neighbors.south = this.cells[0][y];
                        cell.neighbors.southwest = this.cells[0][y - 1];
                        cell.neighbors.west = this.cells[x][y - 1];
                        cell.neighbors.northwest = this.cells[x - 1][y - 1];
                    } else {
                        cell.neighbors.north = this.cells[x - 1][y];
                        cell.neighbors.northeast = this.cells[x - 1][y + 1];
                        cell.neighbors.east = this.cells[x][y + 1];
                        cell.neighbors.southeast = this.cells[0][y + 1];
                        cell.neighbors.south = this.cells[0][y];
                        cell.neighbors.southwest = this.cells[0][y - 1];
                        cell.neighbors.west = this.cells[x][y - 1];
                        cell.neighbors.northwest = this.cells[x - 1][y - 1];
                    }
                } else {
                    if (y == 0) {
                        cell.neighbors.north = this.cells[x - 1][y];
                        cell.neighbors.northeast = this.cells[x - 1][y + 1];
                        cell.neighbors.east = this.cells[x][y + 1];
                        cell.neighbors.southeast = this.cells[x + 1][y + 1];
                        cell.neighbors.south = this.cells[x + 1][y];
                        cell.neighbors.southwest = this.cells[x + 1][size - 1];
                        cell.neighbors.west = this.cells[x][size - 1];
                        cell.neighbors.northwest = this.cells[x - 1][size - 1];
                    } else if (y == size - 1) {
                        cell.neighbors.north = this.cells[x - 1][y];
                        cell.neighbors.northeast = this.cells[x - 1][0];
                        cell.neighbors.east = this.cells[x][0];
                        cell.neighbors.southeast = this.cells[x + 1][0];
                        cell.neighbors.south = this.cells[x + 1][y];
                        cell.neighbors.southwest = this.cells[x + 1][y - 1];
                        cell.neighbors.west = this.cells[x][y - 1];
                        cell.neighbors.northwest = this.cells[x - 1][y - 1];
                    } else {
                        cell.neighbors.east = this.cells[x][y + 1];
                        cell.neighbors.north = this.cells[x - 1][y];
                        cell.neighbors.northwest = this.cells[x - 1][y - 1];
                        cell.neighbors.west = this.cells[x][y - 1];
                        cell.neighbors.southwest = this.cells[x + 1][y - 1];
                        cell.neighbors.south = this.cells[x + 1][y];
                        cell.neighbors.northeast = this.cells[x - 1][y + 1];
                        cell.neighbors.southeast = this.cells[x + 1][y + 1];
                    }
                }
            }
        }
    }

    tick(): Grid {
        const grid = new Grid(this.size);
        for (let x = 0; x < this.size; x++) {
            for (let y = 0; y < this.size; y++) {
                grid.cells[x][y].alive = this.cells[x][y].shouldBeAlive();
            }
        }
        return grid;
    }
}
