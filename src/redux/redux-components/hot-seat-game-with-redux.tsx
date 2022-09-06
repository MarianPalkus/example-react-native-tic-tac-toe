import { useSelector } from 'react-redux';
import { HotSeatGame } from '../../components/hot-seat-game';
import {
  selectGameHasEnded,
  selectGameIsDraw,
  selectGameWinner,
  selectNextTurnMarker,
} from '../state-selectors';

export const HotSeatGameWithRedux = ({ goBack }: { goBack: () => void }) => {
  const nextTurnMarker = useSelector(selectNextTurnMarker);
  const gameHasEnded = useSelector(selectGameHasEnded);
  const isDraw = useSelector(selectGameIsDraw);
  const winner = useSelector(selectGameWinner);

  return (
    <HotSeatGame
      nextTurnMarker={nextTurnMarker}
      gameHasEnded={gameHasEnded}
      isDraw={isDraw}
      winner={winner}
      goBack={goBack}
    />
  );
};
