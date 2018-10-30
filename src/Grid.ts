import Cell from './Cell';
export default class Grid {

    cells: Cell[][];
    size: number;
    aliveCells: {
        [key:string]:boolean
    }

    constructor(size: number) {
        this.size = size;
        this.aliveCells = {};

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
                        cell.neighbors.east = this.cells[x][y + 1];
                        cell.neighbors.southeast = this.cells[x + 1][y + 1];
                        cell.neighbors.south = this.cells[x + 1][y];
                    } else if (y == size - 1) {
                        cell.neighbors.west = this.cells[x][y - 1];
                        cell.neighbors.southwest = this.cells[x + 1][y - 1];
                        cell.neighbors.south = this.cells[x + 1][y];
                    } else {
                        cell.neighbors.east = this.cells[x][y + 1];
                        cell.neighbors.southeast = this.cells[x + 1][y + 1];
                        cell.neighbors.south = this.cells[x + 1][y];
                        cell.neighbors.southwest = this.cells[x + 1][y - 1];
                        cell.neighbors.west = this.cells[x][y - 1];
                    }
                } else if (x == size - 1) {
                    if (y == 0) {
                        cell.neighbors.north = this.cells[x - 1][y];
                        cell.neighbors.northeast = this.cells[x - 1][y + 1];
                        cell.neighbors.east = this.cells[x][y + 1];
                    } else if (y == size - 1) {
                        cell.neighbors.north = this.cells[x - 1][y];
                        cell.neighbors.northwest = this.cells[x - 1][y - 1];
                        cell.neighbors.west = this.cells[x][y - 1];
                    } else {
                        cell.neighbors.east = this.cells[x][y + 1];
                        cell.neighbors.northeast = this.cells[x - 1][y + 1];
                        cell.neighbors.north = this.cells[x - 1][y];
                        cell.neighbors.northwest = this.cells[x - 1][y - 1];
                        cell.neighbors.west = this.cells[x][y - 1];
                    }
                } else {
                    if (y == 0) {
                        cell.neighbors.east = this.cells[x][y + 1];
                        cell.neighbors.northeast = this.cells[x - 1][y + 1];
                        cell.neighbors.north = this.cells[x - 1][y];
                        cell.neighbors.southwest = this.cells[x + 1][y - 1];
                        cell.neighbors.south = this.cells[x + 1][y];
                        cell.neighbors.southeast = this.cells[x + 1][y + 1];
                    } else if (y == size - 1) {
                        cell.neighbors.north = this.cells[x - 1][y];
                        cell.neighbors.northwest = this.cells[x - 1][y - 1];
                        cell.neighbors.west = this.cells[x][y - 1];
                        cell.neighbors.southwest = this.cells[x + 1][y - 1];
                        cell.neighbors.south = this.cells[x + 1][y];
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

    toggleCellState(x: number, y: number) {
        const isAlive = this.cells[x][y].alive;
        this.setCellState(x, y, !isAlive);
        
    }

    setCellState(x: number, y: number, alive: boolean) {
        if (!alive){
            if (this.aliveCells[x + "." + y]){
                delete this.aliveCells[x + "." + y];
            }
        } else {
            this.aliveCells[x + "." + y] = true;
        }
        this.cells[x][y].alive = alive;
    }

    tick(): Grid {
        const start = Date.now();
        const grid = new Grid(this.size);
        const visitedCells: {[key:string]:boolean} = {};
        const cellsToVisit = [];
        for (const coord in this.aliveCells){
            // const coords = coord.split(".");
            // const intCoords = coords.map(parseInt);
            // const [x, y] = intCoords;
            const [x, y] = coord.split(".").map(num => parseInt(num));
            const cell = this.cells[x][y];
            visitedCells[coord] = true;
            for (const neighborDir of Object.keys(cell.neighbors)) {
                const neighbor = cell.neighbors[neighborDir];
                if (neighbor && !neighbor.alive){
                    cellsToVisit.push(neighbor.x + "." + neighbor.y);
                }
            }

            const shouldBeAlive = this.cells[x][y].shouldBeAlive();
            grid.cells[x][y].alive = shouldBeAlive;
            if (shouldBeAlive){
                grid.aliveCells[x + "." + y] = true;
            }
        }

        for (const coord of cellsToVisit){
            if (!visitedCells[coord]){
                const [x, y] = coord.split(".").map(num => parseInt(num));
                
                const cell = this.cells[x][y];
                visitedCells[coord] = true;

                const shouldBeAlive = this.cells[x][y].shouldBeAlive();
                grid.cells[x][y].alive = shouldBeAlive;
                if (shouldBeAlive){
                    grid.aliveCells[x + "." + y] = true;
                }
            }
        }

        console.log("Tick time", Date.now() - start);
        return grid;
    }
}
