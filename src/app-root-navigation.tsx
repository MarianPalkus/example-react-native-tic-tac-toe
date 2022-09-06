import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Rules } from './components/rules';
import { returnToMenuAction, showRulesAction, startGameAction } from './redux/actions';
import { RootState } from './redux/redux-store';
import { MainMenu } from './components/main-menu';
import { HotSeatGameWithRedux } from './redux/redux-components/hot-seat-game-with-redux';

export const AppRootNavigation = () => {
  const dispatch = useDispatch();
  const navigationState = useSelector((state: RootState) => state.navigationState);

  switch (navigationState) {
    case 'rules': {
      return <Rules goBack={() => dispatch(returnToMenuAction())} />;
    }
    case 'hot-seat-game': {
      return <HotSeatGameWithRedux goBack={() => dispatch(returnToMenuAction())} />;
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
