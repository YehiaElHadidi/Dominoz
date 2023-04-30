let board = document.getElementById("board");
let submit = document.querySelector("#buttonSubmit");
let solution = document.querySelector("#solutions");

let ROW;
let COL;
const resetGame = function () {
    solution.innerHTML = "";
    board.innerHTML = "";
    submit.innerHTML = "";
    document.getElementById("rowsInput").value = "";
    document.getElementById("colsInput").value = "";
};
const boardInit = function () {
    debugger;
    let row = Number(document.getElementById("rowsInput").value);
    let col = Number(document.getElementById("colsInput").value);
    resetGame();

    // create board
    if (row <= 0 || col <= 0) {
        resetGame();
        return;
    }
    ROW = row;
    COL = col;
    for (let i = 0; i < row; i++) {
        const tr = board.insertRow();
        for (let j = 0; j < col; j++) {
            const td = tr.insertCell();
            td.className = "cell";
            td.setAttribute("onclick", "placeBomb(this.id)");
            td.setAttribute("id", i + "-" + j);
            tr.appendChild(td);
        }
    }
    const sub = document.getElementById("buttonSubmit");
    if (sub.childElementCount === 0) {
        const btn = document.createElement("button");
        btn.className = "ms-3 btn btn-dark";
        btn.setAttribute("onclick", "sendBoard()");
        btn.innerHTML = "Submit Board";
        sub.appendChild(btn);
    }
};

function placeBomb(id) {
    var box = document.getElementById(id);
    console.log(id);
    if (box.className === "cell") {
        box.className = "bomb";
    } else {
        box.className = "cell";
    }
}

const createsolutionBoard = function (solution, uniq) {
    let table = document.createElement("table");
    table.className = "solution-table";
    const row = solution.length;
    const col = solution[0].length;
    for (let i = 0; i < row; i++) {
        const tr = table.insertRow();
        for (let j = 0; j < col; j++) {
            console.log(i + " " + j)
            if (solution[i][j] === "x") {
                const td = tr.insertCell();
                td.className = "bomb";
                td.setAttribute("id", String(uniq) + i + "_" + j);
                td.innerText = ` `;
                tr.appendChild(td);
            } else if (solution[i][j] === "h") {
                solution[i][j] = "@";
                const td = tr.insertCell();

                if(j > 0 && tr.childNodes[j-1].className === "left")
                    td.className = "right"
                else
                    td.className = "left"
                td.setAttribute("id", String(uniq) + i + "_" + j);
                td.innerText = ` `;
                tr.appendChild(td);
            } else if (solution[i][j] === "v") {
                solution[i][j] = "@";
                const td = tr.insertCell();
                if(i > 0 && table.childNodes[0].childNodes[i-1].childNodes[j].className === "up")
                    td.className = "down";
                else
                    td.className = "up"
                td.setAttribute("id", String(uniq) + i + "_" + j);
                td.innerText = ` `;
                tr.appendChild(td);
            } else if (solution[i][j] === "f") {
                solution[i][j] = "@";
                const td = tr.insertCell();
                td.className = "cell";
                td.setAttribute("id", String(uniq) + i + "_" + j);
                td.innerText = ` `;
                tr.appendChild(td);
            }
        }
    }
    return table;
};

function makeArray(){
    var arr = new Array(ROW);
    for (let i = 0; i < ROW; i++) arr[i] = new Array(COL);

    for (let i = 0; i < ROW; i++) {
        for (let j = 0; j < COL; j++) {
            if (document.getElementById(i + "-" + j).className === "bomb") {
                arr[i][j] = "x";
            } else {
                arr[i][j] = "#";
            }
        }
    }

    console.log(arr);
    return arr;
}