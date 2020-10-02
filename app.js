//need this id for setInterval() to be 
let rolling
// create function that rolls dice
const diceRoll = () => {
    let diceNum
    // begin dice rolling if clicked on, this will probably change when i add more to the flow of the game. this is more for testing purp
    if (dice.innerText === ''){
        rolling = setInterval(()=>{dice.innerText = Math.floor(Math.random() * 10)}, 100)
        //make mario appear under dice
        document.querySelector('.testPlayer').style.backgroundImage = 'url("https://i.etsystatic.com/16581340/r/il/fbb2d9/1423191149/il_1588xN.1423191149_2ygc.jpg")'
        buttons[0].innerText = 'Roll'
        //make items button disappear
        buttons[1].style.visibility = 'hidden'
    } 
    // if the dice is rolling, grab the value inside and console log it and stop rolling
    else if (dice.innerText !== ''){
        //grab the player under the dice and add the jump animation
        document.querySelector('.testPlayer').classList.add('playerJump')
        //make the dice roll at the top of the roll
        setTimeout(() => {
            document.querySelector('.dice').classList.add('diceRoll')
            clearInterval(rolling)
            console.log(dice.innerText)
            diceNum = dice.innerText
        }, 800)
        //delay enough time for the move total to be clearly seen before character moves
        setTimeout(() => {
            dice.innerText = ''
            document.querySelector('.testPlayer').style.backgroundImage = ''  
    }, 2000)
        setTimeout(() => {
            if (diceNum > 0){
                move(mario, mario.position, diceNum)
            } else if (diceNum === '0'){
                computerRoll()
            }
        //make player options disappear
        gameInfo.style.visibility = 'hidden'
        buttons[0].style.visibility = 'hidden'
        buttons[0].innerText = 'Move'
        buttons[1].style.visibility = 'hidden'
        document.querySelector('p').style.visibility = 'hidden'
        }, 2000)
        
        //remove the animation classes
        setTimeout(() => {
            document.querySelector('.testPlayer').classList.remove('playerJump')
            document.querySelector('.dice').classList.remove('diceRoll')
        }, 3000)
        
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
        mario.money += 10
        gifBox.style.backgroundImage = 'url("https://media.tenor.com/images/35b07a9e7f2746fce6048419053d435c/tenor.gif")'
        setTimeout(() => {
            gifBox.style.backgroundImage = ""
        }, 1500)
    } else if (minusMoney.includes(square)){
        if (mario.money - 2 < 0){
            mario.money = 0
        } else {
            mario.money -= 2
        }
        gifBox.style.backgroundImage = 'url("https://i.kym-cdn.com/photos/images/newsfeed/001/149/747/a0a.gif")'
        setTimeout(() => {
            gifBox.style.backgroundImage = ""
        }, 1500)
    }
    player1Info.innerText = `Mario \n Coins: ${mario.money} \n Stars: ${mario.stars}`
    //trigger computer move when the final square is tested
    computerRoll()
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

//gif box
const gifBox = document.querySelector('.gifBox')

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
    let pause
    if (donkeyKong.position === starPos){
        if (donkeyKong.money >= 20){
            //show donkey kong banana gif
            gifBox.style.backgroundImage = 'url("https://www.armortechs.com/upload/image/dkc_banana_hoard.gif")'
            donkeyKong.money -= 20
            donkeyKong.stars += 1
            // get rid of banana gif
            setTimeout(() => {
                gifBox.style.backgroundImage = ""
            }, 2000)
            pause = true
        } 
    } else if (donkeyKong.position === storePos){
            if (donkeyKong.money >= 5){
                //show donkey kong banana gif
                gifBox.style.backgroundImage = 'url("https://i.gifer.com/wUH.gif")'
                donkeyKong.money -= 5
                donkeyKong.items.push('greenShell')
                fillInventory('donkeyKong')
                //get rid of gif
                setTimeout(() => {
                    gifBox.style.backgroundImage = ""
                }, 2000)
                //make sure donkey kong will use the item at the start of their turn
                pause = true
            }
        }
        updateInfo('donkeyKong')
        return pause
    }


const computerSquareCheck = () => {
    if (plusMoney.includes(donkeyKong.position)){
        donkeyKong.money += 10
        gifBox.style.backgroundImage = 'url("https://media.tenor.com/images/b1b1756bffd985a7ff26e91a21e09804/tenor.gif")'
        setTimeout(() => {
            gifBox.style.backgroundImage = ""
        }, 1500)
    } else if (minusMoney.includes(donkeyKong.position)){
        if (donkeyKong.money - 2 < 0) {
            donkeyKong.money = 0
        } else {
            donkeyKong.money -= 2
        }
        gifBox.style.backgroundImage = 'url("https://thumbs.gfycat.com/IllustriousAlertFieldspaniel-max-1mb.gif")'
        setTimeout(() => {
            gifBox.style.backgroundImage = ""
        }, 1500)
    }
    updateInfo('donkeyKong')
}

//function to see if donkey kong has any items, and if he does, use one

const computerItemCheck = () => {
    if (donkeyKong.items.includes('greenShell')){
        gifBox.style.backgroundImage = 'url("https://64.media.tumblr.com/tumblr_m1k2zhACXQ1qcnzaso1_500.gifv")'
        if (mario.money - 5 <= 0){
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
    setTimeout(() => {
        gifBox.style.backgroundImage = ""
    }, 1500)
    }
    updateInfo('donkeyKong')
    updateInfo('mario')
}

let dkMoving
const computerRoll = () => {
    computerItemCheck()
    //make donkey kong appear beneath dice
    document.querySelector('.testPlayer').style.backgroundImage = "url('https://d3gqasl9vmjfd8.cloudfront.net/0b2aa3ba-f820-4ed0-8969-281d5dbf7507.png')"
    //make dice roll
    let rolling
    let diceNum
    //make dice roll
    rolling = setInterval(()=>{dice.innerText = Math.floor(Math.random() * 10)}, 100)
    setTimeout(() => {
        //make donkey kong jump
        document.querySelector('.testPlayer').classList.add('playerJump')
    }, 1000)
    setTimeout(() => {
        dice.classList.add('diceRoll')
        clearInterval(rolling)
        diceNum = dice.innerText
        computerMove(diceNum)
    }, 1800)
    //clear dice text, donkey kong image, animation classes
    setTimeout(() => {
        dice.innerText = ''
        document.querySelector('.testPlayer').classList.remove('playerJump')
        dice.classList.remove('diceRoll')
        document.querySelector('.testPlayer').style.backgroundImage = ""
    }, 3000)
    //delay move for after all of this complete
}
const computerMove = (diceNum) => {
    setTimeout(() => {
        console.log('Donkey kong rolled a ', diceNum)
        startX = parseInt(window.getComputedStyle(player2).getPropertyValue('grid-column-start'))
        endX = parseInt(window.getComputedStyle(player2).getPropertyValue('grid-column-end'))
        startY = parseInt(window.getComputedStyle(player2).getPropertyValue('grid-row-start'))
        endY = parseInt(window.getComputedStyle(player2).getPropertyValue('grid-row-end'))
        //variable to decide if donkey kong needs to pause
        let pause
            if (diceNum !== '0'){
                console.log('dk diceNum not equal to 0')
                dkMoving = setInterval(() => {
                
                    if (donkeyKong.position < 5){
                        startX++
                        endX++
                        player2.style.gridColumnStart = `${startX}`
                        player2.style.gridColumnEnd = `${endX}`
                        donkeyKong.position++
                        //computer store check?
                        pause = computerStoreStarCheck()
                    } else if (donkeyKong.position < 9){
                        startY++
                        endY++
                        player2.style.gridRowStart = `${startY}`
                        player2.style.gridRowEnd = `${endY}`
                        donkeyKong.position++
                        //computer store check?
                        pause = computerStoreStarCheck()
                    } else if (donkeyKong.position < 13){
                        startX--
                        endX--
                        player2.style.gridColumnStart = `${startX}`
                        player2.style.gridColumnEnd = `${endX}`
                        donkeyKong.position++
                        pause = computerStoreStarCheck()
                        // computer store check?
                    } else if (donkeyKong.position < 16){
                        startY--
                        endY--
                        player2.style.gridRowStart = `${startY}`
                        player2.style.gridRowEnd = `${endY}`
                        donkeyKong.position++
                        pause = computerStoreStarCheck()
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
                        pause = computerStoreStarCheck()
                    }
                    diceNum--
                    if (pause){
                        clearInterval(dkMoving)
                        setTimeout(() => {
                            computerMove(diceNum)
                        }, 2000)
                    }
                    if (diceNum <= 0){
                        clearInterval(dkMoving)
                        //computer store and square check?
                        computerSquareCheck()
                        gameInfo.style.visibility = 'visible'
                        buttons[0].style.visibility = 'visible'
                        buttons[1].style.visibility = 'visible'
                        document.querySelector('p').style.visibility = 'visible'
                    }
                
            }, 500)
            turns++
            //put end game process hear
            console.log('dk diceNum: ', diceNum)
            console.log('Turns: ', turns)
            if (turns === 20){
                //compare amount of stars for win
                if (mario.stars > donkeyKong.stars){
                    document.querySelector('p').innerText = 'Game Over, Mario wins!'
                    gifBox.style.backgroundImage = 'url("https://thumbs.gfycat.com/GrippingDependentIvorybilledwoodpecker-size_restricted.gif")'
                    setTimeout(() => {
                        gifBox.style.backgroundImage = ""
                    }, 3000)
                } else if (mario.stars < donkeyKong.stars){
                    document.querySelector('p').innerText = 'Game Over, Donkey Kong wins!'
                    gifBox.style.backgroundImage = 'url("https://i.kym-cdn.com/photos/images/newsfeed/000/829/805/b76.gif")'
                    setTimeout(() => {
                        gifBox.style.backgroundImage = ""
                    }, 3000)
                } else {
                    document.querySelector('p').innerText = "Game Over, it's a tie!"
                    gifBox.style.backgroundImage = 'url("https://img3.goodfon.com/wallpaper/nbig/c/1c/donkey-kong-mario-pivo-bochka.jpg")'
                    setTimeout(() => {
                        gifBox.style.backgroundImage = ""
                    }, 3000)
                }
            }

            //make player options reappear, whether or not dk rolled a 0
            
        } else {
            gameInfo.style.visibility = 'visible'
            buttons[0].style.visibility = 'visible'
            buttons[1].style.visibility = 'visible'
            document.querySelector('p').style.visibility = 'visible'
        }
    }, 1500)
}
    
const starAndStoreCheck = (pos, lastMove = false) => {
    if (pos === starPos){
        console.log('starcheck')
        //stop movement
        clearInterval(moving)
        //can i determine how many more squares left to move from here?
        document.querySelector('p').innerText = "Buy a star for 20 coins?"
        document.querySelector('p').style.visibility = 'visible'
        gameInfo.style.visibility = 'visible'
        buttons[0].innerText = 'Yes'
        buttons[1].innerText = 'No'
        gameInfo.visibility = 'visible'
        buttons[0].style.visibility = 'visible'
        buttons[1].style.visibility = 'visible'
        //need to remove existing event listeners and place new ones, then put back old event listener when done with this logic
        buttons[0].removeEventListener('click', diceRoll)
        buttons[1].removeEventListener('click', chooseItem)
        if (lastMove === true){
            //need to restart movement in buyStar, declineStar functions
            buttons[0].addEventListener('click', buyStarThenCPMove)
            buttons[1].addEventListener('click', declineStarThenCPMove)
        } else if (lastMove === false){
            //need to restart movement in buyStar, declineStar functions
            buttons[0].addEventListener('click', buyStar)
            buttons[1].addEventListener('click', declineStar)
        }
        // if (lastMove === true){
        //     computerRoll()
        // }
    } else if (pos === storePos){
        console.log('storeCheck')
        clearInterval(moving)
        document.querySelector('p').innerText = 'Buy an item?'
        document.querySelector('p').style.visibility = 'visible'
        gameInfo.style.visibility = 'visible'
        buttons[0].innerText = 'Green Shell - 5 Coins'
        buttons[1].innerText = 'No'
        buttons[0].style.visibility = 'visible'
        buttons[1].style.visibility = 'visible'
        //event listener swap that allows for purchase of items
        buttons[0].removeEventListener('click', diceRoll)
        buttons[1].removeEventListener('click', chooseItem)
        if (lastMove === false){
        //need to restart movement in buyItem, declineItem functions
            buttons[0].addEventListener('click', buyItem)
            buttons[1].addEventListener('click', declineItem)
        } else if (lastMove === true){
            buttons[0].addEventListener('click', buyItemThenCPMove)
            buttons[1].addEventListener('click', declineItemThenCPMove)
        }
        // if (lastMove === true){
        //     computerRoll()
        // }
    }
}

const buyStarThenCPMove = () => {
    if (mario.money >= 20){
        mario.money -= 20
        mario.stars += 1
        //revert game info box
        changeStarToMove(true)
        updateInfo('mario')
        move(mario, mario.position, remainingSquares)
    } else {
        document.querySelector('p').innerText = 'Not enough cash!'
        document.querySelector('p').style.visibility = 'visible'
        changeStarToMove(true)
        gifBox.style.backgroundImage = 'url("https://thumbs.gfycat.com/MellowParallelClingfish-size_restricted.gif")'
        setTimeout(() => {
            document.querySelector('p').innerText = 'Your move'
            document.querySelector('p').style.visibility = 'hidden'
            gifBox.style.backgroundImage = ""
            move(mario, mario.position, remainingSquares)
        }, 1500)
    }
    gameInfo.style.visibility = 'hidden'
    buttons[0].style.visibility = 'hidden'
    buttons[1].style.visibility = 'hidden'

    computerRoll()
}

const declineStarThenCPMove = () => {
    changeStarToMove(true)
    // move(mario, mario.position, remainingSquares)
    gameInfo.style.visibility = 'hidden'
    buttons[0].style.visibility = 'hidden'
    buttons[1].style.visibility = 'hidden'

    computerRoll()
}

const buyItemThenCPMove = () => {
    if (mario.money >= 5) {
        buttons[0].removeEventListener('click', buyItemThenCPMove)
        mario.money -= 5
        mario.items.push('greenShell')
        //function to update inventory div
        fillInventory('mario')
        //change buttons and event listeners
        changeItemToMove(true)
        move(mario, mario.position, remainingSquares)
    } else {
        document.querySelector('p').innerText = 'Not enough cash!'
        document.querySelector('p').style.visibility = 'visible'
        changeItemToMove(true)
        gifBox.style.backgroundImage = 'url("https://thumbs.gfycat.com/MellowParallelClingfish-size_restricted.gif")'
        setTimeout(() => {
            document.querySelector('p').innerText = 'Your move'
            document.querySelector('p').style.visibility = 'hidden'
            gifBox.style.backgroundImage = ""
            move(mario, mario.position, remainingSquares)
        }, 1500)
    }
    updateInfo('mario')
    gameInfo.style.visibility = 'hidden'
    buttons[0].style.visibility = 'hidden'
    buttons[1].style.visibility = 'hidden'

    computerRoll()
}

const declineItemThenCPMove = () => {
    changeItemToMove(true)
    move(mario, mario.position, remainingSquares)
    gameInfo.style.visibility = 'hidden'
    document.querySelector('p').style.visibility = 'hidden'
    buttons[0].style.visibility = 'hidden'
    buttons[1].style.visibility = 'hidden'

    computerRoll()
}

//use green shell if available
const chooseItem = () => {
    let items = document.querySelectorAll('.items')
    for (let i = items.length - 1; i >= 0; i--){
        if (items[i].classList.contains('greenShell')){
            gifBox.style.backgroundImage = 'url("https://pa1.narvii.com/6357/276364aba4b4f524766d1252bd53386cd4792917_00.gif")'
            console.log('donkeyKong.money ', donkeyKong.money)
            donkeyKong.money -= 3
            console.log('donkeyKong.money ', donkeyKong.money)
            items[i].classList.remove('greenShell')
            mario.items.pop()
            i = -1
            updateInfo('donkeyKong')
            setTimeout(() => {
                gifBox.style.backgroundImage = ""
            }, 1500)
        }
    }
    gameInfo.style.visibility = 'hidden'
    document.querySelector('p').style.visibility = 'hidden'
    buttons[0].style.visibility = 'hidden'
    buttons[1].style.visibility = 'hidden'
}

//some utility functions to change info in game info box
const changeStarToMove = (cpMove) => {
    if (cpMove === false){
        buttons[0].removeEventListener('click', buyStar)
        buttons[1].removeEventListener('click', declineStar)
    } else if (cpMove === true){
        buttons[0].removeEventListener('click', buyStarThenCPMove)
        buttons[1].removeEventListener('click', declineStarThenCPMove)
    }
    
    buttons[0].addEventListener('click', diceRoll)
    buttons[1].addEventListener('click', chooseItem)
    buttons[0].innerText = 'Move'
    buttons[1].innerText = 'Item'

    gameInfo.style.visibility = 'hidden'
    buttons[0].style.visibility = 'hidden'
    buttons[1].style.visibility = 'hidden'
}

const buyStar = () => {
    if (mario.money >= 20){
        mario.money -= 20
        mario.stars += 1
        //revert game info box
        changeStarToMove(false)
        updateInfo('mario')
        move(mario, mario.position, remainingSquares)
    } else {
        document.querySelector('p').innerText = 'Not enough cash!'
        document.querySelector('p').style.visibility = 'visible'
        changeStarToMove(false)
        gifBox.style.backgroundImage = 'url("https://thumbs.gfycat.com/MellowParallelClingfish-size_restricted.gif")'
        setTimeout(() => {
            document.querySelector('p').innerText = 'Your move'
            document.querySelector('p').style.visibility = 'hidden'
            gifBox.style.backgroundImage = ""
            move(mario, mario.position, remainingSquares)
        }, 1500)
    }
    gameInfo.style.visibility = 'hidden'
    buttons[0].style.visibility = 'hidden'
    buttons[1].style.visibility = 'hidden'
}
const declineStar = () => {
    changeStarToMove(false)
    move(mario, mario.position, remainingSquares)
    document.querySelector('p').innerText = 'Your move'
    gameInfo.style.visibility = 'hidden'
    document.querySelector('p').style.visibility = 'hidden'
    buttons[0].style.visibility = 'hidden'
    buttons[1].style.visibility = 'hidden'
}

const changeItemToMove = (cpMove) => {
    
    if (cpMove === false){
        buttons[0].removeEventListener('click', buyItem)
        buttons[1].removeEventListener('click', declineItem)
    } else if (cpMove === true){
        buttons[0].removeEventListener('click', buyItemThenCPMove)
        buttons[1].removeEventListener('click', declineItemThenCPMove)
    }
    buttons[0].addEventListener('click', diceRoll)
    buttons[1].addEventListener('click', chooseItem)
    buttons[0].innerText = 'Move'
    buttons[1].innerText = 'Item'
    gameInfo.style.visibility = 'hidden'
    buttons[0].style.visibility = 'hidden'
    buttons[1].style.visibility = 'hidden'
}

const buyItem = () => {
    if (mario.money >= 5) {
        mario.money -= 5
        mario.items.push('greenShell')
        //function to update inventory div
        fillInventory('mario')
        //change buttons and event listeners
        changeItemToMove(false)
        move(mario, mario.position, remainingSquares)
        document.querySelector('p').style.visibility = 'hidden'
    } else {
        document.querySelector('p').innerText = 'Not enough cash!'
        document.querySelector('p').style.visibility = 'visible'
        changeItemToMove(false)
        gifBox.style.backgroundImage = 'url("https://thumbs.gfycat.com/MellowParallelClingfish-size_restricted.gif")'
        setTimeout(() => {
            gifBox.style.backgroundImage = ""
            document.querySelector('p').innerText = 'Your move'
            document.querySelector('p').style.visibility = 'hidden'
            move(mario, mario.position, remainingSquares)
        }, 1500)
    }
    updateInfo('mario')
    gameInfo.style.visibility = 'hidden'
    buttons[0].style.visibility = 'hidden'
    buttons[1].style.visibility = 'hidden'
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
    changeItemToMove(false)
    move(mario, mario.position, remainingSquares)
    document.querySelector('p').innerText = 'Your move'
    document.querySelector('p').style.visibility = 'hidden'
    gameInfo.style.visibility = 'hidden'
    buttons[0].style.visibility = 'hidden'
    buttons[1].style.visibility = 'hidden'
}

const turnOptions = () => {
    // change text in game info box
    document.querySelector('p').innerText = 'Your Turn!'
    gameInfo.style.visibility = 'visible'
    buttons[0].style.visibility = 'visible'
    buttons[1].style.visibility = 'visible'
    // make the Move and Item buttons appear
    for (let i = 0; i < buttons.length; i++){
        buttons[i].style.visibility = 'visible'
    }
}

//function to display game start gif
const gameStart = () => {
    gifBox.style.backgroundImage = 'url("https://www.lukiegames.com/assets/images/N64/n64_mario_party_p_4p6j0j.jpg")'
    setTimeout(() => {
        gifBox.style.backgroundImage = ''
    }, 2000)
}

window.addEventListener('DOMContentLoaded', () => {
    gameStart()
    setTimeout(() => {
        turnOptions()
    }, 2000)
})

//function to display up to three items where the move and item buttons usually are

