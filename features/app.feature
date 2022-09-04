Feature: App
The app let's it's users play "tic tac toe" and follows the wikipedia description of the game play:
Tic-tac-toe is played on a three-by-three grid by two players, who alternately place the marks "X" and "O" in one of the nine spaces in the grid.
The player who succeeds in placing three of their marks in a horizontal, vertical, or diagonal row is the winner.
(source: https://en.wikipedia.org/wiki/Tic-tac-toe)


  Scenario: See Game Rules
    When the user starts the app
    Then the user can see the rules of the game "tic tac toe"

  Scenario: Start Game
  For a description of the "hot seat" mode see [./hot-seat-game-play.feature](hot-seat-game-play.feature).
    When the user starts the app
    Then the user can start a new "tic tac toe" game in "hot seat" mode
