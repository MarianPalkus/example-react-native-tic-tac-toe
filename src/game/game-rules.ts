import { GameEndResult, GameMove, Marker } from '../models/game-state';

type EndingSequenceResultNotEnded = { isEndingSequence: false };
type EndingSequenceResultEnded = { isEndingSequence: true; winner: Marker; moves: GameMove[] };

type EndingSequenceResult = EndingSequenceResultNotEnded | EndingSequenceResultEnded;

/**
 * Checks the list of moves for game end situations where a player
 * has placed three marks in a horizontal, vertical, or diagonal row.
 * When no player has won and no cell is free, it is a draw.
 * See /features/app.feature.
 *
 * @param moves the list of current game moves
 */
export const checkGameEnd = (moves: GameMove[]): GameEndResult => {
  const endingSequenceResults = [
    findHorizontalEndingSequence(moves, 0),
    findHorizontalEndingSequence(moves, 1),
    findHorizontalEndingSequence(moves, 2),

    findVerticalEndingSequence(moves, 0),
    findVerticalEndingSequence(moves, 1),
    findVerticalEndingSequence(moves, 2),

    // diagonal from top-left to bottom-right
    checkEndingSequenceForRelevantGameMoves(moves, ({ column, row }) => column === row),
    // diagonal frm bottom-left to top-right
    checkEndingSequenceForRelevantGameMoves(
      moves,
      ({ column, row }) =>
        (column === 0 && row === 2) || (column === 1 && row === 1) || (column === 2 && row === 0)
    ),
  ];

  const endingSequences = endingSequenceResults.filter(isEndResult);

  if (moves.length >= 9 && endingSequences.length === 0) {
    return {
      hasEnded: true,
      isDraw: true,
    };
  }

  if (endingSequences.length > 0) {
    return {
      hasEnded: true,
      isDraw: false,
      moves: endingSequences.flatMap(({ moves }) => moves),
      winner: endingSequences[0].winner,
    };
  }
  return {
    hasEnded: false,
  };
};

const checkEndingSequenceForRelevantGameMoves = (
  moves: GameMove[],
  relevantMovePredicate: (m: GameMove) => boolean
): EndingSequenceResult => {
  const relevantMoves = moves.filter(relevantMovePredicate);

  if (relevantMoves.length < 3) {
    return {
      isEndingSequence: false,
    };
  }

  const firstMarker = relevantMoves[0]?.mark;
  if (firstMarker && relevantMoves.every((m) => m.mark === firstMarker)) {
    return {
      isEndingSequence: true,
      moves: relevantMoves,
      winner: firstMarker,
    };
  }

  return {
    isEndingSequence: false,
  };
};

const findHorizontalEndingSequence = (moves: GameMove[], row: 0 | 1 | 2): EndingSequenceResult =>
  checkEndingSequenceForRelevantGameMoves(moves, (m) => m.row === row);

const findVerticalEndingSequence = (moves: GameMove[], column: 0 | 1 | 2): EndingSequenceResult =>
  checkEndingSequenceForRelevantGameMoves(moves, (m) => m.column === column);

/**
 * Utility function for type checking whether an instance of type
 * `EndingSequenceResult` is of type `EndingSequenceResultEnded`.
 *
 * @param result
 */
function isEndResult(result: EndingSequenceResult): result is EndingSequenceResultEnded {
  return result.isEndingSequence;
}
