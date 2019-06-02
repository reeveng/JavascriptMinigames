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
    this._wonPlayer = null;
    this._turn = player1;
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
  set wonPlayer(value) {
    this._wonPlayer = value;
  }
  set turn(value) {
    this._turn = value;
  }

  //getters
  get player1() {
    return this._player1;
  }
  get player2() {
    return this._player2;
  }
  get players() {
    return [this._player1, this._player2];
  }
  get board() {
    return this._board;
  }
  get wonPlayer() {
    return this._wonPlayer;
  }
  get turn() {
    return this._turn;
  }

  resetBoard() {
    this._board = [["", "", ""], ["", "", ""], ["", "", ""]];
    this._turn =
      (this._player1.score + this._player2.score) % 2
        ? this._player2
        : this._player1;
  }

  hasWon() {
    let row = [];
    let column = [];
    let diagonalArray1 = [];
    let diagonalArray2 = [];
    let p1 = null;
    let p2 = null;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        row[j] = this._board[i][j];
        column[j] = this._board[j][i];
      }

      p1 = checkWithArrayIfGameWon(row, this._player1, this._player2);
      p2 = checkWithArrayIfGameWon(column, this._player1, this._player2);
      if (p1 != null || p2 != null) {
        if (p1 != null) {
          this._wonPlayer = p1;
        }
        if (p2 != null) {
          this._wonPlayer = p2;
        }
        return true;
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

    if (p1 != null || p2 != null) {
      if (p1 != null) {
        this._wonPlayer = p1;
      }
      if (p2 != null) {
        this._wonPlayer = p2;
      }
      return true;
    } else return false;
  }

  gameOver() {
    if (this.hasWon()) {
      if (this._wonPlayer != null) {
        alert(`${this._wonPlayer.name} is the winner!`);
        this._wonPlayer.score++;
        return true;
      }
    } else if (this.isEqual()) {
      alert(`Sadly this game is a draw!`);
      return true;
    } else {
      false;
    }
    return false;
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

function correctFormatOfSymbol(player1S, player2S) {
  let player1Symbol = player1S;
  let player2Symbol = player2S;

  player1Symbol = player1Symbol.split("");
  player1Symbol = player1Symbol[0].toUpperCase();
  player2Symbol = player2Symbol.split("");
  player2Symbol = player2Symbol[0].toUpperCase();

  return [player1Symbol, player2Symbol];
}

class TicTacToeComponent {
  constructor(window, player1, player2) {
    this._storage = window.localStorage;
    this._game = new TicTacToe(player1, player2);
    this.boardToHtml();
  }
  //setters
  set game(value) {
    this._game = value;
  }
  set storage(value) {
    this._storage = value;
  }
  //getters
  get storage() {
    return this._storage;
  }
  get game() {
    return this._game;
  }
  get hasWon() {
    return this._game.hasWon();
  }

  boardToHtml() {
    document.getElementById("main").innerHTML = "";
    const divInBodyDiv = document.createElement("div");
    divInBodyDiv.setAttribute("id", "ticTacToe");
    document.getElementById("main").appendChild(divInBodyDiv);

    // is-ancestor element
    const divTileAncestor = document.createElement("div");
    divTileAncestor.setAttribute("class", "tile is-ancestor");

    //column1
    const divTileCol0 = document.createElement("div");
    divTileCol0.setAttribute("class", "tile is-4 is-vertical is-parent");

    //row1
    const divTileCol0Row0 = document.createElement("div");
    divTileCol0Row0.setAttribute("class", "tile is-child box darkGrayOnHover");
    divTileCol0Row0.setAttribute("id", "divTileCol0Row0");
    const pCol0Row0 = document.createElement("p");
    pCol0Row0.setAttribute("class", "has-text-centered title vertical-center ");
    pCol0Row0.setAttribute("id", "col0row0");
    pCol0Row0.appendChild(document.createTextNode(`${this._game.board[0][0]}`));
    //row2
    const divTileCol0Row1 = document.createElement("div");
    divTileCol0Row1.setAttribute("class", "tile is-child box darkGrayOnHover");
    divTileCol0Row1.setAttribute("id", "divTileCol0Row1");
    const pCol0Row1 = document.createElement("p");
    pCol0Row1.setAttribute("class", "has-text-centered title vertical-center ");
    pCol0Row1.setAttribute("id", "col0row1");
    pCol0Row1.appendChild(document.createTextNode(`${this._game.board[1][0]}`));
    //row3
    const divTileCol0Row2 = document.createElement("div");
    divTileCol0Row2.setAttribute("class", "tile is-child box darkGrayOnHover");
    divTileCol0Row2.setAttribute("id", "divTileCol0Row2");
    const pCol0Row2 = document.createElement("p");
    pCol0Row2.setAttribute("class", "has-text-centered title vertical-center ");
    pCol0Row2.setAttribute("id", "col0row2");
    pCol0Row2.appendChild(document.createTextNode(`${this._game.board[2][0]}`));

    divTileCol0Row0.appendChild(pCol0Row0);
    divTileCol0Row1.appendChild(pCol0Row1);
    divTileCol0Row2.appendChild(pCol0Row2);

    //
    //column2
    const divTileCol1 = document.createElement("div");
    divTileCol1.setAttribute("class", "tile is-4 is-vertical is-parent");

    //row1
    const divTileCol1Row0 = document.createElement("div");
    divTileCol1Row0.setAttribute("class", "tile is-child box darkGrayOnHover");
    divTileCol1Row0.setAttribute("id", "divTileCol1Row0");
    const pCol1Row0 = document.createElement("p");
    pCol1Row0.setAttribute("class", "has-text-centered title vertical-center ");
    pCol1Row0.setAttribute("id", "col1row0");
    pCol1Row0.appendChild(document.createTextNode(`${this._game.board[0][1]}`));
    //row2
    const divTileCol1Row1 = document.createElement("div");
    divTileCol1Row1.setAttribute("class", "tile is-child box darkGrayOnHover");
    divTileCol1Row1.setAttribute("id", "divTileCol1Row1");
    const pCol1Row1 = document.createElement("p");
    pCol1Row1.setAttribute("class", "has-text-centered title vertical-center ");
    pCol1Row1.setAttribute("id", "col1row1");
    pCol1Row1.appendChild(document.createTextNode(`${this._game.board[1][1]}`));
    //row3
    const divTileCol1Row2 = document.createElement("div");
    divTileCol1Row2.setAttribute("class", "tile is-child box darkGrayOnHover");
    divTileCol1Row2.setAttribute("id", "divTileCol1Row2");
    const pCol1Row2 = document.createElement("p");
    pCol1Row2.setAttribute("class", "has-text-centered title vertical-center ");
    pCol1Row2.setAttribute("id", "col1row2");
    pCol1Row2.appendChild(document.createTextNode(`${this._game.board[2][1]}`));

    divTileCol1Row0.appendChild(pCol1Row0);
    divTileCol1Row1.appendChild(pCol1Row1);
    divTileCol1Row2.appendChild(pCol1Row2);

    //
    //column3
    const divTileCol2 = document.createElement("div");
    divTileCol2.setAttribute("class", "tile is-4 is-vertical is-parent");

    //row1
    const divTileCol2Row0 = document.createElement("div");
    divTileCol2Row0.setAttribute("class", "tile is-child box darkGrayOnHover");
    divTileCol2Row0.setAttribute("id", "divTileCol2Row0");
    const pCol2Row0 = document.createElement("p");
    pCol2Row0.setAttribute("class", "has-text-centered title vertical-center ");
    pCol2Row0.setAttribute("id", "col2row0");
    pCol2Row0.appendChild(document.createTextNode(`${this._game.board[0][2]}`));
    //row2
    const divTileCol2Row1 = document.createElement("div");
    divTileCol2Row1.setAttribute("class", "tile is-child box darkGrayOnHover");
    divTileCol2Row1.setAttribute("id", "divTileCol2Row1");
    const pCol2Row1 = document.createElement("p");
    pCol2Row1.setAttribute("class", "has-text-centered title vertical-center ");
    pCol2Row1.setAttribute("id", "col2row1");
    pCol2Row1.appendChild(document.createTextNode(`${this._game.board[1][2]}`));
    //row3
    const divTileCol2Row2 = document.createElement("div");
    divTileCol2Row2.setAttribute("class", "tile is-child box darkGrayOnHover");
    divTileCol2Row2.setAttribute("id", "divTileCol2Row2");
    const pCol2Row2 = document.createElement("p");
    pCol2Row2.setAttribute("class", "has-text-centered title vertical-center ");
    pCol2Row2.setAttribute("id", "col2row2");
    pCol2Row2.appendChild(document.createTextNode(`${this._game.board[2][2]}`));

    divTileCol2Row0.appendChild(pCol2Row0);
    divTileCol2Row1.appendChild(pCol2Row1);
    divTileCol2Row2.appendChild(pCol2Row2);

    //connecting all the divs and p elements
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

    divInBodyDiv.appendChild(divTileAncestor);
    divInBodyDiv.setAttribute(
      "class",
      "is-black has-text-centered title container"
    );
  }

  scorePanelToHtml() {}
  getGameFromStorage() {}
  setGameInStorage() {}

  newGame(player1, player2) {
    this._game = new TicTacToe(player2, player1);
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        document.getElementById(`col${i}row${j}`).innerHTML = "";
        document.getElementById(`col${j}row${i}`).innerHTML = "";
      }
    }
  }
}

const init = () => {
  document.title = "TicTacToe";
  document.getElementById("player1Name").value = "sterre";
  document.getElementById("player2Name").value = "reeven";
  document.getElementById("player1Symbol").value = "X";
  document.getElementById("player2Symbol").value = "o";
  startGame();
};

function continueGame(ticTacToe) {
  document.getElementById("divTileCol0Row0").onclick = () => {
    id = "col0row0";
    gotClicked(id, ticTacToe);
  };
  document.getElementById("divTileCol0Row1").onclick = () => {
    id = "col0row1";
    gotClicked(id, ticTacToe);
  };
  document.getElementById("divTileCol0Row2").onclick = () => {
    id = "col0row2";
    gotClicked(id, ticTacToe);
  };
  document.getElementById("divTileCol1Row0").onclick = () => {
    id = "col1row0";
    gotClicked(id, ticTacToe);
  };
  document.getElementById("divTileCol1Row1").onclick = () => {
    id = "col1row1";
    gotClicked(id, ticTacToe);
  };
  document.getElementById("divTileCol1Row2").onclick = () => {
    id = "col1row2";
    gotClicked(id, ticTacToe);
  };
  document.getElementById("divTileCol2Row0").onclick = () => {
    id = "col2row0";
    gotClicked(id, ticTacToe);
  };
  document.getElementById("divTileCol2Row1").onclick = () => {
    id = "col2row1";
    gotClicked(id, ticTacToe);
  };
  document.getElementById("divTileCol2Row2").onclick = () => {
    id = "col2row2";
    gotClicked(id, ticTacToe);
  };
}

function gotClicked(id, ticTacToe) {
  let clicked = document.getElementById(`${id}`).innerHTML;
  if (clicked == undefined || clicked == null || clicked == "") {
    let splittedId = id.split("");
    splittedId = splittedId.filter(function(item) {
      return parseInt(item) == item;
    });
    ticTacToe.game.board[splittedId[1]][splittedId[0]] =
      ticTacToe.game.turn.symbol;

    document.getElementById(`${id}`).innerHTML = `${
      ticTacToe.game.turn.symbol
    }`;

    // ticTacToe.boardToHtml();
    player =
      ticTacToe.game.players[0] != ticTacToe.game.turn
        ? ticTacToe.game.players[0]
        : ticTacToe.game.players[1];
    ticTacToe.game.turn = player;
    let gameOver = ticTacToe.game.gameOver();
    if (gameOver) {
      console.log(gameOver);
      window.setTimeout(
        ticTacToe.newGame(ticTacToe.game.player1, ticTacToe.game.player2),
        10500
      );
    }
  } else {
    alert(`Click a field that hasn't been clicked yet`);
  }
}

function startGame() {
  document.getElementById("startButton").onclick = function() {
    const player1Name = document.getElementById("player1Name").value;
    const player2Name = document.getElementById("player2Name").value;
    let player1Symbol = document.getElementById("player1Symbol").value;
    let player2Symbol = document.getElementById("player2Symbol").value;

    if (
      player1Name == null ||
      player1Name == "" ||
      player1Name === undefined ||
      (player1Symbol == null ||
        player1Symbol == "" ||
        player1Symbol === undefined) ||
      (player2Name == null || player2Name == "" || player2Name === undefined) ||
      (player2Symbol == null ||
        player2Symbol == "" ||
        player2Symbol === undefined)
    ) {
      let str = "";
      if (player1Name == null || player1Name == "") {
        str += "Player 1 name is required\n";
      }

      if (player1Symbol == null || player1Symbol == "") {
        str += "Player 1 symbol is required\n";
      }

      if (player2Name == null || player2Name == "") {
        str += "Player 2 name is required\n";
      }

      if (player2Symbol == null || player2Symbol == "") {
        str += "Player 2 symbol is required\n";
      }
      alert(str);
    } else {
      const correctPlayerSymbols = correctFormatOfSymbol(
        player1Symbol,
        player2Symbol
      );

      if (correctPlayerSymbols[0] == correctPlayerSymbols[1]) {
        let str = "";
        str += `The player symbols need to be different:\n
      player1's symbol: ${player1Symbol}\n
      player2's symbol: ${player1Symbol}\n`;
        alert(str);
      } else if (player1Name == player2Name) {
        let str = "";
        str += `The player names need to be different:\n
      player1's name: ${player1Name}\n
      player2's name: ${player2Name}\n`;
        alert(str);
      } else {
        const player1 = new Player(player1Name, player1Symbol);
        const player2 = new Player(player2Name, player2Symbol);

        const ticTacToe = new TicTacToeComponent(this, player1, player2);
        window.setInterval(continueGame(ticTacToe), 500);
      }
    }
  };
}

window.onload = init;
