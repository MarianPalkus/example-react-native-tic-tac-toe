Feature: "Hot Seat" Game Play
"Hot seat" is a multiplayer mode provided by turn-based video games, which allows two or more players to play on the same device by taking turns playing the game. 
(source https://en.wikipedia.org/wiki/Hotseat_(multiplayer_mode))

Assuming that "player 1" plays with "X" and "player 2" plays with "O".

  Background:
    When the user starts the app
    And the user starts a new "hot seat" game


  Scenario: 'X' plays first
  The convention that player 1/"X" plays first is used.

    Then it's player 1's turn.

  Scenario Outline: Next turn
    Given there is at least one free cell on the board left
    And and <player_last> made the last turn
    Then it is <player_next>'s turn.

    Examples:
     | player_last | player_next |
     |   player 1  |   player 2  |
     |   player 2  |   player 1  |

  Scenario Outline: Placing Marks
    Given it is <mark>'s turn
    And the top-left cell is already marked with <cell_marker>
    When the player wants to place the mark <mark> in the top-left cell
    Then the move is <is_valid>

    Examples:
     | mark | cell_marker | is_valid |
     |   X  |      X      |  invalid |
     |   Y  |      X      |  invalid |
     |   X  |      Y      |  invalid |
     |   -  |      X      |   valid  |
     |   -  |      Y      |   valid  |


  Scenario: Winning a Game
    The player who succeeds in placing three of their marks in a horizontal, vertical, or diagonal row is the winner.

  Scenario: Draw
    If no player won the game and there is no free cell left for the next player to place their mark,  it is a draw.

    Given all cells are marked with "X" or "O"
    And no player has won the game
    Then the game ends as a draw.

  Scenario: End Game
    The player should always be able to end a running "hot seat" game.

    Given a "hot seat" game is running
    Then the player can end the game.
