//need this id for setInterval() to be 
let rolling
// create function that rolls dice
const diceRoll = () => {
    let diceNum
    // begin dice rolling if clicked on, this will probably change when i add more to the flow of the game. this is more for testing purp
    if (dice.innerText === ''){
        rolling = setInterval(()=>{dice.innerText = Math.floor(Math.random() * 10)}, 100)
    } 
    // if the dice is rolling, grab the value inside and console log it and stop rolling
    else if (dice.innerText !== ''){
        clearInterval(rolling)
        diceNum = dice.innerText
        if (diceNum > 0){
            move(mario.position, diceNum)
        }
        setTimeout(() => {dice.innerText = ''}, 1000)
    }
}

class Player {
    constructor(position = 1, money = 0, stars = 0){
        this.position = position
        this.money = money
        this.stars = stars
        this.items = []
    }

}

//this function will run when the game is loaded to assign squares with certain properties
//array of + money squares
const plusMoney = []
//array of - money squares
const minusMoney = []
//position of star
let starPos
//position of store
let storePos

const tileStyle = (pos, styleClass) => {
    if (pos < 6){
        let tileID = '#a' + `${pos}`
        let tile = document.querySelector(tileID)
        tile.classList.add(styleClass)
    } else if (pos < 10){
        let tileID = '#b' + `${pos}`
        let tile = document.querySelector(tileID)
        tile.classList.add(styleClass)
    } else if (pos < 17){
        let tileID = '#c' + `${pos}`
        let tile = document.querySelector(tileID)
        tile.classList.add(styleClass)      
    }
}

const boardSetup = () => {
    //create 4 + money squares
    for (let i = 0; i < 4; i++){
        let pos = Math.floor(Math.random() * 15 + 1)
        while(plusMoney.includes(pos)){
            pos = Math.floor(Math.random() * 15 + 1)
        }
        plusMoney.push(pos)
        //change styling of tiles
        tileStyle(pos, 'plusMoney')  
    } 
    //create 4 - money squares, cannot overlap with + money
    for (let i = 0; i < 4; i++){
        let pos = Math.floor(Math.random() * 15 + 1)
        while (plusMoney.includes(pos) || minusMoney.includes(pos)){
            pos = Math.floor(Math.random() * 15 + 1)
        }
        minusMoney.push(pos)
        tileStyle(pos, 'minusMoney')
    }
    //star tile that does not overlap
    let foundStar = false
    while (foundStar === false){
        let pos = Math.floor(Math.random() * 15 + 1)
        if (plusMoney.includes(pos) === false && minusMoney.includes(pos) === false){
            starPos = pos
            foundStar = true
        }
    }
    tileStyle(starPos, 'star')

    let foundStore = false
    while (foundStore === false){
        let pos = Math.floor(Math.random() * 15 + 1)
        if (plusMoney.includes(pos) === false && minusMoney.includes(pos) === false && starPos !== pos){
            storePos = pos
            foundStore = true
        }
    }
    tileStyle(storePos, 'store')
}

boardSetup()

//function that tests what square a player lands on
const squareCheck = (square) => {
    if (plusMoney.includes(square)){
        mario.money += 3
    } else if (minusMoney.includes(square)){
        if (mario.money - 2 < 0){
            mario.money = 0
        } else {
            mario.money -= 2
        }
    }
    player1Info.innerText = `Mario \n Coins: ${mario.money} \n Stars: ${mario.stars}`
}
//function that checks if player passes a star 
//needs to clearInterval and restart it with remaining moves when player makes a decision

const mario = new Player()

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

//buttons
const buttons = document.querySelectorAll('button')

//variables necessary for move function
let startX
let endX
let startY
let endY
let position = 1
//variable to allow for restarting movement in star/store check functions
let remainingSquares

//player object

//create this variable (ID for moving setInterval) in global scope so that i can manipulate in other functions
let moving

const move = (position, numOfSquares) => {
    startX = parseInt(window.getComputedStyle(player1).getPropertyValue('grid-column-start'))
    endX = parseInt(window.getComputedStyle(player1).getPropertyValue('grid-column-end'))
    startY = parseInt(window.getComputedStyle(player1).getPropertyValue('grid-row-start'))
    endY = parseInt(window.getComputedStyle(player1).getPropertyValue('grid-row-end'))

    remainingSquares = numOfSquares
    //need this conditional to prevent the star/item functions from making an additional move when remainingSquares = 0
    if (remainingSquares !== 0){
            moving =setInterval(() => {
            
                if (position < 5){
                    startX++
                    endX++
                    player1.style.gridColumnStart = `${startX}`
                    player1.style.gridColumnEnd = `${endX}`
                    position++
                    starAndStoreCheck(position)
                } else if (position < 9){
                    startY++
                    endY++
                    player1.style.gridRowStart = `${startY}`
                    player1.style.gridRowEnd = `${endY}`
                    position++
                    starAndStoreCheck(position)
                } else if (position < 13){
                    startX--
                    endX--
                    player1.style.gridColumnStart = `${startX}`
                    player1.style.gridColumnEnd = `${endX}`
                    position++
                    starAndStoreCheck(position)
                } else if (position < 16){
                    startY--
                    endY--
                    player1.style.gridRowStart = `${startY}`
                    player1.style.gridRowEnd = `${endY}`
                    position++
                    starAndStoreCheck(position)
                } else {
                    startX = 1
                    endX = 1
                    startY = 1
                    endY = 1
                    player1.style.gridColumnStart = `${startX}`
                    player1.style.gridColumnEnd = `${endX}`
                    player1.style.gridRowStart = `${startY}`
                    player1.style.gridRowEnd = `${endY}`
                    position = 1
                    starAndStoreCheck(position)
                }
                numOfSquares--
                remainingSquares--
                mario.position = position

                if (numOfSquares <= 0){
                    clearInterval(moving)
                    mario.position = position
                    starAndStoreCheck(position)
                    squareCheck(position)
                }
            
        }, 500)
    }
}

const starAndStoreCheck = (pos) => {
    if (pos === starPos){
        //stop movement
        clearInterval(moving)
        //can i determine how many more squares left to move from here?
        document.querySelector('p').innerText = "Buy a star for 20 coins?"
        buttons[0].innerText = 'Yes'
        buttons[1].innerText = 'No'
        buttons[0].style.visibility = 'visible'
        buttons[1].style.visibility = 'visible'
        //need to remove existing event listeners and place new ones, then put back old event listener when done with this logic
        buttons[0].removeEventListener('click', diceRoll)
        buttons[1].removeEventListener('click', chooseItem)
        //need to restart movement in buyStar, declineStar functions
        buttons[0].addEventListener('click', buyStar)
        buttons[1].addEventListener('click', declineStar)
    } else if (pos === storePos){
        clearInterval(moving)
        document.querySelector('p').innerText = 'Buy an item?'
        buttons[0].innerText = 'Green Shell - 5 Coins'
        buttons[1].innerText = 'No'
        buttons[0].style.visibility = 'visible'
        buttons[1].style.visibility = 'visible'
        //event listener swap that allows for purchase of items
        buttons[0].removeEventListener('click', diceRoll)
        buttons[1].removeEventListener('click', chooseItem)
        //need to restart movement in buyItem, declineItem functions
        buttons[0].addEventListener('click', buyItem)
        buttons[1].addEventListener('click', declineItem)
    }
}

const chooseItem = () => {
    //make item inventory display
    // add event listners to items
    // remove an item from inventory and implement item's effect 
}

//some utility functions to change info in game info box
const changeStarToMove = () => {
    buttons[0].removeEventListener('click', buyStar)
    buttons[1].removeEventListener('click', declineStar)
    buttons[0].addEventListener('click', diceRoll)
    buttons[1].addEventListener('click', chooseItem)
    buttons[0].innerText = 'Roll'
    buttons[1].innerText = 'Item'
    document.querySelector('p').innerText = 'Your move'
}
const buyStar = () => {
    if (mario.money >= 20){
        mario.money -= 20
        mario.star += 1
        //revert game info box
        changeStarToMove()
        move(mario.position, remainingSquares)
    } else {
        document.querySelector('p').innerText = 'Not enough cash!'
        changeStarToMove()
        move(mario.position, remainingSquares)
    }
}
const declineStar = () => {
    changeStarToMove()
    move(mario.position, remainingSquares)
}

const changeItemToMove = () => {
    buttons[0].removeEventListener('click', buyItem)
    buttons[1].removeEventListener('click', declineItem)
    buttons[0].addEventListener('click', diceRoll)
    buttons[1].addEventListener('click', chooseItem)
    buttons[0].innerText = 'Roll'
    buttons[1].innerText = 'Item'
    document.querySelector('p').innerText = 'Your move'
}
const buyItem = () => {
    if (mario.money >= 5) {
        mario.money -= 5
        mario.items.push('greenShell')
        //change buttons and event listeners
        changeItemToMove()
        move(mario.position, remainingSquares)
    } else {
        document.querySelector('p').innerText = 'Not enough cash!'
        changeItemToMove()
        move(mario.position, remainingSquares)
    }
}

const declineItem = () => {
    changeItemToMove()
    move(mario.position, remainingSquares)
}

const turnOptions = () => {
    // change text in game info box
    document.querySelector('p').innerText = 'Your Turn!'
    // make the Move and Item buttons appear
    for (let i = 0; i < buttons.length; i++){
        buttons[i].style.visibility = 'visible'
    }
}

//function to display up to three items where the move and item buttons usually are


buttons[0].addEventListener('click', diceRoll)
// buttons[1].addEventListener('click', chooseItem)

// let turns = 0
// while (turns < 20){
//     // display options in gameinfo panel
turnOptions()
//     //use event listener to determine what buttons do
//     //make buttons disappear until next choice is available
//     turns++
// }