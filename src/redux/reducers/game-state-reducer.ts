import { createReducer } from '@reduxjs/toolkit';
import { playerMoveAction, returnToMenuAction, startGameAction } from '../actions';
import { GameMove, GameState } from '../../models/game-state';
import { checkGameEnd } from '../../game/game-rules';

const initialGameState: GameState = {
  moves: [],
  nextTurnsMarker: 'X',
  gameEndResult: { hasEnded: false },
};

export const gameStateReducer = createReducer<GameState>(initialGameState, (builder) => {
  builder
    .addCase(startGameAction, (state, action) => {
      state.moves = [];
    })
    .addCase(playerMoveAction, (state, action) => {
      if (state.gameEndResult.hasEnded) {
        return;
      }

      const nextMove = action.payload;

      const isCellAlreadyMarked = state.moves.some(
        ({ row, column }) => row === nextMove.row && column === nextMove.column
      );
      if (isCellAlreadyMarked) {
        return;
      }

      const validGameMove: GameMove = { ...action.payload, mark: state.nextTurnsMarker };
      state.moves.push(validGameMove);

      // Turn over to other player
      state.nextTurnsMarker = state.nextTurnsMarker === 'X' ? 'O' : 'X';
      state.gameEndResult = checkGameEnd(state.moves);
    })
    .addCase(returnToMenuAction, (state, action) => {
      return initialGameState;
    });
});
