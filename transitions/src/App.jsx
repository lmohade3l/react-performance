import { useState, useEffect, useTransition } from "react";
import Score from "./Score";
import getScore from "./getScore";

export default function App() {
  // const [isPending, setIsPending] = useState(true);
  const [isPending, startTransition] = useTransition();
  const [game, setGame] = useState(1);
  const [score, setScore] = useState({ home: "-", away: "-" });

  async function getNewScore(game) {
    // setIsPending(true);
    setGame(game);

    startTransition(async () => {
      const newScore = await getScore(game);
      startTransition(async () => {
        setScore(newScore);
      });
    });
    // setIsPending(false);
  }

  useEffect(() => {
    getNewScore(game);
  }, []);

  return (
    <div className="app">
      <h1>Game {game}</h1>
      <select
        // disabled={isPending}
        onChange={(e) => getNewScore(e.target.value)}
      >
        {[1, 2, 3, 4, 5, 6, 7].map((no) => (
          <option key={no} value={no}>
            Game {no}
          </option>
        ))}
      </select>

      <div className={`loading-container ${isPending ? "loading" : ""}`}>
        <span className="spinner">⚽️</span>
      </div>

      <div>
        <Score
          home={score.home}
          away={score.away}
          homeName={score.homeName}
          homeImage={score.homeImage}
          awayName={score.awayName}
          awayImage={score.awayImage}
          isPending={isPending}
        />
      </div>
    </div>
  );
}
