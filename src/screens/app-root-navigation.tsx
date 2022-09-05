import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Rules } from './rules';
import {
  returnToMenuAction,
  RootState,
  showRulesAction,
  startGameAction,
} from '../state/redux-store';
import { HotSeatGame } from './hot-seat-game';
import { MainMenu } from './main-menu';
import { selectNextTurnMarker } from '../state/state-selectors';

export const AppRootNavigation = () => {
  const dispatch = useDispatch();
  const navigationState = useSelector((state: RootState) => state.navigationState);
  const nextTurnMarker = useSelector(selectNextTurnMarker);

  switch (navigationState) {
    case 'rules': {
      return <Rules goBack={() => dispatch(returnToMenuAction())} />;
    }
    case 'hot-seat-game': {
      return (
        <HotSeatGame
          goBack={() => dispatch(returnToMenuAction())}
          nextTurnMarker={nextTurnMarker}
        />
      );
    }

    default:
      return (
        <MainMenu
          onShowRules={() => dispatch(showRulesAction())}
          onStartGame={() => dispatch(startGameAction())}
        />
      );
  }
};
