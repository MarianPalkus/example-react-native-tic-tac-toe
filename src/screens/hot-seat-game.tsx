import React from 'react';
import { Button, Text, View } from 'react-native';
import { GameBoard } from '../components/game-board';
import { GameBoardCellWithRedux } from './redux-components/game-board-cell-with-redux';
import { commonStyles } from '../styles/common-styles';
import { Marker } from '../models/game-state';

export const HotSeatGame = ({
  goBack,
  nextTurnMarker,
}: {
  goBack: () => void;
  nextTurnMarker: Marker;
}) => (
  <View style={commonStyles.screenContainer}>
    <Text>{getLabelForNextTurn(nextTurnMarker)}</Text>

    <GameBoard CellComponent={GameBoardCellWithRedux} />
    <Text>Player 1: X</Text>
    <Text>Player 2: O</Text>
    <Button title="End Game" onPress={goBack} />
  </View>
);

export const getLabelForNextTurn = (marker: Marker) =>
  `It's ${getPlayerNameForMarker(marker)}'s turn. Place your "${marker}".`;

export const getPlayerNameForMarker = (marker: Marker) =>
  ({
    X: 'player 1',
    O: 'player 2',
  }[marker]);
