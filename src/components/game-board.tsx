import { Text, View } from 'react-native';
import React from 'react';
import { CellIndex, Marker } from '../models/game-state';

type PropCellComponent = { CellComponent: React.FC<{ row: CellIndex; column: CellIndex }> };

export const GameBoard = ({ CellComponent }: PropCellComponent) => (
  <View>
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
  <View>
    <CellComponent row={row} column={0} />
    <CellComponent row={row} column={1} />
    <CellComponent row={row} column={2} />
  </View>
);

export const GameBoardCell = ({
  row,
  column,
  marker,
}: {
  row: CellIndex;
  column: CellIndex;
  marker: Marker;
  isHighlighted: boolean;
}) => (
  <View>
    <Text accessibilityLabel={getGameBoardCellAccessibilityLabel({ row, column, marker })}>
      {row}, {column}: {marker}
    </Text>
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
