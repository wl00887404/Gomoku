import style from './gomoku.canvas.scss'

export default class CanvasHandler {
    constructor({root, players, rows, cols, gridSize,onclick}) {
        this.type = "canvas"
        let container = document.createElement("div")
        container.classList.add(style.container)
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
        grid.innerHTML="你的瀏覽器不支援Canvs<br/>請轉換成Dom顯示"
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
