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
    this._score = 0;
  }
  //setters
  set name(value) {
    this._name = value;
  }
  set symbol(value) {
    this._symbol = value;
  }
  set score(value) {
    this._score = value;
  }

  //getters
  get symbol() {
    return this._symbol;
  }
  get name() {
    return this._name;
  }
  get score() {
    return this._score;
  }
}

class TicTacToe {
  constructor(player1, player2) {
    this._player1 = player1;
    this._player2 = player2;
    this._board = [["", "", ""], ["", "", ""], ["", "", ""]];
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
    let row = [];
    let column = [];
    let diagonalArray1 = [];
    let diagonalArray2 = [];
    let p1 = null,
      p2 = null;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        row[j] = this._board[i][j];
        column[j] = this._board[j][i];
      }

      p1 = checkWithArrayIfGameWon(row, this._player1, this._player2);
      p2 = checkWithArrayIfGameWon(column, this._player1, this._player2);
      if (p1 != null) {
        return p1;
      }
      if (p2 != null) {
        return p2;
      }
    }
    diagonalArray1[0] = this._board[0][0];
    diagonalArray1[1] = this._board[1][1];
    diagonalArray1[2] = this._board[2][2];
    p1 = checkWithArrayIfGameWon(diagonalArray1, this._player1, this._player2);
    diagonalArray2[0] = this._board[0][2];
    diagonalArray2[1] = this._board[1][1];
    diagonalArray2[2] = this._board[2][0];
    p2 = checkWithArrayIfGameWon(diagonalArray2, this._player1, this._player2);
    if (p1 != null) {
      return p1;
    }
    if (p2 != null) {
      return p2;
    }
  }

  gameOver() {
    let player = this.hasWon();
    if (player != null) {
      alert(`${player.name} is the winner!`);
      player.score++;
    } else if (this.isEqual()) {
      alert(`Sadly this game is a draw!`);
    } else {
    }
  }

  isEqual() {
    let output = true;
    for (let i = 0; i < 3; i++) {
      this._board[i].forEach(element => {
        if (element == "" || element == null) {
          output = false;
        }
      });
    }
    return output;
  }
}

function checkIfPlayerWon(array, symbol) {
  let output = false;
  if (array[1] == symbol && array[2] == symbol) {
    output = true;
  }
  return output;
}

function checkWithArrayIfGameWon(array, player1, player2) {
  let player = null;
  let won = false;
  player = checkFirstPlayerInArray(array, player1, player2);
  if (player != null) {
    won = checkIfPlayerWon(array, player.symbol);
    if (won) {
      return player;
    }
  }
}

function checkFirstPlayerInArray(array, player1, player2) {
  let playerSymbol = null;
  if (array[0] == player1.symbol) {
    return player1;
  } else if (array[0] == player2.symbol) {
    return player2;
  } else {
    return playerSymbol;
  }
}

class TicTacToeComponent {
  constructor(window, player1, player2) {
    this._storage = window.localStorage;
    this._game = new TicTacToe(player1, player2);
  }
  get storage() {
    return this._storage;
  }
  set storage(value) {
    this._storage = value;
  }
  // const players = [player1, player2];
  // let divBody = document.getElementById("body");

  // let divScore = document.createElement("div");
  // let pElement = document.createElement("div");
  // players.forEach(player => {
  //   let scoreText = document.createTextNode(
  //     `The score of ${player.name} = ${player.score}`
  //   );
  //   pElement.appendChild(scoreText);
  // });
  // divScore.append(pElement);
  // divBody.append(divScore);
  boardToHtml() {
    document.getElementById("body").innerHTML = "";

    // generates for each row a div with a columns attribute
    // and for each element in that row a div with a is-one-third attribute
    //
    // this._game.board.forEach(row => {
    //   const divElementRow1 = document.createElement("div");
    //   divElementRow1.setAttribute("class", "tile is-parent");
    //   row.forEach(element => {
    //     const divElementRow1Column1 = document.createElement("article");
    //     divElementRow1Column1.setAttribute("class", "tile is-child notification is-warning");
    //     divElementRow1Column1.appendChild(document.createTextNode("X"))
    //     divElementRow1.appendChild(divElementRow1Column1);
    //   });
    //   document.getElementById("body").appendChild(divElementRow1);
    // });

    // is-ancestor element
    let divTileAncestor = document.createElement("div");
    divTileAncestor.setAttribute("class", "tile is-ancestor");

    //column1
    let divTileCol0 = document.createElement("div");
    divTileCol0.setAttribute("class", "tile is-4 is-vertical is-parent");

    //row1
    let divTileCol0Row0 = document.createElement("div");
    divTileCol0Row0.setAttribute("class", "tile is-child box");
    let pCol0Row0 = document.createElement("p");
    pCol0Row0.setAttribute("class", "");
    //row2
    let divTileCol0Row1 = document.createElement("div");
    divTileCol0Row1.setAttribute("class", "tile is-child box");
    let pCol0Row1 = document.createElement("p");
    pCol0Row1.setAttribute("class", "");
    //row3
    let divTileCol0Row2 = document.createElement("div");
    divTileCol0Row2.setAttribute("class", "tile is-child box");
    let pCol0Row2 = document.createElement("p");
    pCol0Row2.setAttribute("class", "");

    divTileCol0Row0.appendChild(pCol0Row0);
    divTileCol0Row1.appendChild(pCol0Row1);
    divTileCol0Row2.appendChild(pCol0Row2);

    //
    //column2
    let divTileCol1 = document.createElement("div");
    divTileCol1.setAttribute("class", "tile is-4 is-vertical is-parent");

    //row1
    let divTileCol1Row0 = document.createElement("div");
    divTileCol1Row0.setAttribute("class", "tile is-child box");
    let pCol1Row0 = document.createElement("p");
    pCol1Row0.setAttribute("class", "");
    //row2
    let divTileCol1Row1 = document.createElement("div");
    divTileCol1Row1.setAttribute("class", "tile is-child box");
    let pCol1Row1 = document.createElement("p");
    pCol1Row1.setAttribute("class", "");
    //row3
    let divTileCol1Row2 = document.createElement("div");
    divTileCol1Row2.setAttribute("class", "tile is-child box");
    let pCol1Row2 = document.createElement("p");
    pCol1Row2.setAttribute("class", "");

    //column3
    let divTileCol2 = document.createElement("div");
    divTileCol2.setAttribute("class", "tile is-4 is-vertical is-parent");

    //row1
    let divTileCol2Row0 = document.createElement("div");
    divTileCol2Row0.setAttribute("class", "tile is-child box");
    let pCol2Row0 = document.createElement("p");
    pCol2Row0.setAttribute("class", "");
    //row2
    let divTileCol2Row1 = document.createElement("div");
    divTileCol2Row1.setAttribute("class", "tile is-child box");
    let pCol2Row1 = document.createElement("p");
    pCol2Row1.setAttribute("class", "");
    //row3
    let divTileCol2Row2 = document.createElement("div");
    divTileCol2Row2.setAttribute("class", "tile is-child box");
    let pCol2Row2 = document.createElement("p");
    pCol2Row2.setAttribute("class", "");

    //connecting all the divs and p elements
    divTileCol0Row0.appendChild(pCol0Row0);
    divTileCol0Row1.appendChild(pCol0Row1);
    divTileCol0Row2.appendChild(pCol0Row2);

    divTileCol1Row0.appendChild(pCol1Row0);
    divTileCol1Row1.appendChild(pCol1Row1);
    divTileCol1Row2.appendChild(pCol1Row2);

    divTileCol2Row0.appendChild(pCol2Row0);
    divTileCol2Row1.appendChild(pCol2Row1);
    divTileCol2Row2.appendChild(pCol2Row2);

    divTileCol0.appendChild(divTileCol0Row0);
    divTileCol0.appendChild(divTileCol0Row1);
    divTileCol0.appendChild(divTileCol0Row2);
    divTileCol1.appendChild(divTileCol1Row0);
    divTileCol1.appendChild(divTileCol1Row1);
    divTileCol1.appendChild(divTileCol1Row2);
    divTileCol2.appendChild(divTileCol2Row0);
    divTileCol2.appendChild(divTileCol2Row1);
    divTileCol2.appendChild(divTileCol2Row2);

    divTileAncestor.appendChild(divTileCol0);
    divTileAncestor.appendChild(divTileCol1);
    divTileAncestor.appendChild(divTileCol2);

    document.getElementById("body").appendChild(divTileAncestor);
  }

  scorePanelToHtml() {}
  getGameFromStorage() {}
  setGameInStorage() {}
}

const init = () => {
  const player1 = new Player("sterre", "X");
  const player2 = new Player("reeven", "O");
  new TicTacToeComponent(this, player1, player2).boardToHtml();
  // console.table(game.board);
  // game.gameOver();
};
window.onload = init;
