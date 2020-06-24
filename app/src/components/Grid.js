class Grid {
    constructor() {
        this.grid = []
    }
    getNeighbors(board, i, j) {
        const len = board.length;
        let count = 0;

        // Looping through offsets of the cell we are checking
        for (let x = -1; x <= 1; x++) {
            for (let y = -1; y <= 1; y++) {
                // If there is no offset we dont check the cell because it is the cell we are checking for neighbors
                if (!x && !y) {
                    continue;
                }
                const xi = x + i;
                const yj = y + j;

                // We check if the cell plus the offset is in bounds
                if (xi >= 0 && xi < len && yj >= 0 && yj < len) {
                    // If the cell at [xi] [yj] returns a truthy value it is alive so we increment count
                    if (board[xi][yj]) {
                        count += 1;
                    }
                }
            }
        }
        return count;
    }
    step(board) {
        // New board is made to house the next iteration of cell progression
        const newBoard = []
        const len = board.length

        // Create 2D grid by filling the new board with lists
        for (let i = 0; i < len; i++) {
            newBoard.push([])
            // Loop through each cell in grid and check neighbors to decide if cell is alive or dead
            for (let j = 0; j < len; j++) {
                const neighbors = this.getNeighbors(board, i, j);
                // Rules of Conway's Game of Life
                if (neighbors === 3 && !board[i][j]) {
                    newBoard[i][j] = 1;
                } else if ((neighbors === 2 || neighbors === 3) && board[i][j]) {
                    newBoard[i][j] = 1;
                } else {
                    newBoard[i][j] = 0;
                }
            }
        }
        this.grid = newBoard;
    }
    newBlankGrid(size) {
        // Creates new board
        console.log(size)
        this.grid = [];
        // Fills board with lists
        for (let i = 0; i < (size / 15); i++) {
            this.grid[i] = [];
            // Fills cells with 0, making all cells dead
            for (let j = 0; j < (size / 15); j++) {
                this.grid[i].push(0);
            }
        }
    }
    randomGrid(size) {
        // Creates new board
        this.grid = [];
        // Fills board with lists
        for (let i = 0; i < (size / 15); i++) {
            this.grid[i] = [];
            // Fills cells with random value between 0 and 1
            for (let j = 0; j < (size / 15); j++) {
                this.grid[i].push(Math.round(Math.random()))
            }
        }
    }
    // Preset board configurations
    initGlider() {
        this.newBlankGrid();
        this.grid[0][2] = 1;
        this.grid[1][0] = 1;
        this.grid[1][2] = 1;
        this.grid[2][1] = 1;
        this.grid[2][2] = 1;
    }
    initLightWeightSpaceShip() {
        this.newBlankGrid();
        this.grid[1][19] = 1;
        this.grid[1][21] = 1;
        this.grid[2][18] = 1;
        this.grid[3][18] = 1;
        this.grid[4][18] = 1;
        this.grid[4][21] = 1;
        this.grid[5][18] = 1;
        this.grid[5][19] = 1;
        this.grid[5][20] = 1;
    }
    init10CellRow() {
        this.newBlankGrid();
        this.grid[15][20] = 1;
        this.grid[16][20] = 1;
        this.grid[17][20] = 1;
        this.grid[18][20] = 1;
        this.grid[19][20] = 1;
        this.grid[20][20] = 1;
        this.grid[21][20] = 1;
        this.grid[22][20] = 1;
        this.grid[23][20] = 1;
        this.grid[24][20] = 1;
    }
    initCauldron() {
        this.newBlankGrid();
        this.grid[15][19] = 1;
        this.grid[15][20] = 1;
        this.grid[16][20] = 1;
        this.grid[17][19] = 1;
        this.grid[18][18] = 1;
        this.grid[18][20] = 1;
        this.grid[18][21] = 1;
        this.grid[18][22] = 1;
        this.grid[19][15] = 1;
        this.grid[19][18] = 1;
        this.grid[19][23] = 1;
        this.grid[19][25] = 1;
        this.grid[19][26] = 1;
        this.grid[20][14] = 1;
        this.grid[20][16] = 1;
        this.grid[20][18] = 1;
        this.grid[20][23] = 1;
        this.grid[20][25] = 1;
        this.grid[21][15] = 1;
        this.grid[21][18] = 1;
        this.grid[21][23] = 1;
        this.grid[21][26] = 1;
        this.grid[22][18] = 1;
        this.grid[22][20] = 1;
        this.grid[22][21] = 1;
        this.grid[22][22] = 1;
        this.grid[22][25] = 1;
        this.grid[22][26] = 1;
        this.grid[23][19] = 1;
        this.grid[24][20] = 1;
        this.grid[25][19] = 1;
        this.grid[25][20] = 1;
    }
    initPulsar() {
        this.newBlankGrid();
        this.grid[18][18] = 1;
        this.grid[18][19] = 1;
        this.grid[18][20] = 1;
        this.grid[18][21] = 1;
        this.grid[18][22] = 1;
        this.grid[20][18] = 1;
        this.grid[20][22] = 1;
        this.grid[22][18] = 1;
        this.grid[22][19] = 1;
        this.grid[22][20] = 1;
        this.grid[22][21] = 1;
        this.grid[22][22] = 1;
    }
    initRPentomino() {
        this.newBlankGrid();
        this.grid[28][31] = 1;
        this.grid[29][30] = 1;
        this.grid[29][31] = 1;
        this.grid[29][32] = 1;
        this.grid[30][30] = 1;
    }
    initQueenBee() {
        this.newBlankGrid();
        this.grid[18][17] = 1;
        this.grid[18][18] = 1;
        this.grid[18][22] = 1;
        this.grid[18][23] = 1;
        this.grid[19][19] = 1;
        this.grid[19][20] = 1;
        this.grid[19][21] = 1;
        this.grid[20][18] = 1;
        this.grid[20][22] = 1;
        this.grid[21][19] = 1;
        this.grid[21][21] = 1;
        this.grid[22][20] = 1;
    }
    initGosperGliderGun() {
        this.newBlankGrid();
        this.grid[2][17] = 1;
        this.grid[2][18] = 1;
        this.grid[3][17] = 1;
        this.grid[3][18] = 1;
        this.grid[12][17] = 1;
        this.grid[12][18] = 1;
        this.grid[12][19] = 1;
        this.grid[13][16] = 1;
        this.grid[13][20] = 1;
        this.grid[14][15] = 1;
        this.grid[14][21] = 1;
        this.grid[15][15] = 1;
        this.grid[15][21] = 1;
        this.grid[16][18] = 1;
        this.grid[17][16] = 1;
        this.grid[17][20] = 1;
        this.grid[18][17] = 1;
        this.grid[18][18] = 1;
        this.grid[18][19] = 1;
        this.grid[19][18] = 1;
        this.grid[22][15] = 1;
        this.grid[22][16] = 1;
        this.grid[22][17] = 1;
        this.grid[23][15] = 1;
        this.grid[23][16] = 1;
        this.grid[23][17] = 1;
        this.grid[24][14] = 1;
        this.grid[24][18] = 1;
        this.grid[26][13] = 1;
        this.grid[26][14] = 1;
        this.grid[26][18] = 1;
        this.grid[26][19] = 1;
        this.grid[36][15] = 1;
        this.grid[36][16] = 1;
        this.grid[37][15] = 1;
        this.grid[37][16] = 1;
    }
}

export default Grid;