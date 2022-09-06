import { createReducer } from '@reduxjs/toolkit';
import { returnToMenuAction, showRulesAction, startGameAction } from '../actions';
import { NavigationState } from '../../models/navigation-state';

export const navigationStateReducer = createReducer<NavigationState>('menu', (builder) => {
  builder
    .addCase(returnToMenuAction, (state, action) => {
      return 'menu';
    })
    .addCase(startGameAction, (state, action) => {
      return 'hot-seat-game';
    })
    .addCase(showRulesAction, (state, action) => {
      return 'rules';
    });
});
