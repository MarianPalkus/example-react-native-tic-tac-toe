import React from 'react';
const { render, fireEvent } = require('@testing-library/react-native');
import { defineFeature, loadFeature } from 'jest-cucumber';
import { createStore } from '../../src/state/redux-store';
import { Provider } from 'react-redux';
import { AppRootNavigation } from '../../src/screens/app-root-navigation';
import { getGameBoardCellAccessibilityLabel } from '../../src/components/game-board';
import { CellIndex } from '../../src/models/game-state';
import { getLabelForNextTurn } from '../../src/screens/hot-seat-game';

const feature = loadFeature('features/hot-seat-game-play.feature');

const renderApp = () =>
  render(
    <Provider store={createStore()}>
      <AppRootNavigation />
    </Provider>
  );

defineFeature(feature, (test) => {
  let renderResult;

  const fireEventToMarkCell = ({ row, column }: { row: CellIndex; column: CellIndex }) =>
    fireEvent.press(
      renderResult.getByLabelText(getGameBoardCellAccessibilityLabel({ row, column }))
    );

  afterEach(() => {
    renderResult?.unmount();
  });

  test("'X' plays first", ({ when, and, then }) => {
    when('the user starts the app', () => {
      renderResult = renderApp();
    });

    and(/^the user starts a new "(.*)" game$/, () => {
      fireEvent.press(renderResult.getByText('Start Game'));
    });

    then("it's X's turn.", () => {
      renderResult.getByText(`It's player 1's turn. Place your "X".`);
    });
  });

  test('Winning a Game', ({ when, and }) => {
    when('the user starts the app', () => {
      renderResult = renderApp();
    });

    and(/^the user starts a new "(.*)" game$/, () => {
      fireEvent.press(renderResult.getByText('Start Game'));
    });
  });

  test('Draw', ({ when, and, given, then }) => {
    when('the user starts the app', () => {
      renderResult = renderApp();
    });

    and(/^the user starts a new "(.*)" game$/, () => {
      fireEvent.press(renderResult.getByText('Start Game'));
    });

    given(/^all cells are marked with "(.*)" or "(.*)"$/, () => {
      fireEventToMarkCell({ row: 0, column: 0 });
      fireEventToMarkCell({ row: 0, column: 1 });
      fireEventToMarkCell({ row: 0, column: 2 });

      fireEventToMarkCell({ row: 1, column: 0 });
      fireEventToMarkCell({ row: 0, column: 2 });
      fireEventToMarkCell({ row: 0, column: 1 });

      fireEventToMarkCell({ row: 2, column: 0 });
      fireEventToMarkCell({ row: 2, column: 2 });
      fireEventToMarkCell({ row: 2, column: 1 });
    });

    and('no player has won the game', () => {
      throw Error('Needs assertion');
    });

    then('the game ends as a draw.', () => {});
  });

  test('End Game', ({ when, and, given, then }) => {
    when('the user starts the app', () => {
      renderResult = renderApp();
    });

    and(/^the user starts a new "(.*)" game$/, (arg0) => {
      fireEvent.press(renderResult.getByText('Start Game'));
    });

    given(/^a "(.*)" game is running$/, () => {});

    then('the player can end the game.', () => {
      fireEvent.press(renderResult.getByText('End Game'));
      renderResult.getByText('Start Game');
    });
  });

  test('Next turn', ({ when, and, given, then }) => {
    when('the user starts the app', () => {
      renderResult = renderApp();
    });

    and(/^the user starts a new "(.*)" game$/, () => {
      fireEvent.press(renderResult.getByText('Start Game'));
    });

    given('there is at least one free cell on the board left', () => {});

    and(/^and (.*) made the last turn$/, (marker) => {
      // First player is "X"
      fireEventToMarkCell({ row: 0, column: 0 });

      if (marker === 'O') {
        // If last player was "O", make a second move
        fireEventToMarkCell({ row: 0, column: 1 });
      }
    });

    then(/^it is (.*)'s turn.$/, (marker) => {
      renderResult.getByText(getLabelForNextTurn(marker));
    });
  });

  test('Placing Marks', ({ when, and, given, then }) => {
    when('the user starts the app', () => {
      renderResult = renderApp();
    });

    and(/^the user starts a new "(.*)" game$/, () => {
      fireEvent.press(renderResult.getByText('Start Game'));
    });

    given(/^it is (.*)'s turn$/, async (marker) => {
      const isPlayersTurn = await renderResult.queryByText(getLabelForNextTurn(marker));
      if (!isPlayersTurn) {
        // mark another cell
        fireEventToMarkCell({ row: 2, column: 2 });
      }
    });

    and(/^the top-left cell is already marked with (.*)$/, async (marker) => {
      if (marker !== '-') {
        const isPlayersTurn = await renderResult.queryByText(getLabelForNextTurn(marker));
        if (!isPlayersTurn) {
          // mark another cell
          fireEventToMarkCell({ row: 2, column: 1 });
        }
        // mark cell with the specified marker
        fireEventToMarkCell({ row: 0, column: 0 });
      }
    });

    when(/^the player wants to place the mark (.*) in the top-left cell/, async (marker) => {
      const isPlayersTurn = await renderResult.queryByText(getLabelForNextTurn(marker));

      if (!isPlayersTurn) {
        // mark another cell
        fireEventToMarkCell({ row: 0, column: 2 });
      }

      try {
        fireEventToMarkCell({ row: 0, column: 0 });
      } catch (ex) {
        //is allowed to fail
      }
    });

    then(/^the top-left cell is marked with (.*)/, (marker) => {
      renderResult.getByLabelText(
        getGameBoardCellAccessibilityLabel({ row: 0, column: 0, marker })
      );
    });

    and(/^it is (.*)'s turn.$/, (marker) => {
      renderResult.getByText(getLabelForNextTurn(marker));
    });
  });
});
