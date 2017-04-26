import Gomoku from "./gomoku.js"
import Player from './gomoku.player.js'
import style from './scss/style.scss'

let buttons = {
    newGame: document.querySelector('#newGame'),
    restart: document.querySelector('#restart'),
    undo: document.querySelector('#undo')
}
let radio=Array.from(document.querySelectorAll('input[type*=radio]'))
let log = document.querySelector('#log')

let game = new Gomoku({
    root: document.querySelector("#game"),
    players: [
        new Player({color: "black", name: "Player 1"}),
        new Player({color: "white", name: "Player 2"}),
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
