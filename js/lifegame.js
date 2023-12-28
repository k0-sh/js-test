/** @type {HTMLCanvasElement} */
let canvas;
let ctx;
let cellsize = 20;
let cols;
let rows;
let cell_int;
let cells = [];
let timer;
let buttonStart;
let buttonRandom;
let buttonReset;
let running = false;

window.onload = function() {
    canvas = document.getElementById('cv');
    ctx = canvas.getContext('2d');
    canvas.style.border = "2px solid";//外枠
    canvas.style.borderColor = 'rgb(60, 60, 60)';//外枠の色
    ctx.fillStyle = 'rgb(255,255,255)';//背景の色
    ctx.fillRect(0,0, canvas.width, canvas.height);
    ctx.lineWidth = 1;
    cell_int = canvas.width / cellsize;//セルの大きさ（正方形を想定）
    buttonRandom = document.getElementById('buttonRandom');
    buttonStart = document.getElementById('buttonStart');
    buttonReset = document.getElementById('buttonReset');
    buttonRandom.addEventListener('click', random_cells, false);
    buttonStart.addEventListener('click', onStart, false);
    buttonReset.addEventListener('click', init_cells, false)
    draw_first();
}


// 開始
function onStart() {
    if (running) {
        clearInterval(timer);//セルの更新を停止
        buttonStart.value = "Start";//ボタンの文字を変更
        running = false;//スタートの状態を停止に
    } else {
        timer = setInterval(ngenerate, 100);//100ミリ秒間隔でセルを更新
        buttonStart.value = "Stop";
        running = true;
    }
}

// 描画
function draw() {
    ctx.clearRect(0, 0, 320, 320);//キャンバスを一旦削除
    for (let i = 0; i < cell_int; i++) {
        for (let j = 0; j < cell_int; j++) {
            if (cells[i][j] == 1) {
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


// ランダムに生成

function random_cells() {
    for (let i = 0; i < cell_int; i++) {
        for (let j = 0; j < cell_int; j++) {
            cells[i][j] = Math.round(Math.random());
            //0から1の数を生成して、四捨五入で0か1に
        }
    }
    draw();
}

// セルの値を0にして、全部白紙に
function init_cells() {
    for (let i = 0; i < cell_int; i++) {
        for (let j = 0; j < cell_int; j++) {
            cells[i][j] = 0;
        }
    }
    draw();
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
    //隣接セルの生の個数を返す
}

// セルの更新
function ngenerate() {
    let ces = [];//新しいセルの状態を入れる配列
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
    //古い状態から新しい状態へ更新
    draw()
}

/*
function check() {
    //console.log(neighbor(15,15))
    //console.log(cell_int)
    
    timer = setInterval(ngenerate, 100);
}
*/





