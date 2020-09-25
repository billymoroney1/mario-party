//need this id for setInterval() to be 
let rolling
// create function that rolls dice
const diceRoll = () => {
    let diceNum
    // begin dice rolling if clicked on, this will probably change when i add more to the flow of the game. this is more for testing purp
    if (dice.innerText === ''){
        rolling = setInterval(()=>{dice.innerText = Math.floor(Math.random() * 10)}, 100)
        console.log(rolling)
    } 
    // if the dice is rolling, grab the value inside and console log it and stop rolling
    else if (dice.innerText !== ''){
        clearInterval(rolling)
        diceNum = dice.innerText
        console.log('Rolled a ', diceNum)
        setTimeout(() => {dice.innerText = ''}, 1000)
    }
}

//grab dice and event listener
const dice = document.querySelector('.dice')
dice.addEventListener('click', diceRoll)

//game info
const gameInfo = document.querySelector('.gameInfo')

//player 1 info
const player1Info = document.querySelector('#p1')
const player1 = document.querySelector('.player1')

//player 2 info
const player2Info = document.querySelector('#p2')
const player2 = document.querySelector('.player2')

//variables necessary for move function
let startX
let endX
let startY
let endY
let tileNum = 1

//player object

class Player {
    constructor(position, money, stars){
        this.position = position
        this.money = money
        this.stars = stars
    }

}

const move = (position, numOfSquares) => {
    startX = parseInt(window.getComputedStyle(player1).getPropertyValue('grid-column-start'))
    endX = parseInt(window.getComputedStyle(player1).getPropertyValue('grid-column-end'))
    startY = parseInt(window.getComputedStyle(player1).getPropertyValue('grid-row-start'))
    endY = parseInt(window.getComputedStyle(player1).getPropertyValue('grid-row-end'))

    console.log(startX, endX, startY, endY)

    tileNum = position
    let moving =setInterval(() => {
        
            console.log('interval')
            if (tileNum < 5){
                startX++
                endX++
                player1.style.gridColumnStart = `${startX}`
                player1.style.gridColumnEnd = `${endX}`
                tileNum++
            } else if (tileNum < 9){
                startY++
                endY++
                player1.style.gridRowStart = `${startY}`
                player1.style.gridRowEnd = `${endY}`
                tileNum++
            } else if (tileNum < 13){
                startX--
                endX--
                player1.style.gridColumnStart = `${startX}`
                player1.style.gridColumnEnd = `${endX}`
                tileNum++
            } else if (tileNum < 16){
                startY--
                endY--
                player1.style.gridRowStart = `${startY}`
                player1.style.gridRowEnd = `${endY}`
                tileNum++
            } else {
                startX = 1
                endX = 1
                startY = 1
                endY = 1
                player1.style.gridColumnStart = `${startX}`
                player1.style.gridColumnEnd = `${endX}`
                player1.style.gridRowStart = `${startY}`
                player1.style.gridRowEnd = `${endY}`
                tileNum = 1
            }
            numOfSquares--
            if (numOfSquares === 0){
                clearInterval(moving)
            }
        
    }, 500)}

move(1, 5)








// let gameOver = false
// let p1Turn = true
// //game loop
// while (gameOver !== true){
//     if (p1Turn === true){
//         gameInfo.innerText = 'Roll!'
//         //grab the number in the dice at the time of clicking
//         //loop and change styling of each div (or overlap divs?)
//     } 
// }