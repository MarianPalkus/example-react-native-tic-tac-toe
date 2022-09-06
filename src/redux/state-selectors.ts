import { createSelector } from '@reduxjs/toolkit';
import { RootState } from './redux-store';

export const selectGameState = (state: RootState) => state.gameState;

export const selectNextTurnMarker = createSelector(
  selectGameState,
  (gameState) => gameState.nextTurnsMarker
);

export const selectGameEndResult = createSelector(
  selectGameState,
  (gameState) => gameState.gameEndResult
);

export const selectGameHasEnded = createSelector(
  selectGameEndResult,
  (gameEndResult) => gameEndResult.hasEnded
);

export const selectGameIsDraw = createSelector(
  selectGameEndResult,
  (gameEndResult) => gameEndResult.hasEnded === true && gameEndResult.isDraw
);

export const selectGameWinner = createSelector(selectGameEndResult, (gameEndResult) =>
  gameEndResult.hasEnded === true && gameEndResult.isDraw === false
    ? gameEndResult.winner
    : undefined
);

export const selectGameWinnerMoves = createSelector(selectGameEndResult, (gameEndResult) =>
  gameEndResult.hasEnded === true && gameEndResult.isDraw === false ? gameEndResult.moves : []
);
