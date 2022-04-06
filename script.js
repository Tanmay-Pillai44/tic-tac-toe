// LOGIC FOR THE GAME

class Game {
    constructor() {
        this.turn = "X";
        this.board = new Array(9).fill(null);
    }

    nextTurn() {
        if(this.turn == "X") {
            this.turn = "O";
        } else {
            this.turn = "X";
        }
    }

    makeMove(i) {

        if (this.endGame()) {
            return;
        }

        if (this.board[i]) {
            return;
        }
        this.board[i] = this.turn; // X or O
        let winCombination = this.findWinCombinations();
        if(!winCombination) {
            this.nextTurn();
        }
    }

    findWinCombinations() {
        const winCombinations = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
        ];

        for(const combination of winCombinations) {
            const [a,b,c] = combination;

            if (this.board[a] && (this.board[a] === this.board[b] && this.board[a] === this.board[c])) {
                return combination;
            }
        }
        return null;
    }

    endGame() {
        let winCombination = this.findWinCombinations();
        if (winCombination) {
            return true;
        } else {
            return false;
        }
    }
}

// UPDATING VISIBLE X/O in the Game

class GameView {

    updateBoard(game) {
        this.updateTurn(game);
        const winnerText = document.querySelector('.winner-text');
        const winCombination = game.findWinCombinations();
        const crown = document.querySelector(".crown");
        for(let i=0; i < game.board.length; i++) {
            const tile = document.querySelector(`.board-tile[id='${i}']`);

            tile.classList.remove("tile-winner");

            let tileType = game.board[i] == 'X' ? "tile-x" : "tile-o";

            tile.innerHTML = `<span class="${tileType}">${game.board[i] ? game.board[i] : ""}</span>`

            if (winCombination && winCombination.includes(i)) {
                if (tileType == 'tile-x') {
                    winnerText.innerHTML = "🎊🎉Player-X Wins🎊🎉";
                    crown.innerHTML = "&#128081;"
                } else {
                    winnerText.innerHTML = "🎊🎉Player-O Wins🎊🎉";
                    crown.innerHTML = "&#128081;"
                }
                this.showPopUp();
                tile.classList.add("tile-winner");
            }
        }
    }

    updateTurn(game) {
        let playerX = document.querySelector(".player-x");
        let playerO = document.querySelector(".player-o");
        const winnerText = document.querySelector(".winner-text");
        const crown = document.querySelector(".crown");
        const winCombination = game.findWinCombinations();

        playerX.classList.remove('active');
        playerO.classList.remove('active');
        winnerText.innerHTML = " ";

        if (!game.board.includes(null) && !winCombination) {
            this.showPopUp();
            winnerText.innerHTML = "🤷🏻‍♂️ 🤷🏻‍♀️It's a Draw🤷🏻‍♂️ 🤷🏻‍♀️";
            crown.innerHTML = "&#128528;"
        }

        if (game.turn == 'X' && game.counter !== 9) {
            playerX.classList.add('active');
        } else {
            playerO.classList.add('active');
        }
    }

    showPopUp() {
        const popUpBox = document.querySelector(".popUp-container");
        popUpBox.classList.add("active");
    }
}

// FUNCTIONALITY

let game = new Game();
let gameView = new GameView();

let tiles = document.querySelectorAll(".board-tile");
tiles.forEach((tile) => {
    tile.addEventListener("click", () => {
        onTileClick(tile.id);
    })
});

function onTileClick(i) {
    game.makeMove(i);
    gameView.updateBoard(game);
}

document.querySelector(".start-btn").addEventListener("click", () => {
    onStartBtnClick();
});

function onStartBtnClick() {
    const popUpBox = document.querySelector(".popUp-container");
    popUpBox.classList.remove("active");
    game = new Game();
    gameView.updateBoard(game);
}

gameView.updateBoard(game);

