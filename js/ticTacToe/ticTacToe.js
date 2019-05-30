// 9 squares, symbols, X n O, each dude can go the other turn
// let variable declaration, can take any form or shape
// const variable declaration, cannot change after initialized
// array: sort of data-structure that allows for a collection to be saved,
//    you can imagine it as a sentence, e.g.: "i am big" in an array you could write it as: ["i", " ", "a", "m", " ", "b", "i", "g"]

//initialisation squares, which will be our board

// class in javascript
class Player {
  //constructor: when a new object is made you need to give it a name and a symbol;
  constructor(name, symbol) {
    this._name = name;
    this._symbol = symbol;
  }
  //setters
  set name(value) {
    this._name = value;
  }
  set symbol(value) {
    this._symbol = value;
  }
  //getters
  get symbol() {
    return this._symbol;
  }
  get name() {
    return this._name;
  }
}

class TicTacToe {
  constructor(player1, player2) {
    this._player1 = player1;
    this._player2 = player2;
    this._board = [["h", "e", "y"], ["b", "e", "n"], ["j", "i", "j"]];
  }
  //setters
  set board(value) {
    this._board = value;
  }
  set player2(value) {
    this._player2 = value;
  }
  set player1(value) {
    this._player1 = value;
  }
  //getters
  get player1() {
    return this._player1;
  }
  get player2() {
    return this._player2;
  }
  get board() {
    return this._board;
  }

  hasWon() {
    // 0,1,2
    //,3,4,5
    //,6,7,8
    let row = [];
    let column = [];
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {

        //console.log(this._board[j][i]);
        console.log(this._board[i][j]);
      }
      console.log("spank me baby");
    }
  }

  //   gameOver = function() {
  //     board.forEach(item => {
  //       if (item != "") {
  //       }
  //     });
  //   };
}

// let player1;
// let player2;

const init = () => {
  const game = new TicTacToe();
  console.table(game.board);
  game.hasWon();
};
window.onload = init;
