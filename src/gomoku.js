import DomHandler from './gomoku.dom.js'
import CanvasHandler from "./gomoku.canvas.js"
import WinnerHandler from './gomoku.checkWinner.js'
export default class Gomoku {
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
            view: new DomHandler(viewSetting),
            checkWinner: new WinnerHandler(),
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
                this.log("render with Canvas")
                this.handler.view=new CanvasHandler(viewSetting)
                break
            case "dom":
                this.log("render with Canvas")
                this.handler.view=new DomHandler(viewSetting)
                break
            default:
                this.log("unknowen view handler")
                break
        }
        this._render()
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
