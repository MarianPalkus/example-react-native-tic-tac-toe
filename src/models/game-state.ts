export type CellIndex = 0 | 1 | 2;
export type Marker = 'X' | 'O';

export interface GameMove {
  readonly row: CellIndex;
  readonly column: CellIndex;
  readonly mark: Marker;
}
export type GameEndResult =
  | { hasEnded: true; isDraw: false; moves: GameMove[]; winner: Marker }
  | { hasEnded: true; isDraw: true }
  | { hasEnded: false };

export interface GameState {
  readonly moves: GameMove[];
  readonly nextTurnsMarker: 'X' | 'O';
  readonly gameEndResult: GameEndResult;
}
