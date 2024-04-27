//add squares inside the drawing board
const drawingBoard = document.querySelector('.drawing-board');

for (let i = 1; i <= 16 * 16; i++) {
  const boardSquare= document.createElement('div');
  boardSquare.classList.add('board-square');
  boardSquare.style.backgroundColor = '#FFFFFF'
  drawingBoard.appendChild(boardSquare);
}

//button functionality
let buttonsDiv = document.querySelector('.buttons');
let buttons = document.querySelectorAll('button');
let customColorsSection = document.querySelector('.cultom-colors');
let toggleGridLinesBtn = document.querySelector('#toggle-grid-lines-btn');
let boardSquares = document.querySelectorAll('.board-square');
let activeDrawingModeBtn = 'color-btn';

//use event bubbling for button clicks
buttonsDiv.addEventListener('click', handleBtnClick);

//add toggle grid lines button separately
toggleGridLinesBtn.addEventListener('click', handleBtnClick);

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
    customColorsSection.style.display = 'none';
    e.target.style.backgroundColor = '#FFFFFF';
    activeDrawingModeBtn = e.target.id;

    if (e.target.id === 'custom-color-palette-btn') {
      customColorsSection.style.display = 'grid';
    }
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
let colorPicker = document.querySelector('input#color-picker');
let colorPickerColor = colorPicker.value;
let colorBtn = document.querySelector('.color-btn');
colorPicker.addEventListener('input', e => {
  colorPickerColor = e.target.value;
  activeDrawingModeBtn = 'color-btn';
  buttons.forEach(button => button.style.backgroundColor = '#DDDDDD');
  customColorsSection.style.display = 'none';
  colorBtn.style.backgroundColor = '#FFFFFF';
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
  }
}

//track custom color palette colors
let color1Picker = document.querySelector('#color-1');
let color1 = color1Picker.value;
color1Picker.addEventListener('input', e => {
  palettes['custom-color-palette-btn'].colors[0] = e.target.value;
});

let color2Picker = document.querySelector('#color-2');
let color2 = color2Picker.value;
color2Picker.addEventListener('input', e => {
  palettes['custom-color-palette-btn'].colors[1] = e.target.value;
});

let color3Picker = document.querySelector('#color-3');
let color3 = color3Picker.value;
color3Picker.addEventListener('input', e => {
  palettes['custom-color-palette-btn'].colors[2] = e.target.value;
});

let color4Picker = document.querySelector('#color-4');
let color4 = color4Picker.value;
color4Picker.addEventListener('input', e => {
  palettes['custom-color-palette-btn'].colors[3] = e.target.value;
});

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
  let currentColorInHSL = d3.hsl(e.target.style.backgroundColor);

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
    case 'custom-color-palette-btn':
      e.target.style.backgroundColor = palettes[activeDrawingModeBtn].colors[currentColorIndex];

      if (currentColorIndex >= palettes[activeDrawingModeBtn].colors.length - 1) {
        currentColorIndex = 0;
      } else {
        currentColorIndex++;
      }
      break;
    case 'darken-btn':
      if (currentColorInHSL.l < .1) {
        return;
      } else {
        currentColorInHSL.l -= 0.1;
        e.target.style.backgroundColor = currentColorInHSL;
      }
      break;
    case 'lighten-btn':
      if (currentColorInHSL.l > .9) {
        return;
      } else {
        currentColorInHSL.l += 0.1;
        e.target.style.backgroundColor = currentColorInHSL;
      }
      break;
  }
}

//grid size slider functionality
const gridSlider = document.querySelector('#grid-size');
gridSlider.addEventListener('input', handleGridChange);

function handleGridChange(e) {
  drawingBoard.querySelectorAll('.board-square').forEach(square => square.remove());

  for (let i = 1; i <= e.target.value * e.target.value; i++) {
    const boardSquare= document.createElement('div');
    boardSquare.classList.add('board-square');
    boardSquare.style.backgroundColor = '#FFFFFF';
    boardSquare.style.width = `calc(100% / ${e.target.value})`;
    drawingBoard.appendChild(boardSquare);
  }

  const gridSize = document.querySelector('.grid-size-label');
  gridSize.textContent = `${e.target.value} x ${e.target.value}`

  boardSquares = document.querySelectorAll('.board-square');
  boardSquares.forEach(square => square.addEventListener('mousedown', startDrawing));
}