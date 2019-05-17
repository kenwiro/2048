let grid;
let grid_new;
let score = 0;


function setup() {
    createCanvas(400, 400);
    noLoop();
    grid = blankGrid();
    grid_new = blankGrid();
    addNumber();
    addNumber();
    updateCanvas();
}

function keyPressed() {
    let flipped = false;
    let rotated = false;
    let played = true;

    switch(keyCode) {
        case DOWN_ARROW:
        // dont nothing
        break;

        case UP_ARROW:
        grid = flipGrid(grid);
        flipped = true;
        break;

        case RIGHT_ARROW:
        grid = transposeGrid(grid, 1);
        rotated = true;
        break;

        case LEFT_ARROW:
        grid = flipGrid(grid);
        grid = transposeGrid(grid, 1);
        rotated = true;
        flipped = true;
        break;
        default:
        played = false;
    }

    if (played) {


        let past = copyGrid(grid);
        for (let i = 0; i < 4; i++) {
            grid[i] = operate(grid[i]);
        }
        let changed = compare(past, grid);

        if (flipped) {
            grid = flipGrid(grid)
        }

        if (rotated) {
            grid = transposeGrid(grid, -1);
        }

        if (changed) {
            addNumber();
        }
        updateCanvas();

        let gameover = isGameOver();
        if (gameover) {
            alert('GAME OVER!!!')
        }
        let gamewon = isGameWon();
        if (gamewon) {
            alert('GAME won!!!')
        }
    }
}

function updateCanvas() {
    background(255);
    drawGrid();
    select('#score').html(score);
}

function drawGrid() {
    let w = 100;
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            noFill();
            strokeWeight(3);
            let val = grid[i][j];
            let s =  val.toString();
            stroke(0);
            if (grid_new[i][j] === 1) {
                stroke(200, 0, 200);
                grid_new[i][j] = 0; 
            } else {
                stroke(0);   
                
            }


            if (val != 0) {
            fill(colorsAndSizes[s].color);
            } else {
            noFill();
            }
            rect(i * w, j * w, w, w, 25);
            if (val !== 0) {
                textAlign(CENTER, CENTER);
                noStroke();
                fill(0);
                textSize(colorsAndSizes[s].size);
                text(val, i * w + w / 2, j * w + w / 2);

            }
        }
    }
}