//add squares inside the drawing board
const drawingBoard = document.querySelector(".drawing-board");

for (let i = 1; i <= 16 * 16; i++) {
  const boardSquare= document.createElement("div");
  boardSquare.classList.add("board-square");
  drawingBoard.appendChild(boardSquare);
}

//track color change
let colorPicker = document.querySelector("input[type=color]");
let currentColor = colorPicker.value;

colorPicker.addEventListener("change", e => {
  currentColor = e.target.value;
});
