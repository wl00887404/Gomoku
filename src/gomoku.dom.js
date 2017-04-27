import style from './gomoku.dom.scss'

export default class DomHandler {
    constructor({root, players, rows, cols, gridSize,onclick}) {
        this.type = "dom"
        let container = document.createElement("div")
        container.classList.add(style.container)
        container.onclick=onclick
        container.style.fontSize = `${gridSize}px`
        root.appendChild(container)

        this.container = container
        this._setGrid(rows, cols)
        this.chessLayer = players.map(p => new ChessLayer({root: container, color: p.color}))
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
        gridLayer.classList.add(style.grid)
        gridLayer.style.height = `${rows - 1}em`
        gridLayer.style.width = `${cols - 1}em`
        this.container.appendChild(gridLayer)
        return gridLayer
    }
}

class ChessLayer {
    constructor({root, color}) {
        this._color = color
        let chessLayer = document.createElement("div")
        chessLayer.classList.add(style.chessLayer)
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
        chess.classList.add(style.chess)
        chess.style.backgroundColor = this._color
        return chess
    }
}
