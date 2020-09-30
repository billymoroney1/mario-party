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
        console.log(dice.innerText)
        diceNum = dice.innerText
        if (diceNum > 0){
            move(mario, mario.position, diceNum)
        } else if (diceNum === '0'){
            computerMove()
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

const mario = new Player()
const donkeyKong = new Player()



//this function will run when the game is loaded to assign squares with certain properties
//array of + money squares
const plusMoney = []
//array of - money squares
const minusMoney = []
//position of star
let starPos
//position of store
let storePos
//boolean to keep track of which turn
let playerMove = true
//number of turns
let turns = 0

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
        while(plusMoney.includes(pos) || minusMoney.includes(pos)){
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

const updateInfo = (character) => {
    if (character === 'mario'){
        player1Info.innerText = `Mario \n Coins: ${mario.money} \n Stars: ${mario.stars}`
    } else if (character === 'donkeyKong'){
        player2Info.innerText = `Donkey Kong \n Coins: ${donkeyKong.money} \n Stars: ${donkeyKong.stars}`
    }
}

//function that tests what square a player lands on
const squareCheck = (square) => {
    if (plusMoney.includes(square)){
        mario.money += 50
    } else if (minusMoney.includes(square)){
        if (mario.money - 2 < 0){
            mario.money = 0
        } else {
            mario.money -= 2
        }
    }
    player1Info.innerText = `Mario \n Coins: ${mario.money} \n Stars: ${mario.stars}`
    //trigger computer move when the final square is tested
    computerMove()
}
//function that checks if player passes a star 
//needs to clearInterval and restart it with remaining moves when player makes a decision

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

buttons[0].addEventListener('click', diceRoll)
// buttons[1].addEventListener('click', chooseItem)

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

const move = (character, position, numOfSquares) => {
    if (character === mario){
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
                if (character === mario){
                    mario.position = position
                } else if (character === donkeyKong){
                    donkeyKong.position = position
                }

                if (numOfSquares <= 0){
                    clearInterval(moving)
                        if (character === mario){
                        mario.position = position
                    } else if (character === donkeyKong){
                        donkeyKong.position = position
                    }
                    if (position === storePos || position === starPos){
                        starAndStoreCheck(position, true)
                    } else {
                        squareCheck(position)
                    }
                }
            
        }, 500)
    }
    }
}

const computerStoreStarCheck = () => {
    if (donkeyKong.position === starPos){
        if (donkeyKong.money >= 20){
            donkeyKong.money -= 20
            donkeyKong.stars += 1
        } 
    } else if (donkeyKong.position === storePos){
            if (donkeyKong.money >= 5){
                donkeyKong.money -= 5
                donkeyKong.items.push('greenShell')
                fillInventory('donkeyKong')
                console.log('donkey kong buys a shell')
                //make sure donkey kong will use the item at the start of their turn
            }
        }
        updateInfo('donkeyKong')
    }


const computerSquareCheck = () => {
    if (plusMoney.includes(donkeyKong.position)){
        donkeyKong.money += 50
    } else if (minusMoney.includes(donkeyKong.position)){
        if (donkeyKong.money - 2 < 0) {
            donkeyKong.money = 0
        } else {
            donkeyKong.money -= 2
        }
    }
    updateInfo('donkeyKong')
}

//function to see if donkey kong has any items, and if he does, use one

const computerItemCheck = () => {
    if (donkeyKong.items.includes('greenShell')){
        if (mario.money - 5 < 0){
            mario.money = 0
        } else {
            mario.money -= 5
        }
        donkeyKong.items.pop()
        let items = document.querySelectorAll('.DKitems')
    for (let i = items.length - 1; i >= 0; i--){
        if (items[i].classList.contains('greenShell')){
            items[i].classList.remove('greenShell')
            donkeyKong.items.pop()
            i = -1
            updateInfo('donkeyKong')
        }
    }
    console.log('donkey kong uses an item')
    }
    updateInfo('donkeyKong')
    updateInfo('mario')
}

let dkMoving
const computerMove = () => {
    computerItemCheck()
    let diceNum = Math.floor(Math.random() * 10)
    console.log('Donkey kong rolled a ', diceNum)
    startX = parseInt(window.getComputedStyle(player2).getPropertyValue('grid-column-start'))
    endX = parseInt(window.getComputedStyle(player2).getPropertyValue('grid-column-end'))
    startY = parseInt(window.getComputedStyle(player2).getPropertyValue('grid-row-start'))
    endY = parseInt(window.getComputedStyle(player2).getPropertyValue('grid-row-end'))

        if (diceNum !== 0){
            dkMoving = setInterval(() => {
            
                if (donkeyKong.position < 5){
                    startX++
                    endX++
                    player2.style.gridColumnStart = `${startX}`
                    player2.style.gridColumnEnd = `${endX}`
                    donkeyKong.position++
                    //computer store check?
                    computerStoreStarCheck()
                } else if (donkeyKong.position < 9){
                    startY++
                    endY++
                    player2.style.gridRowStart = `${startY}`
                    player2.style.gridRowEnd = `${endY}`
                    donkeyKong.position++
                    //computer store check?
                    computerStoreStarCheck()
                } else if (donkeyKong.position < 13){
                    startX--
                    endX--
                    player2.style.gridColumnStart = `${startX}`
                    player2.style.gridColumnEnd = `${endX}`
                    donkeyKong.position++
                    computerStoreStarCheck()
                    // computer store check?
                } else if (donkeyKong.position < 16){
                    startY--
                    endY--
                    player2.style.gridRowStart = `${startY}`
                    player2.style.gridRowEnd = `${endY}`
                    donkeyKong.position++
                    computerStoreStarCheck()
                    //computer store check?
                } else {
                    startX = 1
                    endX = 1
                    startY = 1
                    endY = 1
                    player2.style.gridColumnStart = `${startX}`
                    player2.style.gridColumnEnd = `${endX}`
                    player2.style.gridRowStart = `${startY}`
                    player2.style.gridRowEnd = `${endY}`
                    donkeyKong.position = 1
                    //computer store check?
                    computerStoreStarCheck()
                }
                diceNum--

                if (diceNum <= 0){
                    clearInterval(dkMoving)
                    //computer store and square check?
                    computerSquareCheck()
                }
            
        }, 500)
        turns++
        //put end game process hear
        console.log('Turns: ', turns)
        if (turns === 20){
            document.querySelector('gameInfo').innerText = 'Game Over'
        }
    }
}


const starAndStoreCheck = (pos, lastMove = false) => {
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
        if (lastMove === true){
            computerMove()
        }
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
        if (lastMove === true){
            computerMove()
        }
    }
}

//use green shell if available
const chooseItem = () => {
    let items = document.querySelectorAll('.items')
    for (let i = items.length - 1; i >= 0; i--){
        if (items[i].classList.contains('greenShell')){
            console.log('donkeyKong.money ', donkeyKong.money)
            donkeyKong.money -= 3
            console.log('donkeyKong.money ', donkeyKong.money)
            items[i].classList.remove('greenShell')
            mario.items.pop()
            i = -1
            updateInfo('donkeyKong')
        }
    }
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
        mario.stars += 1
        //revert game info box
        changeStarToMove()
        updateInfo('mario')
        move(mario, mario.position, remainingSquares)
    } else {
        document.querySelector('p').innerText = 'Not enough cash!'
        changeStarToMove()
        move(mario, mario.position, remainingSquares)
    }
}
const declineStar = () => {
    changeStarToMove()
    move(mario, mario.position, remainingSquares)
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
        //function to update inventory div
        fillInventory('mario')
        //change buttons and event listeners
        changeItemToMove()
        move(mario, mario.position, remainingSquares)
    } else {
        document.querySelector('p').innerText = 'Not enough cash!'
        changeItemToMove()
        move(mario, mario.position, remainingSquares)
    }
    updateInfo('mario')
}


const fillInventory = (character) => {
    if (character === 'mario'){
        let items = document.querySelectorAll('.items')
        console.log(items[0].classList)
        for (let i = 0; i < items.length; i++){
            if (items[i].classList.contains('greenShell') !== true){
                items[i].classList.add('greenShell')
                i = items.length
            }
        }
    } else if (character === 'donkeyKong'){
        let items = document.querySelectorAll('.DKitems')
        console.log(items)
        for (let i = 0; i < items.length; i++){
            if (items[i].classList.contains('greenShell') !== true){
                items[i].classList.add('greenShell')
                i = items.length
            }
        }
    }
}


const declineItem = () => {
    changeItemToMove()
    move(mario, mario.position, remainingSquares)
}

const turnOptions = () => {
    // change text in game info box
    document.querySelector('p').innerText = 'Your Turn!'
    // make the Move and Item buttons appear
    for (let i = 0; i < buttons.length; i++){
        buttons[i].style.visibility = 'visible'
    }
}

turnOptions()

//function to display up to three items where the move and item buttons usually are

