import { configureStore } from '@reduxjs/toolkit';
import { navigationStateReducer } from './reducers/navigation-state-reducer';
import { gameStateReducer } from './reducers/game-state-reducer';

export const createStore = () =>
  configureStore({
    reducer: {
      navigationState: navigationStateReducer,
      gameState: gameStateReducer,
    },
  });

export type RootState = ReturnType<ReturnType<typeof createStore>['getState']>;
export type AppDispatch = ReturnType<typeof createStore>['dispatch'];
