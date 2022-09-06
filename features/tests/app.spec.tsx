import React from 'react';
const { render, fireEvent } = require('@testing-library/react-native');
import { defineFeature, loadFeature } from 'jest-cucumber';
import { createStore } from '../../src/redux/redux-store';
import { Provider } from 'react-redux';
import { AppRootNavigation } from '../../src/app-root-navigation';

const feature = loadFeature('features/app.feature');

const renderApp = () =>
  render(
    <Provider store={createStore()}>
      <AppRootNavigation />
    </Provider>
  );

defineFeature(feature, (test) => {
  test('See Game Rules', ({ when, then }) => {
    let renderResult;
    when('the user starts the app', () => {
      renderResult = renderApp();
    });

    then(/^the user can see the rules of the game "(.*)"$/, (arg0) => {
      renderResult.getByText('See Rules');
    });
  });

  test('Start Game', ({ when, then }) => {
    let renderResult;
    when('the user starts the app', () => {
      renderResult = renderApp();
    });

    then(/^the user can start a new "(.*)" game in "(.*)" mode$/, (arg0, arg1) => {
      fireEvent.press(renderResult.getByText('Start Game'));
    });
  });
});
