class Grid {
    constructor() {
        this.grid = []
    }
    getNeighbors(board, i, j) {
        const len = board.length;
        let count = 0;

        for (let x = -1; x <= 1; x++) {
            for (let y = -1; y <= 1; y++) {
                if (!x && !y) {
                    continue;
                }
                const xi = x + i;
                const yj = y + j;

                if (xi >= 0 && xi < len && yj >= 0 && yj < len) {
                    if (board[xi][yj]) {
                        count += 1;
                    }
                }
            }
        }
        return count;
    }
    step(board) {
        const newBoard = []
        const len = board.length

        for (let i = 0; i < len; i++) {
            newBoard.push([])
            for (let j = 0; j < len; j++) {
                const neighbors = this.getNeighbors(board, i, j);
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
    newBlankGrid() {
        this.grid = [];
        for (let i = 0; i < 40; i++) {
            this.grid[i] = [];
            for (let j = 0; j < 40; j++) {
                this.grid[i].push(0);
            }
        }
    }
    randomGrid() {
        this.grid = [];
        for (let i = 0; i < 40; i++) {
            this.grid[i] = [];
            for (let j = 0; j < 40; j++) {
                this.grid[i].push(Math.round(Math.random()))
            }
        }
    }
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