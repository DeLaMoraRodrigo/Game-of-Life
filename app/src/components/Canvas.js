import React, { Component } from "react";
import Grid from "./Grid";
import RangeSlider from "react-bootstrap-range-slider";

import "./Canvas.css"

const small = 300;
const medium = 450;
const large = 600;

class Canvas extends Component {
    constructor() {
        super();
        this.state = {
            generation: 0,
            is_visible: false,
            sliderValue: 50,
            size: large
        };
    }
    componentDidMount() {
        // Upon mounting, draw and initialize grid
        this.draw();
        this.grid = new Grid();
        this.grid.newBlankGrid(this.state.size);
        this.start = null;
        this.myReq = null;
        this.isClickable = true;
    }
    componentDidUpdate(prevProps, prevState) {
        // Upon changing the size of the board, redraw and reinitialize grid
        if (prevState.size !== this.state.size) {
            this.draw();
            this.grid = new Grid();
            this.grid.newBlankGrid(this.state.size);
            this.start = null;
            this.myReq = null;
            this.isClickable = true;
        }
    }
    draw() {
        // Reference canvas element and create context for it
        const context = this.refs.canvas.getContext("2d");
        context.strokeStyle = "black";
        // Create grid by drawing lines every 15 pixels
        // We take the number of cells we want and multiply it by 15 to know how long we loop
        for (let i = 0; i <= this.state.size; i += 15) {
            for (let j = 0; j <= this.state.size; j += 15) {
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
            // Reference canvas element
            const canvas = this.refs.canvas;
            // Reference the smallest rectangle containing the canvas
            const grid = canvas.getBoundingClientRect();
            // Get x and y values in relation to mouse position on grid
            const x = e.clientX - grid.left;
            const y = e.clientY - grid.top;
            // Change state of cell to alive or dead
            this.toggleState(x, y);
        }
    }
    toggleState(x, y) {
        // Cells are 15 pixels by 15 pixels so to get the true x and y values we divide by 15
        const x_index = Math.floor(x / 15);
        const y_index = Math.floor(y / 15);
        // If cell is dead, we set to alive. If cell not dead, we set to dead
        this.grid.grid[x_index][y_index] === 0
            ? (this.grid.grid[x_index][y_index] = 1)
            : (this.grid.grid[x_index][y_index] = 0)
        this.fillCells()
    }
    fillCells() {
        // Reference canvas and create context for it
        const context = this.refs.canvas.getContext("2d");
        context.fillStyle = "black";
        // Loop through each cell
        for (let i = 0; i < this.grid.grid.length; i++) {
            for (let j = 0; j < this.grid.grid.length; j++) {
                // If cell is alive fill in the cell 
                if (this.grid.grid[i][j]) {
                    context.fillRect(i * 15, j * 15, 15, 15);
                    // If cell is dead clear the cell
                } else {
                    context.clearRect(i * 15, j * 15, 15, 15);
                }
            }
        }
        // Redraw grid
        this.draw();
    }
    singleStep() {
        // If the animation is not running we can step through each iteration
        if (!this.myReq && !this.start) {
            this.grid.step(this.grid.grid);
            this.setState({
                ...this.state,
                generation: this.state.generation + 1
            })
            this.isClickable = false;
            this.fillCells();
        }
    }
    animate = (timestamp) => {
        // Creates loop that keeps requesting new frame of animation
        this.myReq = requestAnimationFrame(this.animate);
        if (!this.start) {
            this.start = timestamp;
        }
        const elapsed = timestamp - this.start;
        // Sets speed of animation
        if (elapsed > (100 - this.state.sliderValue)) {
            this.grid.step(this.grid.grid);
            this.setState({
                ...this.state,
                generation: this.state.generation + 1
            })
            this.start = timestamp;
            this.isClickable = false;
            this.fillCells();
        }
    }
    stopAnimation() {
        // Cancels request for new frame of animation
        cancelAnimationFrame(this.myReq);
        this.myReq = null;
        this.start = null;
    }
    clear() {
        // Stops animation
        this.stopAnimation();
        // Resets generation state
        this.setState({
            ...this.state,
            generation: 0
        })
        this.isClickable = true;
        this.grid.newBlankGrid(this.state.size);
        this.fillCells();
        document.querySelector("select").value = "none"
    }
    selectHandler = e => {
        // If the animation is not running decide which preset board to use
        if (!this.start && !this.myReq) {
            switch (e.target.value) {
                case "random":
                    this.grid.randomGrid(this.state.size);
                    break;
                case "glider":
                    this.grid.initGlider(this.state.size);
                    break;
                case "lightWeightSpaceShip":
                    // Determine position of pattern depending on size of board
                    if (this.state.size === small) {
                        this.grid.initLightWeightSpaceShipSmall(this.state.size);
                        break;
                    }else if (this.state.size === medium) {
                        this.grid.initLightWeightSpaceShipMedium(this.state.size);
                        break;
                    }else {
                        this.grid.initLightWeightSpaceShipLarge(this.state.size);
                        break;
                    }
                case "10CellRow":
                    if (this.state.size === small) {
                        this.grid.init10CellRowSmall(this.state.size);
                        break;
                    }else if (this.state.size === medium) {
                        this.grid.init10CellRowMedium(this.state.size);
                        break;
                    }else {
                        this.grid.init10CellRowLarge(this.state.size);
                        break;
                    }
                    
                case "cauldron":
                    if (this.state.size === small) {
                        this.grid.initCauldronSmall(this.state.size);
                        break;
                    }else if (this.state.size === medium) {
                        this.grid.initCauldronMedium(this.state.size);
                        break;
                    }else {
                        this.grid.initCauldronLarge(this.state.size);
                        break;
                    }
                case "pulsar":
                    if (this.state.size === small) {
                        this.grid.initPulsarSmall(this.state.size);
                        break;
                    }else if (this.state.size === medium) {
                        this.grid.initPulsarMedium(this.state.size);
                        break;
                    }else {
                        this.grid.initPulsarLarge(this.state.size);
                        break;
                    }
                case "rPentomino":
                    if (this.state.size === small) {
                        this.grid.initRPentominoSmall(this.state.size);
                        break;
                    }else if (this.state.size === medium) {
                        this.grid.initRPentominoMedium(this.state.size);
                        break;
                    }else {
                        this.grid.initRPentominoLarge(this.state.size);
                        break;
                    }
                case "queenBee":
                    if (this.state.size === small) {
                        this.grid.initQueenBeeSmall(this.state.size);
                        break;
                    }else if (this.state.size === medium) {
                        this.grid.initQueenBeeMedium(this.state.size);
                        break;
                    }else {
                        this.grid.initQueenBeeLarge(this.state.size);
                        break;
                    }
                case "gosperGliderGun":
                    this.grid.initGosperGliderGun(this.state.size);
                    break;
                default:
                    this.grid.newBlankGrid(this.state.size);
            }
            this.setState({
                ...this.state,
                generation: 0
            })
            this.fillCells();
        }
    }
    sizeSelector = e => {
        // If the animation is not running decide which size board to use
        if (!this.start && !this.myReq) {
            switch (e.target.value) {
                case "small":
                    this.setState({ ...this.state, size: small });
                    document.querySelector("select").value = "none"
                    break;
                case "medium":
                    this.setState({ ...this.state, size: medium });
                    document.querySelector("select").value = "none"
                    break;
                default:
                    this.setState({ ...this.state, size: large });
                    document.querySelector("select").value = "none"
            }
        }
    }

    render() {
        return (
            <div>
                <canvas
                    ref="canvas"
                    width={this.state.size}
                    height={this.state.size}
                    onClick={e => this.getPosition(e)}
                />
                <p id="gen">
                    Current Generation: {this.state.generation}
                </p>

                <RangeSlider
                    id="slider"
                    min={1}
                    max={100}
                    value={this.state.sliderValue}
                    onChange={changeEvent => { this.setState({ ...this.state, sliderValue: changeEvent.target.value }) }}
                />

                <div className="btnContainer">
                    <button onClick={() => this.singleStep()}>
                        Step
                    </button>

                    <button
                        onClick={() => {
                            // If animation is not running, start animation
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

                    <button onClick={() => { this.setState({ ...this.state, is_visible: !this.state.is_visible }) }}>
                        Rules
                    </button>
                </div>

                <div>

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
                        {this.state.size === large 
                            ? <option value="gosperGliderGun">Gosper Glider Gun</option>
                            : null
                        }
                    </select>

                    <select onChange={this.sizeSelector} defaultValue="large">
                        <option value="small">Small</option>
                        <option value="medium">Medium</option>
                        <option value="large">Large</option>
                    </select>

                </div>

                {this.state.is_visible
                    ? <div>
                        <p>Any live cell with fewer than two live neighbours dies, as if by underpopulation.</p>
                        <p>Any live cell with two or three live neighbours lives on to the next generation.</p>
                        <p>Any live cell with more than three live neighbours dies, as if by overpopulation.</p>
                        <p>Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.</p>
                    </div>
                    : null
                }
            </div>
        );
    }
}

export default Canvas;