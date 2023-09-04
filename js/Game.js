import { Cell } from "./Cell.js";
import { Ui } from "./Ui.js";
import { Counter } from "./Counter.js";
import { Timer } from "./Timer.js";

class Game extends Ui {
    #config = {
        easy: {
          rows: 8,
          cols: 8,
          mines: 10,
        },
        normal: {
          rows: 16,
          cols: 16,
          mines: 40,
        },
        expert: {
          rows: 16,
          cols: 30,
          mines: 99,
        },
      };

    #counter = new Counter();
    #timer = new Timer();

    #numberOfRows = null;
    #numberOfCols = null;
    #numberOfMines = null;

    #cells = [];
    #cellsElements = null;

    #board = null;

    initializeGame() {
        this.#handleElements();
        this.#counter.init();
        this.#timer.init();
        this.#newGame();   
        
    }
    #newGame(
        rows = this.#config.normal.rows, 
        cols = this.#config.normal.cols, 
        mines = this.#config.normal.mines,
        ) {
            this.#numberOfRows = rows;
            this.#numberOfCols = cols;
            this.#numberOfMines = mines;

            this.#counter.setValue(this.#numberOfMines);
            this.#timer.startTimer();


            this.#setStyles();

            this.#generateCells();
            this.#renderBoard();

            this.#cellsElements = this.getElements(this.UiSelectors.cell);

            this.#addCellsEventListeners();
        }

        #handleElements() {
            this.#board = this.getElement(this.UiSelectors.board);
        };

        #addCellsEventListeners() {
          this.#cellsElements.forEach((element) => {
            element.addEventListener('click', this.#handleCellClick);
            element.addEventListener('contextmenu', this.#handleCellContextMenu);
          });
        }
        #generateCells() {
            this.#cells.length = 0;
            for (let row = 0; row < this.#numberOfRows; row++) {
              this.#cells[row] = [];
            for (let col = 0; col < this.#numberOfCols; col++) {
            this.#cells[row].push(new Cell(col, row));
            }
            }
          }
          #renderBoard() {
            while (this.#board.firstChild) {
              this.#board.removeChild(this.#board.lastChild);
            }
            this.#cells.flat().forEach((cell) => {
              this.#board.insertAdjacentHTML('beforeend', cell.createElement());
              cell.element = cell.getElement(cell.selector);
            });
          }

          #handleCellClick = (e) => {
            const target = e.target;
            const rowIndex = parseInt(target.getAttribute('data-y'), 10);
            const colIndex = parseInt(target.getAttribute('data-x'), 10);
        
            const cell = this.#cells[rowIndex][colIndex].revealCell();
          };

          #handleCellContextMenu = (e) => {
          e.preventDefault();
          const target = e.target;
          const rowIndex = parseInt(target.getAttribute('data-y'), 10);
          const colIndex = parseInt(target.getAttribute('data-x'), 10);

          const cell = this.#cells[rowIndex][colIndex];

          if (cell.isReveal) return;

          if (cell.isFlagged) {
            this.#counter.increment();
            cell.toggleFlag();
            return;
          }

          if (!!this.#counter.value) {
            this.#counter.decrement();
            cell.toggleFlag();
          }
          };

          #setStyles() {
            document.documentElement.style.setProperty('--cells-in-row', this.#numberOfCols);
          }
}

window.onload = function() {
    const game = new Game();

    game.initializeGame();
}