const X_CLASS = 'x'
const O_CLASS = 'o'
const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
let OTurn
const winningElement = document.getElementById('winning-message')
const winningTextElement = document.querySelector('[data-winning-message-txt]')
const restartBtn = document.getElementById('restartButton')
const WIN_CONDITION = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

startGame()
restartBtn.addEventListener('click',startGame)

function startGame(){
    OTurn = false
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(O_CLASS)
        cell.removeEventListener('click',handleClick)
        cell.addEventListener('click',handleClick,{once:true})
    })
    setBoardHoverClass()
    winningElement.classList.remove('show')
}
function handleClick(e){
    const cell = e.target
    const currClass = OTurn ? O_CLASS:X_CLASS
    placeMark(cell, currClass)
    if(checkWin(currClass)){
        endGame(false)
    }
    else if(isDraw()){
        endGame(true)
    }
    else{
        swapTurns()
        setBoardHoverClass()
    }
}
function endGame(draw){
    if(draw){
        winningTextElement.innerText = 'Draw!'
        winningElement.classList.add('show')
    }
    else{
        winningTextElement.innerText = `${OTurn? "O's":"X's"} Wins!`
        winningElement.classList.add('show')
    }
    restartBtn.addEventListener()
}
function isDraw(){
    return [...cellElements].every(cell =>{
        return cell.classList.contains(X_CLASS) ||
        cell.classList.contains(O_CLASS)
    })
}
function placeMark(cell,currClass){
    cell.classList.add(currClass)
}
function swapTurns(){
    OTurn = !OTurn
}
function setBoardHoverClass(){
    board.classList.remove(X_CLASS)
    board.classList.remove(O_CLASS)
    if(OTurn) board.classList.add(O_CLASS)
    else board.classList.add(X_CLASS)
}

function checkWin(currClass){
    return WIN_CONDITION.some(combination =>{
        return combination.every(index => {
            return cellElements[index].classList.contains(currClass)
        })
    })
}