export default class Cell {
    neighbors: {
        northeast: Cell | null,
        north: Cell | null,
        northwest: Cell | null,
        west: Cell | null,
        southwest: Cell | null,
        south: Cell | null,
        southeast: Cell | null,
        east: Cell | null,
        [key: string]: Cell | null,
    };
    alive: boolean;
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.alive = false;
        this.neighbors = {
            northeast: null,
            north: null,
            northwest: null,
            west: null,
            southwest: null,
            south: null,
            southeast: null,
            east: null
        }
        this.x = x;
        this.y = y;
    }
    countAliveNeighbors(): number {
        let count = 0;
        for (const neighbor of Object.keys(this.neighbors)) {
            if (this.neighbors[neighbor] != null && this.neighbors[neighbor]!.alive) {
                count++;
            }
        }
        return count;
    }

    shouldBeAlive(): boolean {
        const aliveNeighbors = this.countAliveNeighbors();
        let alive = false;
        if (!this.alive) {
            if (aliveNeighbors == 3) {
                alive = true;
            }
        } else {
            if (aliveNeighbors >= 2 && aliveNeighbors <= 3) {
                alive = true;
            }
        }
        return alive;
    }
}