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
    initGlider(size) {
        this.newBlankGrid(size);
        this.grid[0][2] = 1;
        this.grid[1][0] = 1;
        this.grid[1][2] = 1;
        this.grid[2][1] = 1;
        this.grid[2][2] = 1;
    }
    initLightWeightSpaceShipSmall(size) {
        this.newBlankGrid(size);
        this.grid[1][10] = 1;
        this.grid[1][12] = 1;
        this.grid[2][9] = 1;
        this.grid[3][9] = 1;
        this.grid[4][9] = 1;
        this.grid[4][12] = 1;
        this.grid[5][9] = 1;
        this.grid[5][10] = 1;
        this.grid[5][11] = 1;
    }
    initLightWeightSpaceShipMedium(size) {
        this.newBlankGrid(size);
        this.grid[1][15] = 1;
        this.grid[1][17] = 1;
        this.grid[2][14] = 1;
        this.grid[3][14] = 1;
        this.grid[4][14] = 1;
        this.grid[4][17] = 1;
        this.grid[5][14] = 1;
        this.grid[5][15] = 1;
        this.grid[5][16] = 1;
    }
    initLightWeightSpaceShipLarge(size) {
        this.newBlankGrid(size);
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
    init10CellRowSmall(size) {
        this.newBlankGrid(size);
        this.grid[5][10] = 1;
        this.grid[6][10] = 1;
        this.grid[7][10] = 1;
        this.grid[8][10] = 1;
        this.grid[9][10] = 1;
        this.grid[10][10] = 1;
        this.grid[11][10] = 1;
        this.grid[12][10] = 1;
        this.grid[13][10] = 1;
        this.grid[14][10] = 1;
    }
    init10CellRowMedium(size) {
        this.newBlankGrid(size);
        this.grid[10][15] = 1;
        this.grid[11][15] = 1;
        this.grid[12][15] = 1;
        this.grid[13][15] = 1;
        this.grid[14][15] = 1;
        this.grid[15][15] = 1;
        this.grid[16][15] = 1;
        this.grid[17][15] = 1;
        this.grid[18][15] = 1;
        this.grid[19][15] = 1;
    }
    init10CellRowLarge(size) {
        this.newBlankGrid(size);
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
    initCauldronSmall(size) {
        this.newBlankGrid(size);
        this.grid[5][9] = 1;
        this.grid[5][10] = 1;
        this.grid[6][10] = 1;
        this.grid[7][9] = 1;
        this.grid[8][8] = 1;
        this.grid[8][10] = 1;
        this.grid[8][11] = 1;
        this.grid[8][12] = 1;
        this.grid[9][5] = 1;
        this.grid[9][8] = 1;
        this.grid[9][13] = 1;
        this.grid[9][15] = 1;
        this.grid[9][16] = 1;
        this.grid[10][4] = 1;
        this.grid[10][6] = 1;
        this.grid[10][8] = 1;
        this.grid[10][13] = 1;
        this.grid[10][15] = 1;
        this.grid[11][5] = 1;
        this.grid[11][8] = 1;
        this.grid[11][13] = 1;
        this.grid[11][16] = 1;
        this.grid[12][8] = 1;
        this.grid[12][10] = 1;
        this.grid[12][11] = 1;
        this.grid[12][12] = 1;
        this.grid[12][15] = 1;
        this.grid[12][16] = 1;
        this.grid[13][9] = 1;
        this.grid[14][10] = 1;
        this.grid[15][9] = 1;
        this.grid[15][10] = 1;
    }
    initCauldronMedium(size) {
        this.newBlankGrid(size);
        this.grid[10][14] = 1;
        this.grid[10][15] = 1;
        this.grid[11][15] = 1;
        this.grid[12][14] = 1;
        this.grid[13][13] = 1;
        this.grid[13][15] = 1;
        this.grid[13][16] = 1;
        this.grid[13][17] = 1;
        this.grid[14][10] = 1;
        this.grid[14][13] = 1;
        this.grid[14][18] = 1;
        this.grid[14][20] = 1;
        this.grid[14][21] = 1;
        this.grid[15][9] = 1;
        this.grid[15][11] = 1;
        this.grid[15][13] = 1;
        this.grid[15][18] = 1;
        this.grid[15][20] = 1;
        this.grid[16][10] = 1;
        this.grid[16][13] = 1;
        this.grid[16][18] = 1;
        this.grid[16][21] = 1;
        this.grid[17][13] = 1;
        this.grid[17][15] = 1;
        this.grid[17][16] = 1;
        this.grid[17][17] = 1;
        this.grid[17][20] = 1;
        this.grid[17][21] = 1;
        this.grid[18][14] = 1;
        this.grid[19][15] = 1;
        this.grid[20][14] = 1;
        this.grid[20][15] = 1;
    }
    initCauldronLarge(size) {
        this.newBlankGrid(size);
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
    initPulsarSmall(size) {
        this.newBlankGrid(size);
        this.grid[8][8] = 1;
        this.grid[8][9] = 1;
        this.grid[8][10] = 1;
        this.grid[8][11] = 1;
        this.grid[8][12] = 1;
        this.grid[10][8] = 1;
        this.grid[10][12] = 1;
        this.grid[12][8] = 1;
        this.grid[12][9] = 1;
        this.grid[12][10] = 1;
        this.grid[12][11] = 1;
        this.grid[12][12] = 1;
    }
    initPulsarMedium(size) {
        this.newBlankGrid(size);
        this.grid[13][13] = 1;
        this.grid[13][14] = 1;
        this.grid[13][15] = 1;
        this.grid[13][16] = 1;
        this.grid[13][17] = 1;
        this.grid[15][13] = 1;
        this.grid[15][17] = 1;
        this.grid[17][13] = 1;
        this.grid[17][14] = 1;
        this.grid[17][15] = 1;
        this.grid[17][16] = 1;
        this.grid[17][17] = 1;
    }
    initPulsarLarge(size) {
        this.newBlankGrid(size);
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
    initRPentominoSmall(size) {
        this.newBlankGrid(size);
        this.grid[13][14] = 1;
        this.grid[14][13] = 1;
        this.grid[14][14] = 1;
        this.grid[14][15] = 1;
        this.grid[15][13] = 1;
    }
    initRPentominoMedium(size) {
        this.newBlankGrid(size);
        this.grid[23][23] = 1;
        this.grid[24][22] = 1;
        this.grid[24][23] = 1;
        this.grid[24][24] = 1;
        this.grid[25][22] = 1;
    }
    initRPentominoLarge(size) {
        this.newBlankGrid(size);
        this.grid[28][31] = 1;
        this.grid[29][30] = 1;
        this.grid[29][31] = 1;
        this.grid[29][32] = 1;
        this.grid[30][30] = 1;
    }
    initQueenBeeSmall(size) {
        this.newBlankGrid(size);
        this.grid[8][7] = 1;
        this.grid[8][8] = 1;
        this.grid[8][12] = 1;
        this.grid[8][13] = 1;
        this.grid[9][9] = 1;
        this.grid[9][10] = 1;
        this.grid[9][11] = 1;
        this.grid[10][8] = 1;
        this.grid[10][12] = 1;
        this.grid[11][9] = 1;
        this.grid[11][11] = 1;
        this.grid[12][10] = 1;
    }
    initQueenBeeMedium(size) {
        this.newBlankGrid(size);
        this.grid[13][12] = 1;
        this.grid[13][13] = 1;
        this.grid[13][17] = 1;
        this.grid[13][18] = 1;
        this.grid[14][14] = 1;
        this.grid[14][15] = 1;
        this.grid[14][16] = 1;
        this.grid[15][13] = 1;
        this.grid[15][17] = 1;
        this.grid[16][14] = 1;
        this.grid[16][16] = 1;
        this.grid[17][15] = 1;
    }
    initQueenBeeLarge(size) {
        this.newBlankGrid(size);
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
    initGosperGliderGun(size) {
        this.newBlankGrid(size);
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