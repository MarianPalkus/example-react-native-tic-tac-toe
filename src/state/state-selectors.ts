import { createSelector } from '@reduxjs/toolkit';
import { RootState } from './redux-store';

export const selectGameState = (state: RootState) => state.gameState;

export const selectNextTurnMarker = createSelector(
  selectGameState,
  (gameState) => gameState.nextTurnsMarker
);
