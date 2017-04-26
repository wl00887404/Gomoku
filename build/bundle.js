/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__gomoku_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__gomoku_player_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__scss_style_scss__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__scss_style_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__scss_style_scss__);




let buttons = {
    newGame: document.querySelector('#newGame'),
    restart: document.querySelector('#restart'),
    undo: document.querySelector('#undo')
}
let radio=Array.from(document.querySelectorAll('input[type*=radio]'))
let log = document.querySelector('#log')

let game = new __WEBPACK_IMPORTED_MODULE_0__gomoku_js__["a" /* default */]({
    root: document.querySelector("#game"),
    players: [
        new __WEBPACK_IMPORTED_MODULE_1__gomoku_player_js__["a" /* default */]({color: "black", name: "Player 1"}),
        new __WEBPACK_IMPORTED_MODULE_1__gomoku_player_js__["a" /* default */]({color: "white", name: "Player 2"}),
    ],
    rows: 15,
    cols: 15,
    gridSize: 48,
    log: (msg) => {
        let li = document.createElement("li")
        li.innerHTML = msg
        log.appendChild(li)
        log.scrollTop = log.scrollHeight - log.getBoundingClientRect().height;
    },
})

buttons.newGame.addEventListener("click", () => {
    newGame.style.display = "none"
    restart.style.display = "inline-block"
    undo.style.display = "inline-block"
    game.start()
})

buttons.restart.addEventListener("click", () => {
    Array.from(log.childNodes).forEach(childNode => log.removeChild(childNode))
    game.restart()
})
buttons.undo.addEventListener("click", game.undo.bind(game))

radio.forEach(r=>r.addEventListener("change",(e)=>{
    game.switchViewHandler(e.target.value)
}))


/***/ }),
/* 1 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"container":"_3V80gY2hEvhr7HmXtiaEss"};

/***/ }),
/* 2 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"container":"_2TCHaPinpxK1z28IY9vCqB","grid":"_1BYqnJhgjDohH4YOOjuPnN","chessLayer":"_1oNQkKhAdhScqbf-fw_hT","chess":"_3YsM8KDb2fgR4XyIos5c1f"};

/***/ }),
/* 3 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__gomoku_canvas_scss__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__gomoku_canvas_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__gomoku_canvas_scss__);


class CanvasHandler {
    constructor({root, players, rows, cols, gridSize,onclick}) {
        this.type = "canvas"
        let container = document.createElement("div")
        container.classList.add(__WEBPACK_IMPORTED_MODULE_0__gomoku_canvas_scss___default.a.container)
        container.onclick=onclick
        root.appendChild(container)

        this._gridSize = gridSize

        let width = cols * this._gridSize
        let height = rows * this._gridSize
        this._width = width
        this._height = height

        this.container = container
        this._setGrid(rows, cols)
        this.chessLayer = players.map(p => new ChessLayer({root: container, color: p.color, width, height, gridSize}))
        this.render(players)
    }
    render(players) {
        players.forEach((({
            moves
        }, i) => {
            let chessLayer = this.chessLayer[i]
            chessLayer.render(moves)
        }).bind(this))
    }
    unmount() {
        this.container.parentNode.removeChild(this.container)
    }
    _setGrid(rows, cols) {
        let grid = document.createElement("canvas")
        grid.width = this._width
        grid.height = this._height
        this.container.appendChild(grid)

        let ctx = grid.getContext('2d')
        ctx.fillStyle = "rgb(255, 195, 77)"
        ctx.fillRect(0, 0, this._width, this._height)

        ctx.fillStyle = "black"
        ctx.beginPath()

        let padding = this._gridSize / 2
        let x0 = padding
        let x1 = this._width - padding
        let y0 = padding
        let y1 = this._height - padding

        for (let i = 0; i < cols; i++) {
            let x = i * this._gridSize + padding
            ctx.moveTo(x, y0)
            ctx.lineTo(x, y1)
        }
        for (let i = 0; i < rows; i++) {
            let y = i * this._gridSize + padding
            ctx.moveTo(x0, y)
            ctx.lineTo(x1, y)
        }

        ctx.closePath()
        ctx.stroke()
    }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = CanvasHandler;


class ChessLayer {
    constructor({root, color, width, height, gridSize}) {
        this._gridSize = gridSize
        this._padding = gridSize / 2
        this._chessSize = gridSize * 0.6
        this.moves = {}

        let chessLayer = document.createElement("canvas")
        chessLayer.width = width
        chessLayer.height = height
        root.appendChild(chessLayer)

        this._target = chessLayer.getContext('2d')
        this._target.fillStyle = color

    }
    render(moves) {
        let notExistedMoves = Object.assign({}, this.moves)
        moves.forEach((move => {
            if (!this.moves[move.step]) {
                this._putChess(move)
            } else {
                delete notExistedMoves[move.step]
                if (this._shouldUpdate(move)) {
                    this._modifyChess(move)
                }
            }
        }).bind(this))
        for (let step in notExistedMoves) {
            this._removeChess(step)
        }
    }

    _shouldUpdate({step, x, y}) {
        if (this.moves[step].x == x && this.moves[step].y == y) {
            return false
        } else {
            return true
        }
    }

    _putChess({x, y, step,}) {
        let ctx = this._target
        ctx.beginPath()
        ctx.arc(x * this._gridSize + this._padding, y * this._gridSize + this._padding, this._chessSize / 2, 0, Math.PI * 2, true);
        ctx.closePath()
        ctx.fill()
        ctx.stroke()
        this.moves[step] = {
            x,
            y
        }

    }

    _modifyChess({x, y, step}) {
        this._removeChess(step)
        this._putChess({x, y, step,})
    }

    _removeChess(step) {
        let {_gridSize, _padding, _chessSize,} = this
        let {x, y} = this.moves[step]
        _chessSize *= 1.5
        this._target.clearRect(x * _gridSize + _padding - _chessSize / 2, y * _gridSize + _padding - _chessSize / 2, _chessSize, _chessSize)
        delete this.moves[step]
    }

}


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Array.prototype.groupBy = function(callback) {
    let obj = {}
    let result = []
    this.forEach(el => {
        let index = callback(el)
        if (!obj.hasOwnProperty(index)) {
            obj[index] = []
        }
        obj[index].push(el)
    })
    for (let key in obj) {
        result.push(obj[key])
    }
    return result
}

class checkWinnerHandler {
    constructor(winAmount) {
        this.winAmount=winAmount||5
    }
    check(move) {
        return this._hasHorizontalWin(move) || this._hasVerticalWin(move) || this._hasDiagonalWin(move) || this._hasBackDiagonalWin(move)
    }
    _hasHorizontalWin(move) {
        let row = move.groupBy(p => p.y).filter(r => r.length >= this.winAmount).map(r => r.map(p => p.x).sort((b, a) => b - a))

        for (let i = 0; i < row.length; i++) {
            let col = row[i]
            let accumulate = 1
            for (let j = 0; j < col.length - 1; j++) {
                if ((col[j + 1] - col[j]) == 1) {
                    accumulate += 1
                    if (accumulate >= this.winAmount) {
                        return true
                    }
                } else {
                    accumulate = 1
                }
            }
        }
        return false
    }
    _hasVerticalWin(move) {
        return this._hasHorizontalWin(move.map(p => {
            return {x: p.y, y: p.x}
        }))
    }
    _hasDiagonalWin(move) {
        return this._hasHorizontalWin(move.map(p => {
            return {
                x: -p.x,
                y: p.y + p.x
            }
        }))
    }
    _hasBackDiagonalWin(move) {
        return this._hasHorizontalWin(move.map(p => {
            return {
                x: p.x,
                y: p.y - p.x
            }
        }))
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = checkWinnerHandler;



/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__gomoku_dom_scss__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__gomoku_dom_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__gomoku_dom_scss__);


class DomHandler {
    constructor({root, players, rows, cols, gridSize,onclick}) {
        this.type = "dom"
        let container = document.createElement("div")
        container.classList.add(__WEBPACK_IMPORTED_MODULE_0__gomoku_dom_scss___default.a.container)
        container.onclick=onclick
        container.style.fontSize = `${gridSize}px`
        root.appendChild(container)

        this.container = container
        this._setGrid(rows, cols)
        this.chessLayer = players.map(p => new ChessLayer({root: container, color: p.color}))
        this.render(players)
    }

    render(players) {
        players.forEach((({
            moves
        }, i) => {
            let chessLayer = this.chessLayer[i]
            chessLayer.render(moves)
        }).bind(this))
    }

    unmount() {
        this.container.parentNode.removeChild(this.container)
    }

    _setGrid(rows, cols) {
        let gridLayer = document.createElement("div")
        gridLayer.classList.add(__WEBPACK_IMPORTED_MODULE_0__gomoku_dom_scss___default.a.grid)
        gridLayer.style.height = `${rows - 1}em`
        gridLayer.style.width = `${cols - 1}em`
        this.container.appendChild(gridLayer)
        return gridLayer
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = DomHandler;


class ChessLayer {
    constructor({root, color}) {
        this._color = color
        let chessLayer = document.createElement("div")
        chessLayer.classList.add(__WEBPACK_IMPORTED_MODULE_0__gomoku_dom_scss___default.a.chessLayer)
        root.appendChild(chessLayer)
        this._target = chessLayer
        this.moves = {}

    }
    render(moves) {
        let notExistedMoves = Object.assign({}, this.moves)
        moves.forEach((move => {
            if (!this.moves[move.step]) {
                this._putChess(move)
            } else {
                delete notExistedMoves[move.step]
                if (this._shouldUpdate(move)) {
                    this._modifyChess(move)
                }
            }
        }).bind(this))
        for (let step in notExistedMoves) {
            this._removeChess(step)
        }
    }
    _shouldUpdate({step, x, y,}) {
        if (this.moves[step].x == x && this.moves[step].y == y) {
            return false
        } else {
            return true
        }
    }

    _putChess({x, y, step}) {
        let chess = this._makeChess()
        chess.style.top = `${y}em`
        chess.style.left = `${x}em`
        this._target.appendChild(chess)
        this.moves[step] = {
            x,
            y,
            _target: chess,
        }
    }
    _modifyChess({x, y, step,}) {
        let chess = this.moves[step]._target
        chess.style.top = `${y}em`
        chess.style.left = `${x}em`
        this.moves[step].x = x
        this.moves[step].y = y
    }
    _removeChess(step) {
        this._target.removeChild(this.moves[step]._target)
        delete this.moves[step]
    }

    _makeChess() {
        let chess = document.createElement("div")
        chess.classList.add(__WEBPACK_IMPORTED_MODULE_0__gomoku_dom_scss___default.a.chess)
        chess.style.backgroundColor = this._color
        return chess
    }
}


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__gomoku_dom_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__gomoku_canvas_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__gomoku_checkWinner_js__ = __webpack_require__(5);



class Gomoku {
    constructor({root, rows, cols, players, gridSize,log}) {

        this.log=log||((msg)=>console.log(msg))
        this.players = players
        this.gridSize = gridSize

        this.state = {
            turn: 0,
            clickAble: false,
            playing: false,
            nowPlayer: this.players[0],
        }

        let viewSetting={root, players, rows, cols, gridSize,onclick:this._move.bind(this)}

        this.handler = {
            view: new __WEBPACK_IMPORTED_MODULE_1__gomoku_canvas_js__["a" /* default */](viewSetting),
            checkWinner: new __WEBPACK_IMPORTED_MODULE_2__gomoku_checkWinner_js__["a" /* default */](),
        }


        this.switchViewHandler=this.switchViewHandler.bind(this,viewSetting)
    }

    start() {
        if (this.state.playing) {
            this.log("This game is started")
            return
        }
        this.state.playing = true
        this.state.clickAble = true
        this.log("Start!")

    }

    restart() {
        if (this.state.playing) {
            if (!confirm('Are you sure to restart?')) {
                return
            }
        }

        this.state.turn = 0
        this.state.playing = false
        this.state.nowPlayer = this.players[0]

        this.players.forEach(p => {
            p._step = 0
            p.moves = []
        })

        this._render()
        this.start()

    }

    undo() {
        if (!this.state.playing) {
            this.log("No game is been playing")
            return
        }
        if(this.state.turn == 0 ){
            this.log("There is no chess on the board")
            return
        }

        this.log(`${this.state.nowPlayer} undo`)
        this.state.turn -= 1
        this.state.nowPlayer = this.players[this.state.turn % this.players.length]
        this.state.nowPlayer.undoMove()
        this._render()
    }

    switchViewHandler(viewSetting,handler){
        if(this.handler.view.type==handler){
            return
        }
        this.handler.view.unmount();
        switch (handler) {
            case "canvas":
                this.handler.view=new __WEBPACK_IMPORTED_MODULE_1__gomoku_canvas_js__["a" /* default */](viewSetting)
                break
            case "dom":
                this.handler.view=new __WEBPACK_IMPORTED_MODULE_0__gomoku_dom_js__["a" /* default */](viewSetting)
                break
            default:
                break
        }
    }

    _checkWinner() {
        return this.handler.checkWinner.check(this.state.nowPlayer.moves)
    }

    _checkMoveValid(x, y) {
        for (let i = 0; i < this.players.length; i++) {
            for (let j = 0; j < this.players[i].moves.length; j++) {
                let c = this.players[i].moves[j]
                if (c.x == x && c.y == y) {
                    return false
                }
            }
        }
        return true
    }

    _move({clientX, clientY,}) {
        if (!this.state.clickAble || !this.state.playing) {
            return
        }
        let {top, left,} = this.handler.view.container.getBoundingClientRect()
        let x = Math.floor((clientX - left) / this.gridSize)
        let y = Math.floor((clientY - top) / this.gridSize)

        if (!this._checkMoveValid(x, y)) {
            this.log("This move is not valid")
            return
        }

        this.state.clickAble = false
        this.state.nowPlayer.nextMove({x, y,})
        this._render()
        this.log(`${this.state.nowPlayer.name} put a chess at (${x},${y})`)
        if (this._checkWinner(this.state.nowPlayer.moves)) {
            this.state.playing = false
            this.log(`${this.state.nowPlayer.name} win!!`)
        } else {
            this._nextTurn()
        }
    }

    _nextTurn() {
        this.state.clickAble = true
        this.state.turn += 1
        this.state.nowPlayer = this.players[this.state.turn % this.players.length]
    }

    _render() {
        return this.handler.view.render(this.players)
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Gomoku;



/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Player {
    constructor({name,color}) {
        this.name=name
        this.color = color
        this._step = 0
        this.moves = []
    }
    nextMove(coordinate) {
        this.moves.push(Object.assign({}, coordinate, {step: this._step}))
        this._step++
    }
    undoMove(){
        this.moves.pop()
        this._step--
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Player;



/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(0);


/***/ })
/******/ ]);