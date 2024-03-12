//add squares inside the drawing board
const drawingBoard = document.querySelector('.drawing-board');

for (let i = 1; i <= 16 * 16; i++) {
  const boardSquare= document.createElement('div');
  boardSquare.classList.add('board-square');
  drawingBoard.appendChild(boardSquare);
}

//button functionality
let buttonsDiv = document.querySelector('.buttons');
let buttons = document.querySelectorAll('button');
let toggleGridLinesBtn = document.querySelector('#toggle-grid-lines-btn');
let boardSquares = document.querySelectorAll('.board-square');
let activeDrawingModeBtn = 'color-btn';

//use event bubbling for button clicks
buttonsDiv.addEventListener('click', handleBtnClick);

function handleBtnClick(e) {
  //clear and toggle buttons shouldn't change the drawing mode
  if (e.target.id === 'clear-btn' || e.target.id === 'toggle-grid-lines-btn') {
    e.target.style.backgroundColor = '#FFFFFF';
    setTimeout(() => {
      e.target.style.backgroundColor = '#DDDDDD';
    }, 200);

    //clear button should reset the board
    if (e.target.id === 'clear-btn') {
      boardSquares.forEach(square => square.style.backgroundColor = '#FFFFFF');
    }

    //toggle button should toggle the grid lines
    if (e.target.id === 'toggle-grid-lines-btn') {
      handleGridToggle(e);
    }

  //specify button elements to prevent buttonsDiv from reacting to click event
  } else if (e.target.tagName === 'BUTTON') {
    buttons.forEach(button => button.style.backgroundColor = '#DDDDDD');
    e.target.style.backgroundColor = '#FFFFFF';
    activeDrawingModeBtn = e.target.id;
  }
}

function handleGridToggle(e) {
  if (e.target.dataset.current === 'shown') {
    boardSquares.forEach(square => square.style.border = 'none');
    drawingBoard.style.border = 'none';
    toggleGridLinesBtn.textContent = 'Show Grid Lines';
    e.target.dataset.current = 'hidden';
  } else if (e.target.dataset.current === 'hidden') {
    boardSquares.forEach(square => square.removeAttribute('style'));
    drawingBoard.removeAttribute('style');
    toggleGridLinesBtn.textContent = 'Hide Grid Lines';
    e.target.dataset.current = 'shown';
  }
}

//track color change in color picker
let colorPicker = document.querySelector('input[type=color]');
let colorPickerColor = colorPicker.value;

colorPicker.addEventListener('input', e => {
  console.log(e.target.value);
  colorPickerColor = e.target.value;
});

//create object for palettes
const palettes = {
  'color-palette-1-btn': {
    colors: ['#FCF5ED', '#F4BF96', '#CE5A67', '#1F1717']
  },
  'color-palette-2-btn': {
    colors: ['#5F0F40', '#FB8B24', '#E36414', '#9A031E']
  },
  'color-palette-3-btn': {
    colors: ['#004225', '#F5F5DC', '#FFB000', '#FFCF9D']
  },
  'custom-color-palette-btn': {
    colors: []
  },
}

//disable drag and drop to stop undesirable effects
document.body.addEventListener('dragstart', event => {
  event.preventDefault();
});

document.body.addEventListener('drop', event => {
  event.preventDefault();
});

//drawing functionality
boardSquares.forEach(square => square.addEventListener('mousedown', startDrawing));

function startDrawing(e) {
  draw(e);
  boardSquares.forEach(square => square.addEventListener('mouseenter', draw));
  window.addEventListener('mouseup', () => {
    boardSquares.forEach(square => square.removeEventListener('mouseenter', draw))
  })
}

let currentColorIndex = 0;

function draw(e) {
  switch (activeDrawingModeBtn) {
    case 'color-btn':
      e.target.style.backgroundColor = colorPickerColor;
      break;
    case 'eraser-btn':
      e.target.style.backgroundColor = '#FFFFFF';
      break;
    case 'color-palette-1-btn':
    case 'color-palette-2-btn':
    case 'color-palette-3-btn':
      e.target.style.backgroundColor = palettes[activeDrawingModeBtn].colors[currentColorIndex];
      console.log(currentColorIndex);

      if (currentColorIndex >= palettes[activeDrawingModeBtn].colors.length) {
        currentColorIndex = 0;
      } else {
        currentColorIndex++;
        console.log(currentColorIndex);
      }
      break;
  }
}




//d3 colors

// let c = d3.color('#FFCF9D');
// c = d3.hsl(c);
// c.l = 0;
// console.log(c);
// let a = document.querySelector('.board-square:first-child');

// a.style.backgroundColor = c;