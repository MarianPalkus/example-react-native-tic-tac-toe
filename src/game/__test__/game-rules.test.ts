import { CellIndex, GameMove, Marker } from '../../models/game-state';
import { checkGameEnd } from '../game-rules';

const gameMove = (row: CellIndex, column: CellIndex, mark: Marker): GameMove => ({
  row,
  column,
  mark,
});

describe('game-rules', () => {
  it.each<[string, GameMove[]]>([
    ['no moves', []],
    ['one move', [gameMove(0, 0, 'X')]],
    [
      'multiple moves',
      [
        gameMove(0, 0, 'X'),
        gameMove(0, 1, 'O'),
        gameMove(0, 2, 'X'),
        gameMove(1, 0, 'O'),
        gameMove(1, 1, 'X'),
      ],
    ],
  ])('should recognized %s as a non-ended game situation', (_, gameMoves) => {
    expect(checkGameEnd(gameMoves)).toEqual({ hasEnded: false });
  });

  it.each<[string, GameMove[]]>([
    [
      'example 1',
      [
        gameMove(0, 0, 'X'),
        gameMove(0, 1, 'X'),
        gameMove(0, 2, 'O'),
        gameMove(1, 0, 'O'),
        gameMove(1, 1, 'O'),
        gameMove(1, 2, 'X'),
        gameMove(2, 0, 'X'),
        gameMove(2, 1, 'X'),
        gameMove(2, 2, 'O'),
      ],
    ],
    [
      'example 2',
      [
        gameMove(0, 0, 'X'),
        gameMove(0, 1, 'O'),
        gameMove(0, 2, 'X'),
        gameMove(1, 0, 'O'),
        gameMove(1, 1, 'X'),
        gameMove(1, 2, 'O'),
        gameMove(2, 0, 'O'),
        gameMove(2, 1, 'X'),
        gameMove(2, 2, 'O'),
      ],
    ],
  ])('should recognized %s as a draw game situation', (_, gameMoves) => {
    expect(checkGameEnd(gameMoves)).toEqual({ hasEnded: true, isDraw: true });
  });

  type WinningExampleFixture = {
    name: string;
    winner: Marker;
    allMoves: GameMove[];
    winningMoveSequence: GameMove[];
  };
  it.each<WinningExampleFixture[]>([
    [
      {
        name: 'a horizontal row',
        winner: 'X',
        allMoves: [
          gameMove(0, 0, 'X'),
          gameMove(0, 1, 'X'),
          gameMove(0, 2, 'X'),
          gameMove(1, 0, 'X'),
          gameMove(1, 1, 'O'),
          gameMove(1, 2, 'O'),
          gameMove(2, 0, 'O'),
          gameMove(2, 1, 'O'),
          gameMove(2, 2, 'X'),
        ],
        winningMoveSequence: [
          // horizontal
          gameMove(0, 0, 'X'),
          gameMove(0, 1, 'X'),
          gameMove(0, 2, 'X'),
        ],
      },
      {
        name: 'a horizontal and diagonal row',
        winner: 'O',
        allMoves: [
          gameMove(0, 0, 'O'),
          gameMove(0, 1, 'O'),
          gameMove(0, 2, 'O'),
          gameMove(1, 0, 'O'),
          gameMove(1, 1, 'O'),
          gameMove(1, 2, 'X'),
          gameMove(2, 0, 'X'),
          gameMove(2, 1, 'X'),
          gameMove(2, 2, 'O'),
        ],
        winningMoveSequence: [
          // horizontal
          gameMove(0, 0, 'O'),
          gameMove(0, 1, 'O'),
          gameMove(0, 2, 'O'),
          // diagonal
          gameMove(1, 1, 'O'),
          gameMove(2, 2, 'O'),
        ],
      },
    ],
  ])(
    'should recognized %s as a win game situation for play "%s"',
    ({ allMoves, winner, winningMoveSequence }) => {
      expect(checkGameEnd(allMoves)).toEqual({
        hasEnded: true,
        isDraw: false,
        winner,
        moves: winningMoveSequence,
      });
    }
  );
});
