import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { GameBoard } from './game-board';
import { GameBoardCellWithRedux } from '../redux/redux-components/game-board-cell-with-redux';
import { commonStyles } from '../styles/common-styles';
import { Marker } from '../models/game-state';

export const HotSeatGame = ({
  goBack,
  nextTurnMarker,
  gameHasEnded,
  isDraw,
  winner,
}: {
  nextTurnMarker: Marker;
  gameHasEnded: boolean;
  isDraw: boolean;
  winner?: Marker;
  goBack: () => void;
}) => {
  const turnText = getText({ marker: nextTurnMarker, gameHasEnded, isDraw, winner });
  return (
    <View style={[commonStyles.screenContainer, styles.container]}>
      <Text style={styles.turnText}>{turnText}</Text>

      <GameBoard CellComponent={GameBoardCellWithRedux} />

      <View style={styles.legend}>
        <Text>Player 1: X</Text>
        <Text>Player 2: O</Text>

        <Button title="End Game" onPress={goBack} />
      </View>
    </View>
  );
};

const getText = ({
  marker,
  isDraw,
  gameHasEnded,
  winner,
}: {
  marker: Marker;
  gameHasEnded: boolean;
  isDraw: boolean;
  winner?: Marker;
}) => {
  if (gameHasEnded && isDraw) {
    return "It's a draw!";
  } else if (gameHasEnded) {
    return `${winner} has won!`;
  }
  return getLabelForNextTurn(marker);
};

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
