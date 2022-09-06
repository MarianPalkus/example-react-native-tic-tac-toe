import { createSelector } from '@reduxjs/toolkit';
import React, { useMemo } from 'react';
import { StyleProp, TouchableHighlight, ViewStyle } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { playerMoveAction } from '../actions';
import { CellIndex } from '../../models/game-state';
import { GameBoardCell } from '../../components/game-board';
import { RootState } from '../redux-store';
import { selectGameHasEnded, selectGameWinnerMoves } from '../state-selectors';

const selectGameState = (state: RootState) => state.gameState;

const createMoveForCellSelector = ({ row, column }: { row: CellIndex; column: CellIndex }) => {
  return createSelector(selectGameState, (gameState) =>
    gameState.moves.find((m) => m.row === row && m.column === column)
  );
};

const createWinnerMoveForCellSelector = ({
  row,
  column,
}: {
  row: CellIndex;
  column: CellIndex;
}) => {
  return createSelector(selectGameWinnerMoves, (moves = []) =>
    moves.find((m) => m.row === row && m.column === column)
  );
};

export const GameBoardCellWithRedux = ({
  row,
  column,
  style,
}: {
  row: CellIndex;
  column: CellIndex;
  style: StyleProp<ViewStyle>;
}) => {
  const dispatch = useDispatch();
  const gameHasEnded = useSelector(selectGameHasEnded);
  const onPress = () => dispatch(playerMoveAction({ row, column }));
  const moveForCellSelector = useMemo(
    () => createMoveForCellSelector({ row, column }),
    [row, column]
  );
  const winnerMoveForCellSelector = useMemo(
    () => createWinnerMoveForCellSelector({ row, column }),
    [row, column]
  );
  const moveForCell = useSelector(moveForCellSelector);
  const winnerMoveForCell = useSelector(winnerMoveForCellSelector);

  return (
    <TouchableHighlight
      onPress={onPress}
      underlayColor="#4c6ef5"
      style={style}
      disabled={gameHasEnded}>
      <GameBoardCell
        row={row}
        column={column}
        marker={moveForCell?.mark}
        isHighlighted={winnerMoveForCell !== undefined}
      />
    </TouchableHighlight>
  );
};
