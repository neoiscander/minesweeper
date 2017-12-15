// This is a player board
const generatePlayerBoard = (numberOfRows, numberOfColumns) => {
  let board = [];
  for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
    let row = [];
    for (columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
      row.push(" ");
    }
    board.push(row);
  };
  return board;
}

//console.log(generatePlayerBoard(7, 9));

// This is a bomb board
const generateBombBoard = (numberOfRows, numberOfColumns, numberOfBombs) => {
  let board = [];
  for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
    let row = [];
    for (columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
      row.push(null);
    }
    board.push(row);
  };

  let numberOfBombsPlaced = 0;
  while (numberOfBombsPlaced < numberOfBombs) {
    // note about control flow
    let randomRowIndex = Math.floor(Math.random() * numberOfRows);
    let randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
    if (board[randomRowIndex][randomColumnIndex] !== 'B') {
      return board[randomRowIndex][randomColumnIndex] = "B";
      numberOfBombsPlaced++;
    }

  }

  return board;
};

//function displays the number of numberOfBombs
const getNumberOfNeighborBombs = (bombBoard, rowIndex, columnIndex) => {
  //variables
  const neighborOffsets = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1]];
  const numberOfRows = bombBoard.length;
  const numberOfColumns = bombBoard[0].length;
  let numberOfBombs = 0;

  //call the methods
  neighborOffsets.forEach(offset => {

  });
};

// print board
const printBoard = board => {
  console.log(board.map(row => row.join(" | ")).join("\n"));
};

// Test the functions
let playerBoard = generatePlayerBoard(3, 4);
let bombBoard = generateBombBoard (3, 4, 5);
console.log("Player Board: ");
printBoard(playerBoard);
console.log("Bomb board: ");
printBoard(bombBoard);
