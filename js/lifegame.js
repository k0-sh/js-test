/** @type {HTMLCanvasElement} */
let canvas;
let ctx;
let cellsize = 10;
let cols;
let rows;
let cell_int;
let cells = [];


function draw(x) {
    for (let i = 0; i < x; i++) {
        for (let j = 0; j < x; j++) {
            ctx.strokeStyle = 'black';
            ctx.strokeRect(i * cellsize, j * cellsize, cellsize, cellsize);
            ctx.fillStyle = 'white'
            ctx.fillRect(i * cellsize, j * cellsize, cellsize, cellsize);
        }
    }

    for (let i = 0; i < cell_int; i++) {
        cells[i] = [];
        for (let j = 0; j < cell_int; j++) {
            cells[i][j] = [];
        }
    }

    cells[10][10] = true;
    cells[10][11] = true;
    for (let i = 0; i < cell_int; i++) {
        for (let j = 0; j < cell_int; j++) {
            if (cells[i][j] == true) {
                ctx.fillStyle = 'rgb(156, 255,0)'
                ctx.fillRect(i * cellsize, j * cellsize, cellsize, cellsize);
                ctx.strokeStyle = 'black';
                ctx.strokeRect(i * cellsize, j * cellsize, cellsize, cellsize);
            } else {
                ctx.fillStyle = 'white'
                ctx.fillRect(i * cellsize, j * cellsize, cellsize, cellsize);
                ctx.strokeStyle = 'black';
                ctx.strokeRect(i * cellsize, j * cellsize, cellsize, cellsize);
            }
        }
    }


    console.log(cells[10][11]);
    console.log('こんにちは')
}

// 初期値
function draw_first(x) {
    for (let i = 0; i < x; i++) {
        cells[i] = [];
        for (let j = 0; j < x; j++) {
            cells[i][j] = [];
        }
    }
    cells[5][20] = true;
    cells[5][11] = true;
    console.log(cells[10][10]);
    for (let i = 0; i < cell_int; i++) {
        for (let j = 0; j < cell_int; j++) {
            if (cells[i][j] == true) {
                ctx.fillStyle = 'rgb(156, 255,0)'
                ctx.fillRect(i * cellsize, j * cellsize, cellsize, cellsize);
                ctx.strokeStyle = 'black';
                ctx.strokeRect(i * cellsize, j * cellsize, cellsize, cellsize);
            } else {
                ctx.fillStyle = 'white'
                ctx.fillRect(i * cellsize, j * cellsize, cellsize, cellsize);
                ctx.strokeStyle = 'black';
                ctx.strokeRect(i * cellsize, j * cellsize, cellsize, cellsize);
            }
        }
    }

} 

window.onload = function() {
    canvas = document.getElementById('cv');
    ctx = canvas.getContext('2d');
    canvas.style.border = "2px solid";
    canvas.style.borderColor = 'rgb(60, 60, 60)';
    ctx.fillStyle = 'rgb(255,255,255)';
    ctx.fillRect(0,0, canvas.width, canvas.height);
    ctx.lineWidth = 1;
    cell_int = canvas.width / cellsize
    draw_first(cell_int);


}


