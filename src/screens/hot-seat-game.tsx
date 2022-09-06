import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
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
  <View style={[commonStyles.screenContainer, styles.container]}>
    <Text style={styles.turnText}>{getLabelForNextTurn(nextTurnMarker)}</Text>

    <GameBoard CellComponent={GameBoardCellWithRedux} />

    <View style={styles.legend}>
      <Text>Player 1: X</Text>
      <Text>Player 2: O</Text>

      <Button title="End Game" onPress={goBack} />
    </View>
  </View>
);

export const getLabelForNextTurn = (marker: Marker) =>
  `It's ${getPlayerNameForMarker(marker)}'s turn. Place your "${marker}".`;

export const getPlayerNameForMarker = (marker: Marker) =>
  ({
    X: 'player 1',
    O: 'player 2',
  }[marker]);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-around',
    padding: 10,
  },
  turnText: {
    fontSize: 18,
    fontWeight: '500',
    alignSelf: 'center',
  },
  legend: {
    padding: 20,
    marginBottom: 20,
  },
});
