"use strict";
// for uninformed.ejs
let board = document.getElementById("board");
let ROW;
let COL;
const boardInit = function () {
  board.innerHTML = "";
  // create board
  let row = document.getElementById("rowsInput").value;
  let col = document.getElementById("colsInput").value;
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

function sendBoard() {
  var arr = new Array(ROW);
  for (let i = 0; i < ROW; i++) arr[i] = new Array(COL);

  for (let i = 0; i < ROW; i++) {
    for (let j = 0; j < COL; j++) {
      if (document.getElementById(i + "-" + j).className == "bomb") {
        arr[i][j] = "x";
      } else {
        arr[i][j] = "#";
      }
    }
  }

  console.log(arr);
  callApi(arr);
}
const callApi = function (arr) {
  fetch("/uninformed/solution", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(arr),
  }).then(async (response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log(data);
    handleOutput(data);
  });
};
const handleOutput = function (data) {
  for (let solution of data) {
    console.log(solution);
  }
};
