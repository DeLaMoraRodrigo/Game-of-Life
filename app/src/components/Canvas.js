import React, { Component } from "react";
import Grid from "./Grid";

class Canvas extends Component {
    constructor() {
        super();
        this.state = {
            generation: 0
        };
    }
    componentDidMount() {
        this.draw();
        this.grid = new Grid();
        this.grid.newBlankGrid();
        this.start = null;
        this.myReq = null;
        this.isClickable = true;
    }
    draw() {
        const context = this.refs.canvas.getContext("2d");
        context.strokeStyle = "black";
        for (let i = 0; i <= 600; i += 15) {
            for (let j = 0; j <= 600; j += 15) {
                context.moveTo(i, 0);
                context.lineTo(i, j);
                context.moveTo(0, j);
                context.lineTo(i, j);
            }
        }
        context.stroke();
    }
    getPosition = e => {
        if (this.isClickable) {
            const canvas = this.refs.canvas;
            const grid = canvas.getBoundingClientRect();
            const x = e.clientX - grid.left;
            const y = e.clientY - grid.top;
            this.toggleState(x, y);
        }
    }
    toggleState(x, y) {
        const x_index = Math.floor(x / 15);
        const y_index = Math.floor(y / 15);
        this.grid.grid[x_index][y_index] === 0
            ? (this.grid.grid[x_index][y_index] = 1)
            : (this.grid.grid[x_index][y_index] = 0)
        this.fillCells()
    }
    fillCells() {
        const context = this.refs.canvas.getContext("2d");
        context.fillStyle = "black";
        for (let i = 0; i < this.grid.grid.length; i++) {
            for (let j = 0; j < this.grid.grid.length; j++) {
                if (this.grid.grid[i][j]) {
                    context.fillRect(i * 15, j * 15, 15, 15);
                } else {
                    context.clearRect(i * 15, j * 15, 15, 15);
                }
            }
        }
        this.draw();
    }
    singleStep() {
        if (!this.myReq && !this.start) {
            this.grid.step(this.grid.grid);
            this.setState({
                generation: this.state.generation + 1
            })
            this.isClickable = false;
            this.fillCells();
        }
    }
    animate = (timestamp) => {
        this.myReq = requestAnimationFrame(this.animate);
        if (!this.start) {
            this.start = timestamp;
        }
        const elapsed = timestamp - this.start;
        if (elapsed > 75) {
            this.grid.step(this.grid.grid);
            this.setState({
                generation: this.state.generation + 1
            })
            this.start = timestamp;
            this.isClickable = false;
            this.fillCells();
        }
    }
    stopAnimation() {
        cancelAnimationFrame(this.myReq);
        this.myReq = null;
        this.start = null;
    }
    clear() {
        this.stopAnimation();
        this.setState({
            generation: 0
        })
        this.isClickable = true;
        this.grid.newBlankGrid();
        this.fillCells();
        document.querySelector("select").value = "none"
    }
    selectHandler = e => {
        if (!this.start && !this.myReq) {
            switch (e.target.value) {
                case "random":
                    this.grid.randomGrid();
                    break;
                case "glider":
                    this.grid.initGlider();
                    break;
                case "lightWeightSpaceShip":
                    this.grid.initLightWeightSpaceShip();
                    break;
                case "10CellRow":
                    this.grid.init10CellRow();
                    break;
                case "cauldron":
                    this.grid.initCauldron();
                    break;
                case "pulsar":
                    this.grid.initPulsar();
                    break;
                case "rPentomino":
                    this.grid.initRPentomino();
                    break;
                case "queenBee":
                    this.grid.initQueenBee();
                    break;
                case "gosperGliderGun":
                    this.grid.initGosperGliderGun();
                    break;
                default:
                    this.grid.newBlankGrid();
            }
            this.setState({
                generation: 0
            }, () => {
                this.fillCells();
            })
        }
    }

    render() {
        return (
            <div>
                <canvas
                    ref="canvas"
                    width={600}
                    height={600}
                    onClick={e => this.getPosition(e)}
                />
                <p>
                    Current Generation: {this.state.generation}
                </p>

                <div className="btnContainer">
                    <button onClick={() => this.singleStep()}>
                        Step
                    </button>

                    <button
                        onClick={() => {
                            if (!this.myReq && !this.start) {
                                this.myReq = requestAnimationFrame(this.animate);
                            }
                        }}
                    >
                        Start
                    </button>

                    <button onClick={() => this.stopAnimation()}>
                        Stop
                    </button>

                    <button onClick={() => this.clear()}>
                        Clear
                    </button>
                </div>

                <select onChange={this.selectHandler} defaultValue="none">
                    <option value="none">None</option>
                    <option value="random">Random</option>
                    <option value="glider">Glider</option>
                    <option value="lightWeightSpaceShip">Lightweight Spaceship</option>
                    <option value="10CellRow">10 Cell Row</option>
                    <option value="cauldron">Cauldron</option>
                    <option value="pulsar">Pulsar</option>
                    <option value="rPentomino">R-pentomino</option>
                    <option value="queenBee">Queen Bee</option>
                    <option value="gosperGliderGun">Gosper Glider Gun</option>
                </select>
            </div>
        );
    }
}

export default Canvas;