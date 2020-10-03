# MARIO PARTY

### App Demo: https://billymoroney1.github.io/mario-party/

## Concept:

User plays as Mario, Computer is Donkey Kong.

Players take turns rolling dice. If you land on a blue square, +10 coins. If you land on a red square, -2 coins.

Anytime a player passes a store (green square) or star (yellow square), they will be given the option to buy an item for 5 coins or a star for 20 coins, respectively.

At the start of a players turn, they have the option to use an item. Green shell subtracts 10 coins from other player.

Game lasts 20 turns, player with the most stars by the end wins.

## Technologies Used: 

- HTML
- CSS
- JavaScript

## Approach

### Overview

I began by creating the game board with CSS grid. I more or less used that initial idea as a wireframe. 

Moved on to make a player move around the board after rolling a dice. Progressively added more features like what each square does, a player's attributes and how they are managed, a computer player, a turn limit, win conditions, and some animations/GIFs/Timers to make it all feel organic. 

### Stretch Goals

I hope in the future to
- add sound
- allow for different board configurations
- allow for different amounts of players
- more items
- star square that moves around the map each time a player buys a star
- minigames using html canvas

## Challenges:

The biggest challenge I faced was trying to figure out how to get from a point where the player and computer moved seemingly at the same time to having the appearance of a game in which players took turns. This required understanding where the computer must wait for the player to finish their turn, when the player cannot take any actions, when to insert pauses for animations, and how to continue movement after a pause.

