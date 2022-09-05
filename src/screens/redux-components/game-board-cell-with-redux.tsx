import { createSelector } from '@reduxjs/toolkit';
import React, { useMemo } from 'react';
import { TouchableHighlight } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { CellIndex } from '../../models/game-state';
import { GameBoardCell } from '../../components/game-board';
import { playerMoveAction, RootState } from '../../state/redux-store';

const selectGameState = (state: RootState) => state.gameState;
const createMoveForCellSelector = ({ row, column }: { row: CellIndex; column: CellIndex }) => {
  return createSelector(selectGameState, (gameState) =>
    gameState.moves.find((m) => m.row === row && m.column === column)
  );
};

export const GameBoardCellWithRedux = ({ row, column }: { row: CellIndex; column: CellIndex }) => {
  const dispatch = useDispatch();
  const onPress = () => dispatch(playerMoveAction({ row, column }));
  const moveForCellSelector = useMemo(
    () => createMoveForCellSelector({ row, column }),
    [row, column]
  );
  const moveForCell = useSelector(moveForCellSelector);

  return (
    <TouchableHighlight onPress={onPress} underlayColor="#666666">
      <GameBoardCell row={row} column={column} marker={moveForCell?.mark} isHighlighted={false} />
    </TouchableHighlight>
  );
};
