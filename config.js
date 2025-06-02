let arr = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
];
let gameover = false;
let score = 0;

function restartGame() {
    for (let i = 0; i < 4; ++i) {
        for (let j = 0; j < 4; ++j) {
            arr[i][j] = 0;
        }
    }

    score = 0;
    gameover = false;

        document.getElementById(
        'banner'
    ).innerText = `██████╗  ██████╗ ██╗  ██╗ █████╗      ██████╗  █████╗ ███╗   ███╗███████╗
╚════██╗██╔═████╗██║  ██║██╔══██╗    ██╔════╝ ██╔══██╗████╗ ████║██╔════╝
 █████╔╝██║██╔██║███████║╚█████╔╝    ██║  ███╗███████║██╔████╔██║█████╗  
██╔═══╝ ████╔╝██║╚════██║██╔══██╗    ██║   ██║██╔══██║██║╚██╔╝██║██╔══╝  
███████╗╚██████╔╝     ██║╚█████╔╝    ╚██████╔╝██║  ██║██║ ╚═╝ ██║███████╗
╚══════╝ ╚═════╝      ╚═╝ ╚════╝      ╚═════╝ ╚═╝  ╚═╝╚═╝     ╚═╝╚══════`;
    init();
}

function output() {
    let html = '+----+----+----+----+<br>';
    for (let i = 0; i < 4; ++i) {
        let line = '';
        for (let j = 0; j < 4; ++j) {
            line += '|';
            let val = arr[i][j];
            if (val === 0) {
                line += '&nbsp;&nbsp;&nbsp;&nbsp;';
            } else {
                let paddedVal = '';
                if (val < 10) {
                    paddedVal = '&nbsp;&nbsp;&nbsp;' + val;
                } else if (val < 100) {
                    paddedVal = '&nbsp;&nbsp;' + val;
                } else if (val < 1000) {
                    paddedVal = '&nbsp;' + val;
                } else {
                    paddedVal = val;
                }

                let spanClass =
                    val >= 1024 ? `rainbow-text` : `tile tile-${val}`;
                line += `<span class="${spanClass}">${paddedVal}</span>`;
            }
        }
        html += line + '|<br>';
        html += '+----+----+----+----+<br>';
    }
    html += '<br>';
    let scoreText = `Score > ${score}`;
    html += scoreText;
    document.getElementById('game').innerHTML = html;
}

function getRGBColor(val) {
    const hue = val % 360;
    return `hsl(${hue}, 100%, 70%)`;
}

function move(way) {
    let changed = false;
    for (let i = 0; i < 4; ++i) {
        let temp = [];
        for (let j = 0; j < 4; ++j) {
            let r, c;
            if (way === 0) {
                r = j;
                c = i;
            } else if (way === 1) {
                r = i;
                c = j;
            } else if (way === 2) {
                r = 3 - j;
                c = i;
            } else {
                r = i;
                c = 3 - j;
            }
            if (arr[r][c] !== 0) temp.push(arr[r][c]);
        }

        for (let j = 0; j < temp.length - 1; ++j) {
            if (temp[j] === temp[j + 1]) {
                temp[j] *= 2;
                score += temp[j];
                temp.splice(j + 1, 1);
                changed = true;
            }
        }

        while (temp.length < 4) {
            temp.push(0);
        }

        for (let j = 0; j < 4; ++j) {
            let r, c;
            if (way === 0) {
                r = j;
                c = i;
            } else if (way === 1) {
                r = i;
                c = j;
            } else if (way === 2) {
                r = 3 - j;
                c = i;
            } else {
                r = i;
                c = 3 - j;
            }
            if (arr[r][c] !== temp[j]) {
                arr[r][c] = temp[j];
                changed = true;
            }
        }
    }
    return changed;
}

function randNum() {
    let empty = [];
    for (let r = 0; r < 4; ++r) {
        for (let c = 0; c < 4; ++c) {
            if (arr[r][c] === 0) {
                empty.push([r, c]);
            }
        }
    }
    if (empty.length === 0) {
        return;
    }
    let [r, c] = empty[Math.floor(Math.random() * empty.length)];
    arr[r][c] = Math.random() < 0.9 ? 2 : 4;
}

function canMove() {
    for (let i = 0; i < 4; ++i) {
        for (let j = 0; j < 4; ++j) {
            if (arr[i][j] === 0) {
                return true;
            }
        }
    }

    for (let i = 0; i < 4; ++i) {
        for (let j = 0; j < 3; ++j) {
            if (arr[i][j] === arr[i][j + 1] || arr[j][i] === arr[j + 1][i]) {
                return true;
            }
        }
    }

    return false;
}

function init() {
    randNum();
    randNum();
    output();
}

addEventListener('keydown', function (e) {
    if (gameover) return;
    let key = e.key.toUpperCase();
    let moved = false;
    if (key === 'W') moved = move(0);
    else if (key === 'A') moved = move(1);
    else if (key === 'S') moved = move(2);
    else if (key === 'D') moved = move(3);
    else return;

    if (moved) {
        randNum();
    }
    output();

    if (!canMove()) {
        document.getElementById('banner').innerText = `
 ██████╗  █████╗ ███╗   ███╗███████╗     ██████╗ ██╗   ██╗███████╗██████╗ 
██╔════╝ ██╔══██╗████╗ ████║██╔════╝    ██╔═══██╗██║   ██║██╔════╝██╔══██╗
██║  ███╗███████║██╔████╔██║█████╗      ██║   ██║██║   ██║█████╗  ██████╔╝
██║   ██║██╔══██║██║╚██╔╝██║██╔══╝      ██║   ██║██║   ██║██╔══╝  ██╔══██╗
╚██████╔╝██║  ██║██║ ╚═╝ ██║███████╗    ╚██████╔╝╚██████╔╝███████╗██║  ██║
 ╚═════╝ ╚═╝  ╚═╝╚═╝     ╚═╝╚══════╝     ╚═════╝  ╚═════╝ ╚══════╝╚═╝  ╚═╝
`;
        gameover = true;
    }
});
init();