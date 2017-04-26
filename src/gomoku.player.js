export default class Player {
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
