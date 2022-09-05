import { configureStore, createAction, createReducer } from '@reduxjs/toolkit';
import { checkGameEnd } from '../game/game-rules';
import { GameMove, GameState } from '../models/game-state';
import { NavigationState } from '../models/navigation-state';

const initialGameState: GameState = {
  moves: [],
  nextTurnsMarker: 'X',
  gameEndResult: { hasEnded: false },
};

export const showRulesAction = createAction('rules/show');
export const returnToMenuAction = createAction('menu/show');
export const startGameAction = createAction('game/start');
export const endGameAction = createAction('game/end');
export const playerMoveAction = createAction<Omit<GameMove, 'mark'>>('game/player_move');

const navigationStateReducer = createReducer<NavigationState>('menu', (builder) => {
  builder
    .addCase(returnToMenuAction, (state, action) => {
      return 'menu';
    })
    .addCase(startGameAction, (state, action) => {
      return 'hot-seat-game';
    })
    .addCase(showRulesAction, (state, action) => {
      return 'rules';
    })
    .addCase(endGameAction, (state, action) => {
      return 'menu';
    });
});

const gameStateReducer = createReducer<GameState>(initialGameState, (builder) => {
  builder
    .addCase(startGameAction, (state, action) => {
      state.moves = [];
    })
    .addCase(playerMoveAction, (state, action) => {
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
    .addCase(endGameAction, (state, action) => {
      return initialGameState;
    });
});

export const createStore = () =>
  configureStore({
    reducer: {
      navigationState: navigationStateReducer,
      gameState: gameStateReducer,
    },
  });

export type RootState = ReturnType<ReturnType<typeof createStore>['getState']>;
export type AppDispatch = ReturnType<typeof createStore>['dispatch'];
