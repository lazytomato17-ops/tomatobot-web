import { useEffect, useState } from "react";

type RankingMode = "friends" | "solo";

interface RankingEntry {
  rank: number;
  name: string;
  games: number;
  wins: number;
  losses: number;
  rate: number;
}

interface RankingPayload {
  season: string;
  minimumGames: number;
  rankings: Record<RankingMode, RankingEntry[]>;
}

const rankingApiUrl = "https://tomatobot-v2.onrender.com/api/rankings";

const currentSeason = new Intl.DateTimeFormat("ja-JP", {
  timeZone: "Asia/Tokyo",
  year: "numeric",
  month: "2-digit",
})
  .format(new Date())
  .replace("/", ".");

const sampleRankings: Record<
  RankingMode,
  RankingEntry[]
> = {
  friends: [
    { rank: 1, name: "夜ふかしトマト", games: 10, wins: 8, losses: 2, rate: 80 },
    { rank: 2, name: "月影", games: 10, wins: 7, losses: 3, rate: 70 },
    { rank: 3, name: "クロ", games: 9, wins: 6, losses: 3, rate: 67 },
    { rank: 4, name: "北風", games: 10, wins: 6, losses: 4, rate: 60 },
    { rank: 5, name: "人狼見習い", games: 9, wins: 5, losses: 4, rate: 56 },
  ],
  solo: [
    { rank: 1, name: "真夜中の村長", games: 15, wins: 11, losses: 4, rate: 73 },
    { rank: 2, name: "トマトスープ", games: 14, wins: 10, losses: 4, rate: 71 },
    { rank: 3, name: "白い靴", games: 13, wins: 9, losses: 4, rate: 69 },
    { rank: 4, name: "紫の水晶", games: 13, wins: 8, losses: 5, rate: 62 },
    { rank: 5, name: "盾のひと", games: 12, wins: 7, losses: 5, rate: 58 },
  ],
};

export function RankingBoard() {
  const [mode, setMode] = useState<RankingMode>("friends");
  const [rankings, setRankings] = useState(sampleRankings);
  const [season, setSeason] = useState(currentSeason);
  const [minimumGames, setMinimumGames] = useState(5);
  const [source, setSource] = useState<"loading" | "live" | "sample">(
    "loading",
  );

  useEffect(() => {
    const controller = new AbortController();

    async function loadRankings() {
      try {
        const response = await fetch(rankingApiUrl, {
          signal: controller.signal,
        });
        if (!response.ok) throw new Error("ranking API is unavailable");
        const payload = (await response.json()) as RankingPayload;
        if (
          !Array.isArray(payload.rankings?.friends) ||
          !Array.isArray(payload.rankings?.solo)
        ) {
          throw new Error("ranking response is invalid");
        }
        setRankings(payload.rankings);
        setSeason(payload.season.replace("-", "."));
        setMinimumGames(payload.minimumGames);
        setSource("live");
      } catch {
        if (!controller.signal.aborted) setSource("sample");
      }
    }

    void loadRankings();
    return () => controller.abort();
  }, []);

  const entries = rankings[mode];

  return (
    <div className="board-shell">
      <div className="board-toolbar">
        <div>
          <p className="board-kicker">
            {season} SEASON / {source === "live" ? "LIVE" : "PREVIEW"}
          </p>
          <h3>月間勝率ランキング</h3>
        </div>
        <div className="mode-switch" aria-label="ランキング区分">
          <button
            type="button"
            aria-pressed={mode === "friends"}
            onClick={() => setMode("friends")}
          >
            友達戦
          </button>
          <button
            type="button"
            aria-pressed={mode === "solo"}
            onClick={() => setMode("solo")}
          >
            ソロ
          </button>
        </div>
      </div>

      <div className="board-columns" aria-hidden="true">
        <span>順位 / プレイヤー</span>
        <span>戦績</span>
        <span>勝率</span>
      </div>

      <ol className="full-ranking-list">
        {entries.map((player) => (
          <li key={`${mode}-${player.rank}-${player.name}`}>
            <span className={`place place-${player.rank}`}>{player.rank}</span>
            <span className="list-avatar" aria-hidden="true">
              {player.name.slice(0, 1)}
            </span>
            <span className="list-player">
              <strong>{player.name}</strong>
              <small>{mode === "friends" ? "MULTIPLAYER" : "SOLO"}</small>
            </span>
            <span className="list-record">
              {player.wins}勝 {player.losses}敗
            </span>
            <span className="list-rate">{player.rate}%</span>
          </li>
        ))}
        {entries.length === 0 ? (
          <li className="empty-ranking">
            まだ掲載対象のプレイヤーはいません。
          </li>
        ) : null}
      </ol>

      <p className="sample-note">
        {source === "live"
          ? `/ranking join で参加し、今月${minimumGames}試合を完走したプレイヤーだけを掲載しています。`
          : source === "loading"
            ? "実データを読み込んでいます。"
            : "現在は表示サンプルです。ランキング公開後は参加に同意したプレイヤーだけを掲載します。"}
      </p>
    </div>
  );
}
