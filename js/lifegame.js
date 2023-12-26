/** @type {HTMLCanvasElement} */
let canvas;
let ctx;
let cellsize = 20;
let cols;
let rows;
let cell_int;
let cells = [];


function draw() {
    ctx.clearRect(0, 0, 320, 320);
    for (let i = 0; i < cell_int; i++) {
        for (let j = 0; j < cell_int; j++) {
            if (cells[i][j] == 1) {
                ctx.fillStyle = 'rgb(156, 255,0)'
                ctx.fillRect(i * cellsize, j * cellsize, cellsize, cellsize);
                //ctx.strokeStyle = 'black';
                //ctx.strokeRect(i * cellsize, j * cellsize, cellsize, cellsize);
            } else {
                ctx.fillStyle = 'white'
                ctx.fillRect(i * cellsize, j * cellsize, cellsize, cellsize);
                //ctx.strokeStyle = 'black';
                //ctx.strokeRect(i * cellsize, j * cellsize, cellsize, cellsize);
            }
        }
    }
}

// 初期値
function draw_first() {
    for (let i = 0; i < cell_int; i++) {
        cells[i] = [];
        for (let j = 0; j < cell_int; j++) {
            cells[i][j] = 0;
        }
    }
    cells[14][15] = 1;
    cells[15][14] = 1;
    cells[15][15] = 1;
    cells[15][16] = 1;
    cells[16][14] = 1;

    for (let i = 0; i < cell_int; i++) {
        for (let j = 0; j < cell_int; j++) {
            if (cells[i][j] == 1) {
                ctx.fillStyle = 'rgb(156, 255,0)'
                ctx.fillRect(i * cellsize, j * cellsize, cellsize, cellsize);
                ctx.strokeStyle = 'black';
                ctx.strokeRect(i * cellsize, j * cellsize, cellsize, cellsize);
            } else {
                ctx.fillStyle = 'white';
                ctx.fillRect(i * cellsize, j * cellsize, cellsize, cellsize);
                ctx.strokeStyle = 'black';
                ctx.strokeRect(i * cellsize, j * cellsize, cellsize, cellsize);
            }
        }
    }
} 


// 隣接セルの判定
function neighbor(x, y) {
    let count = 0;
    for (let xd = -1 ; xd < 2 ; xd++) {
        for (let yd = -1; yd < 2; yd++) {
            if (xd !== 0 || yd !== 0) {
                let ni = (x + xd + cell_int) % cell_int;
                let nj = (y + yd + cell_int) % cell_int;
                count +=  cells[ni][nj];
            }
        }
    }
    return count;
}

// セルの生成
function ngenerate() {
    let ces = [];
    for (let i = 0; i < cell_int; i++) {
        ces[i] =[];
        for (let j = 0; j < cell_int; j++) {
            let count = neighbor(i, j)
            let cell_state = cells[i][j]
            // セルが生の場合
            if (cell_state == 1) {
                if (count == 2 || count == 3) {
                    ces[i][j] = 1
                } else {
                    ces[i][j] = 0
                }
                // セルが死の場合
            } else {
                if (count == 3) {
                    ces[i][j] = 1
                } else {
                    ces[i][j] = 0
                }
            }
        }
    }
    cells = ces
    draw()
}

function check() {
    //console.log(neighbor(15,15))
    //console.log(cell_int)
    setInterval(ngenerate, 100)
}



window.onload = function() {
    canvas = document.getElementById('cv');
    ctx = canvas.getContext('2d');
    canvas.style.border = "2px solid";
    canvas.style.borderColor = 'rgb(60, 60, 60)';
    ctx.fillStyle = 'rgb(255,255,255)';
    ctx.fillRect(0,0, canvas.width, canvas.height);
    ctx.lineWidth = 1;
    cell_int = canvas.width / cellsize;
    draw_first();
}


