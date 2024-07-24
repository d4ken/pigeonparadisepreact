import "./App.css";
import { useRef, useState } from "react";

function App() {
  // 前回のJavaScriptコードをここに貼り付け
  //let hatoPower = 0;
  let clickPower = 1;
  let totalClicks = 0;
  // 鳩の数を管理する変数
  let pigeonCount = 0;
  const testRef = useRef<HTMLInputElement>(null);

  const [hatoPower, setHatoPower] = useState(0);

  const upgrades = [
    { id: "feeder", name: "自動給餌器", cost: 10, count: 0, power: 1 },
    { id: "nestbox", name: "巣箱", cost: 50, count: 0, power: 2 },
    { id: "specialfood", name: "特殊なエサ", cost: 100, count: 0, power: 3 },
    { id: "deliciouswater", name: "美味しい水", cost: 300, count: 0, power: 5 },
    { id: "pigeonhouse", name: "鳩小屋", cost: 1000, count: 0, power: 8 },
  ];

  const achievements = [
    {
      id: "beginner",
      name: "初心者飼育員",
      description: "10回クリックする",
      condition: () => totalClicks >= 10,
      achieved: false,
    },
    {
      id: "feeding_expert",
      name: "エサやり名人",
      description: "100回クリックする",
      condition: () => totalClicks >= 100,
      achieved: false,
    },
    {
      id: "birdwatch_beginner",
      name: "初心者バードウォッチャー",
      description: "ハト力が100に到達する",
      condition: () => hatoPower >= 100,
      achieved: false,
    },
    {
      id: "pigeon_master",
      name: "ハトマスター",
      description: "ハト力が10000に到達する",
      condition: () => hatoPower >= 10000,
      achieved: false,
    },
    {
      id: "pigeon_house_builder",
      name: "鳩舎の建築者",
      description: "合計10回アップグレードを購入する",
      condition: () =>
        upgrades.reduce((sum, upgrade) => sum + upgrade.count, 0) >= 10,
      achieved: false,
    },
    {
      id: "upgrade_master",
      name: "アップグレードマスター",
      description: "合計100回アップグレードを購入する",
      condition: () =>
        upgrades.reduce((sum, upgrade) => sum + upgrade.count, 0) >= 100,
      achieved: false,
    },
    {
      id: "pigeon_master",
      name: "ジャストポッポ",
      description: "ハト力が丁度810になる",
      condition: () => hatoPower === 810,
      achieved: false,
    },
  ];

  // 鳩を追加する関数
  function addPigeon() {
    const pigeon = document.createElement("div");
    pigeon.className = `pigeon`;
    if (feverTime) {
      pigeon.classList.add("rotate_roop");
    }
    pigeon.style.left = `${Math.random() * 80 + 10}%`;
    pigeon.style.bottom = `${Math.random() * 60 + 20}%`;
    document.getElementById("pigeon-container")?.appendChild(pigeon);
    pigeonCount++;
  }

  // 鳩の数を更新する関数
  function updatePigeons() {
    const newPigeonCount = Math.floor(Math.sqrt(hatoPower) / 2);
    while (pigeonCount < newPigeonCount) {
      const audio = new Audio("../audio/se/pigeon.mp3");
      audio.currentTime = 0;
      audio.play();
      if (pigeonCount < 30) {
        addPigeon();
      }
    }
  }

  // フィーバータイム演出
  const feverMusic = new Audio("../audio/bgm/cadd_summer_fever_chorus.mp3");
  feverMusic.volume = 0.1;
  let feverTime = false;

  function feverTimeEffect() {
    if (feverMusic.paused) {
      feverMusic.play();
    } else {
      feverMusic.currentTime = 0;
    }
  }

  // 全ての鳩をアニメーションさせる関数
  function feverPigeons() {
    const pigeons = document.querySelectorAll(".pigeon");
    pigeons.forEach((pigeon) => {
      if (feverTime) {
        pigeon.classList.add("rotate_roop");
      } else {
        pigeon.classList.remove("rotate_roop");
      }
    });
  }

  feverMusic.addEventListener("play", () => {
    feverTime = true;
    feverPigeons();
    console.log("再生が開始されました");
  });
  feverMusic.addEventListener("ended", () => {
    feverTime = false;
    feverPigeons();
    console.log("再生が終了しました");
  });

  // 全ての鳩をアニメーションさせる関数
  function animatePigeons() {
    const pigeons = document.querySelectorAll(".pigeon");
    pigeons.forEach((pigeon) => {
      pigeon.classList.add("flying");
      setTimeout(() => pigeon.classList.remove("flying"), 500);
    });
  }

  // function updateDisplay() {
  //   // setHatoPower;
  //   if (document.getElementById("hato-power")) {
  //     testRef.current.textContent = hatoPower;
  //     // document.getElementById("hato-power").textContent = hatoPower;
  //   }
  //   updateUpgradeList();
  //   updateAchievements();
  // }

  // function updateUpgradeList() {
  //   const upgradeList = document.getElementById("upgrade-list");
  //   upgradeList.innerHTML = "";
  //   upgrades.forEach((upgrade) => {
  //     const li = document.createElement("li");
  //     li.textContent = `${upgrade.name} (所持数: ${upgrade.count})`;
  //     const buyButton = document.createElement("button");
  //     buyButton.textContent = `購入(${upgrade.cost} ハト力)`;
  //     buyButton.className = `buy-button`;
  //     buyButton.onclick = () => buyUpgrade(upgrade);
  //     li.appendChild(buyButton);
  //     upgradeList?.appendChild(li);
  //   });
  // }

  function buyUpgrade(upgrade: {
    id?: string;
    name?: string;
    cost: number;
    count: number;
    power: number;
  }) {
    if (hatoPower >= upgrade.cost) {
      setHatoPower(hatoPower - upgrade.cost);
      //hatoPower -= upgrade.cost;
      upgrade.count++;
      upgrade.cost = Math.floor(upgrade.cost * 1.5);
      clickPower += upgrade.power;
      // updateDisplay();
      checkAchievements();
    } else {
      alert("ハト力が足りません！");
    }
  }

  // function updateAchievements() {
  //   const achievementList = document.getElementById("achievement-list");
  //   achievementList.innerHTML = "";
  //   achievements.forEach((achievement) => {
  //     const div = document.createElement("div");
  //     div.className = `achievement ${achievement.achieved ? "achieved" : ""}`;
  //     div.textContent = `${achievement.name}`;
  //     achievementList?.appendChild(div);
  //   });
  // }

  function checkAchievements() {
    let newAchievements = false;
    achievements.forEach((achievement) => {
      if (!achievement.achieved && achievement.condition()) {
        achievement.achieved = true;
        newAchievements = true;
        // alert(`実績解除: ${achievement.name}: ${achievement.description}`);
      }
    });
    if (newAchievements) {
      // updateAchievements();
    }
  }
  // 新しい関数を追加
  // function animatePigeon() {
  //   const pigeon = document.getElementById("pigeon");
  //   pigeon.classList.add("flying");
  //   setTimeout(() => pigeon.classList.remove("flying"), 500);
  // }

  function createPowerUp(amount: number) {
    const powerUp = document.createElement("div");
    powerUp.className = "power-up";
    powerUp.textContent = `+${amount}`;
    powerUp.style.left = `${Math.random() * 80 + 10}%`;
    powerUp.style.top = `${Math.random() * 50 + 25}%`;
    document.getElementById("pigeon-container")?.appendChild(powerUp);
    setTimeout(() => powerUp.remove(), 1000);
  }

  function createFeed() {
    const feed = document.createElement("div");
    feed.className = "feed";
    feed.style.left = `${Math.random() * 80 + 10}%`;
    document.getElementById("pigeon-container")?.appendChild(feed);
    setTimeout(() => feed.remove(), 1000);
  }

  // クリックボタンのイベントリスナーを更新
  function onClickFeed() {
    setHatoPower(hatoPower + clickPower);
    //hatoPower += clickPower;
    totalClicks++;
    animatePigeons();
    createPowerUp(clickPower);
    createFeed();
    // updateDisplay();
    updatePigeons();
    checkAchievements();
  }

  // 自動更新の関数を更新
  setInterval(() => {
    const autoIncrease = upgrades.reduce(
      (sum, upgrade) => sum + upgrade.count * upgrade.power,
      0
    );
    if (autoIncrease > 0) {
      setHatoPower(hatoPower + autoIncrease);
      createPowerUp(autoIncrease);
      animatePigeons();
    }
    // updateDisplay();
    updatePigeons();
    checkAchievements();
  }, 1000);

  return (
    <>
      <div className="container">
        <h1>ピジョンパラダイス</h1>
        <div id="game-container">
          <div className="card" id="main-game">
            <h2>
              ハト力: <span ref={testRef}>{hatoPower}</span>
            </h2>
            <div id="pigeon-container">
              <div id="pigeon"></div>
            </div>
            <div>
              <button id="click-button" onClick={onClickFeed}>
                エサをあげる
              </button>
              <button id="click-fever" onClick={feverTimeEffect}>
                フィーバータイム！！！
              </button>
            </div>
          </div>
          <div id="upgrades">
            <h2>アップグレード</h2>
            <ul>
              {upgrades.map((upgrade) => {
                return (
                  <li>
                    <span>
                      `${upgrade.name} (所持数: ${upgrade.count})`
                    </span>
                    <button
                      className="buy-button"
                      onClick={() => buyUpgrade(upgrade)}
                    >
                      `購入(${upgrade.cost} ハト力)`
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div id="achievements">
          <h2>実績</h2>
          <div id="achievement-list"></div>
        </div>
        <div className="bgm-area">
          <div>
            <p>三宅島</p>
            <audio controls loop src="./audio/bgm/bgm_mushikui.mp3"></audio>
          </div>
          <div>
            <p>夏の山</p>
            <audio controls loop src="./audio/bgm/bgm_summer.mp3"></audio>
          </div>
          <div>
            <p>すずめ</p>
            <audio controls loop src="./audio/bgm/bgm_nature.mp3"></audio>
          </div>
        </div>
        <script src="./js/app.js"></script>
      </div>
    </>
  );
}

export default App;
