import { createAction } from '@reduxjs/toolkit';
import { GameMove } from '../models/game-state';

export const showRulesAction = createAction('rules/show');
export const returnToMenuAction = createAction('menu/show');
export const startGameAction = createAction('game/start');
export const playerMoveAction = createAction<Omit<GameMove, 'mark'>>('game/player_move');
