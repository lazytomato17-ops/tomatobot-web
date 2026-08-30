import { RankingBoard } from "./RankingBoard";

const botInviteUrl =
  "https://discord.com/oauth2/authorize?client_id=1442475786736242807";

const rankingPreview = [
  { rank: 1, name: "夜ふかしトマト", record: "8勝2敗", rate: "80%" },
  { rank: 2, name: "月影", record: "7勝3敗", rate: "70%" },
  { rank: 3, name: "クロ", record: "6勝3敗", rate: "67%" },
];

const features = [
  {
    index: "01",
    title: "考えて動くNPC",
    text: "CO・判定・投票を覚え、性格ごとに疑い方が変わります。人数が足りなくても推理戦が成立します。",
  },
  {
    index: "02",
    title: "自分たちで決める配役",
    text: "4〜15人、人狼・狂人・占い師・騎士・霊能者をロビーで調整。友達が参加すると標準配役も自然に変わります。",
  },
  {
    index: "03",
    title: "COから再戦までDiscord内",
    text: "役職DM、昼の議論、公開CO、投票結果、戦績確認まで、別アプリを開かずに完結します。",
  },
];

const roles = [
  ["村人", "🧑‍🌾", "言葉と投票で見抜く"],
  ["人狼", "🐺", "正体を隠して襲撃する"],
  ["狂人", "🃏", "人間として人狼を助ける"],
  ["占い師", "🔮", "毎夜ひとりを占う"],
  ["騎士", "🛡️", "襲撃からひとりを守る"],
  ["霊能者", "👻", "処刑者の正体を確かめる"],
];

export default function App() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Tomatobot トップへ">
          <span className="brand-mark" aria-hidden="true">
            T
          </span>
          <span>Tomatobot</span>
        </a>
        <nav aria-label="メインナビゲーション">
          <a href="#ranking">ランキング</a>
          <a href="#how-to-play">遊び方</a>
          <a className="nav-cta" href={botInviteUrl} target="_blank" rel="noreferrer">
            Botを追加
          </a>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">
            <span /> Discord Werewolf Bot
          </p>
          <h1>
            集まれば推理戦。
            <br />
            ひとりなら<span>NPC戦。</span>
          </h1>
          <p className="lead">
            Discordで、そのまま始まる人狼ゲーム。
            <br />
            友達が足りない夜も、考えて動くNPCがゲームを成立させます。
          </p>
          <div className="hero-actions">
            <a className="primary-button" href={botInviteUrl} target="_blank" rel="noreferrer">
              Discordに追加する
              <span aria-hidden="true">↗</span>
            </a>
            <a className="text-link" href="#how-to-play">
              30秒で分かる遊び方
              <span aria-hidden="true">↓</span>
            </a>
          </div>
          <dl className="quick-facts" aria-label="Tomatobotの特徴">
            <div>
              <dt>PLAYERS</dt>
              <dd>1人から</dd>
            </div>
            <div>
              <dt>VILLAGE</dt>
              <dd>4〜15人</dd>
            </div>
            <div>
              <dt>ROLES</dt>
              <dd>基本6役</dd>
            </div>
          </dl>
        </div>

        <aside className="ranking-card" aria-label="月間ランキングの表示イメージ">
          <div className="card-glow" />
          <div className="ranking-heading">
            <div>
              <p>SEASON RANKING</p>
              <h2>月間｜友達戦</h2>
            </div>
            <span className="preview-badge">表示イメージ</span>
          </div>
          <div className="ranking-list">
            {rankingPreview.map((player) => (
              <div className={`ranking-row rank-${player.rank}`} key={player.rank}>
                <span className="rank-number">{String(player.rank).padStart(2, "0")}</span>
                <span className="avatar" aria-hidden="true">
                  {player.name.slice(0, 1)}
                </span>
                <span className="player-name">{player.name}</span>
                <span className="record">{player.record}</span>
                <strong>{player.rate}</strong>
              </div>
            ))}
          </div>
          <div className="ranking-rule">
            <span>公平な集計</span>
            <p>月間制・最低5試合・ソロと友達戦を分離</p>
          </div>
        </aside>
      </section>

      <section className="ranking-intro" id="ranking">
        <p className="section-index">01 / Ranking</p>
        <div>
          <h2>勝つだけじゃない。続けたくなる記録を。</h2>
          <p>
            短期の偶然や周回数だけで決まらない月間ランキングを公開中です。
            公開名は本人が参加を選んだ場合だけ表示します。
          </p>
        </div>
      </section>

      <section className="ranking-stage" aria-label="月間ランキング">
        <RankingBoard />
        <aside className="fairness-panel">
          <p className="section-index">Fair play</p>
          <h3>競争は楽しく、集計は公平に。</h3>
          <ul>
            <li><span className="fairness-index">01</span><span className="fairness-copy">ランキングは毎月リセット</span></li>
            <li><span className="fairness-index">02</span><span className="fairness-copy">勝率は5試合完走から掲載</span></li>
            <li><span className="fairness-index">03</span><span className="fairness-copy">ソロと友達戦は完全に分離</span></li>
            <li><span className="fairness-index">04</span><span className="fairness-copy"><code>/ranking join</code> で本人が参加</span></li>
            <li><span className="fairness-index">05</span><span className="fairness-copy">テスト用特殊配役は対象外</span></li>
          </ul>
          <p className="fairness-note">
            勝敗数と勝率を一緒に見せ、1つの数字だけで強さを決めません。
          </p>
        </aside>
      </section>

      <section className="features-section" id="features">
        <div className="section-heading">
          <p className="section-index">02 / Why Tomatobot</p>
          <h2>シンプルに始まり、<br />推理はちゃんと深い。</h2>
        </div>
        <div className="feature-grid">
          {features.map((feature) => (
            <article key={feature.index}>
              <span>{feature.index}</span>
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="roles-section" aria-label="役職一覧">
        <div className="roles-heading">
          <p className="section-index">Basic roles</p>
          <h2>6つの役職から、毎回違う物語。</h2>
        </div>
        <div className="role-list">
          {roles.map(([name, icon, description]) => (
            <article key={name}>
              <span aria-hidden="true">{icon}</span>
              <div><h3>{name}</h3><p>{description}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section className="how-to" id="how-to-play" aria-label="遊び方">
        <p className="section-index">03 / Quick start</p>
        <ol>
          <li><span>01</span>Botをサーバーへ追加</li>
          <li><span>02</span><code>/jinro</code> を入力</li>
          <li><span>03</span>人数と配役を決めて開始</li>
        </ol>
      </section>

      <section className="final-cta">
        <p className="eyebrow"><span /> Ready to play?</p>
        <h2>今夜の村を、始めよう。</h2>
        <p>1人でも、友達とでも。必要なのはDiscordだけです。</p>
        <a className="primary-button" href={botInviteUrl} target="_blank" rel="noreferrer">
          Tomatobotを追加する <span aria-hidden="true">↗</span>
        </a>
      </section>

      <footer>
        <a className="brand" href="#top"><span className="brand-mark">T</span><span>Tomatobot</span></a>
        <p>Discordで遊べる人狼ゲームBot</p>
        <a href="https://github.com/lazytomato17-ops/tomatobot" target="_blank" rel="noreferrer">GitHub ↗</a>
      </footer>
    </main>
  );
}
