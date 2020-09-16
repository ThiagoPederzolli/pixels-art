const clearButton = document.querySelector('#clear-board');
const paletas = document.querySelectorAll('.color');
const boardSize = document.querySelector('#board-size');
const generateButton = document.querySelector('#generate-board');
const paintPixels = document.querySelectorAll('.pixel');
const fullBoard = document.querySelector('#pixel-board');
const black = document.querySelector('#black');
const choosedButton = document.querySelector('#choosed-color');
const chooseColor = document.querySelector('#choose')
let paletaID = 'black';
let cor;

function getRandomNumber() {
  return Math.floor(Math.random() * 255);
}

function generateColor() {
  black.style.backgroundColor = 'black';
  for (let color = 1; color < paletas.length; color += 1) {
    paletas[color].style.backgroundColor = `rgb(${getRandomNumber()} , ${getRandomNumber()} , ${getRandomNumber()})`;
  }
  cor = black.style.backgroundColor;
}

choosedButton.addEventListener('click', function (){
  checkSelected();
  chooseColor.classList.add('selected');
  console.log(chooseColor.value);
  cor = chooseColor.value;
})

window.onload = generateColor();

function checkSelected() {
  for (let i = 0; i < paletas.length; i += 1) {
    if (paletas[i].classList.contains('selected')) {
      paletas[i].classList.remove('selected');
    }
  }
}

function defineColor() {
  checkSelected();
  const paletaSelecionada = event.target;
  paletaID = paletaSelecionada.getAttribute('id');
  paletaSelecionada.classList.add('selected');
  cor = event.target.style.backgroundColor;
}

for (let k = 0; k < paletas.length; k += 1) {
  paletas[k].addEventListener('click', defineColor);
}

function paintBoard() {
  if (paletaID === 'red') {
    event.target.classList.remove('white');
    event.target.style.backgroundColor = cor;
  } else if (paletaID === 'blue') {
    event.target.classList.remove('white');
    event.target.style.backgroundColor = cor;
  } else if (paletaID === 'green') {
    event.target.classList.remove('white');
    event.target.style.backgroundColor = cor;
  } else {
    event.target.classList.remove('white');
    event.target.style.backgroundColor = cor;
  }
}

for (let i = 0; i < paintPixels.length; i += 1) {
  paintPixels[i].addEventListener('click', paintBoard);
}

function sizeBoard() {
  const inputValue = Number(boardSize.value);
  let squareValue = 0;
  if (inputValue < 5) {
    squareValue = 5;
    fullBoard.style.gridTemplateColumns = 'repeat(5, 1fr)';
    fullBoard.style.gridTemplatesRows = 'repeat(5, 1fr)';
    fullBoard.style.height = '200px';
    fullBoard.style.width = '200px';    
  } else if (inputValue < 50) {
    squareValue = inputValue;
    const heightAndWidth = inputValue * 40;
    fullBoard.style.gridTemplateColumns = `repeat(${inputValue}, 1fr)`;
    fullBoard.style.gridTemplateRows = `repeat(${inputValue}, 1fr)`;
    fullBoard.style.height = `${heightAndWidth}`;
    fullBoard.style.width = `${heightAndWidth}`;    
  } else {
    squareValue = 50;
    fullBoard.style.gridTemplateColumns = 'repeat(50, 1fr)';
    fullBoard.style.gridTemplateRows = 'repeat(50, 1fr)';
    fullBoard.style.height = '2000px';
    fullBoard.style.width = '2000px';    
  }
  return squareValue;
}

function generateAlert() {
  const emptyInput = boardSize.value;
  if (emptyInput === '') {
    alert('Board inválido!');
  }
}

function createNewBoard() {
  const coloredPixels = document.querySelectorAll('.pixel');
  for (let i = 0; i < coloredPixels.length; i += 1) {
    fullBoard.removeChild(coloredPixels[i]);
  }
}

function generateBoard() {
  generateAlert();
  createNewBoard();
  fullBoard.classList.remove('quadro-nativo')
  const inputValue = sizeBoard();
  const numberOfPixels = inputValue ** 2;
  for (let i = 1; i <= numberOfPixels; i += 1) {
    const square = document.createElement('div');
    square.className = 'pixel white';
    square.addEventListener('click', paintBoard);
    fullBoard.appendChild(square);
  }
  boardSize.value = '';
  cor = black.style.backgroundColor;
}



generateButton.addEventListener('click', generateBoard);

clearButton.addEventListener('click', function clearBoard() {
  const coloredPixels = document.querySelectorAll('.pixel');
  for (let i = 0; i < coloredPixels.length; i += 1) {
    coloredPixels[i].className = 'pixel';
    coloredPixels[i].style.background = 'white';
    cor = black.style.backgroundColor;
  }
});
