const drawingBoard = document.querySelector(".drawing-board");

for (let i = 1; i <= 16 * 16; i++) {
  const boardSquare= document.createElement("div");
  boardSquare.classList.add("board-square");
  drawingBoard.appendChild(boardSquare);
}