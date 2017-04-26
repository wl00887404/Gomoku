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

export default class checkWinnerHandler {
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
