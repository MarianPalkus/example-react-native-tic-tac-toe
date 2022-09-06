import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import React from 'react';
import { CellIndex, Marker } from '../models/game-state';
import MarkerO from '../../assets/marker_o.svg';
import MarkerX from '../../assets/marker_x.svg';
import { commonStyles } from '../styles/common-styles';

type PropCellComponent = {
  CellComponent: React.FC<{ row: CellIndex; column: CellIndex; style?: StyleProp<ViewStyle> }>;
};

export const GameBoard = ({ CellComponent }: PropCellComponent) => (
  <View style={[commonStyles.aspectRationOne]}>
    <GameBoardCellRow row={0} CellComponent={CellComponent} />
    <GameBoardCellRow row={1} CellComponent={CellComponent} />
    <GameBoardCellRow row={2} CellComponent={CellComponent} />
  </View>
);

export const GameBoardCellRow = ({
  row,
  CellComponent,
}: {
  row: CellIndex;
} & PropCellComponent) => (
  <View style={commonStyles.flexRow}>
    <CellComponent row={row} column={0} style={[styles.cellBorder, commonStyles.flex]} />
    <CellComponent row={row} column={1} style={[styles.cellBorder, commonStyles.flex]} />
    <CellComponent row={row} column={2} style={[styles.cellBorder, commonStyles.flex]} />
  </View>
);

export const GameBoardCell = ({
  row,
  column,
  marker,
  isHighlighted,
}: {
  row: CellIndex;
  column: CellIndex;
  marker: Marker;
  isHighlighted: boolean;
}) => (
  <View
    style={[
      commonStyles.flex,
      commonStyles.centerChildren,
      isHighlighted ? styles.cellHighlighted : null,
    ]}
    accessibilityLabel={getGameBoardCellAccessibilityLabel({ row, column, marker })}>
    {marker === 'X' ? (
      <MarkerX style={styles.markerImage} />
    ) : marker === 'O' ? (
      <MarkerO style={styles.markerImage} />
    ) : null}
  </View>
);

export const getGameBoardCellAccessibilityLabel = ({
  row,
  column,
  marker,
}: {
  row: CellIndex;
  column: CellIndex;
  marker?: Marker;
}) => `Cell at index ${row}/${column} ${marker ? `marked with ${marker}` : `free`}`;

const styles = StyleSheet.create({
  cellBorder: {
    borderWidth: 1,
  },
  cellHighlighted: {
    backgroundColor: '#fa5252',
  },
  gameBoardCellText: {
    fontSize: 32,
    flex: 1,
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  markerImage: {
    flexShrink: 1,
    margin: '10%',
  },
});
