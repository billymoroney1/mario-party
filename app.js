//grab dice and event listener
const dice = document.querySelector('.dice')
// dice.addEventListener('click', rollDice)

//game info
const gameInfo = document.querySelector('.gameInfo')

//player 1 info
const player1Info = document.querySelector('#p1')
const player1 = document.querySelector('.player1')

//player 2 info
const player2Info = document.querySelector('#p2')
const player2 = document.querySelector('.player2')


//when time to roll dice, use a timing function to have the number in the dice div change very frequently


//create a function that moves the mario picture clockwise by one square every 500ms
const move = () => {
    setInterval
    player1.style.gridColumnStart = '2'
    player1.style.gridColumnEnd = '2'
}

move()

// create function that cycles numbers through dice
const diceRoll = () => {
    setInterval(()=>{dice.innerText = Math.floor(Math.random() * 10)}, 100)
    console.log(dice.innerText)
}

diceRoll()


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