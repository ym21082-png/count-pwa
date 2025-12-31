// ローカルストレージから読み込み
let counters = JSON.parse(localStorage.getItem("counters")) || {};
let history = JSON.parse(localStorage.getItem("history")) || {};

// 今日の日付を取得
function getToday() {
  return new Date().toISOString().split("T")[0];
}

// カウンター一覧を表示
function renderCounters() {
  const container = document.getElementById("counters");
  container.innerHTML = "";

  Object.keys(counters).forEach(name => {
    const value = counters[name];

    const card = document.createElement("div");
    card.className = "counter-card";

    card.innerHTML = `
      <div class="counter-name">${name}</div>
      <div class="counter-value">${value}</div>
      <button class="increment">＋1</button>
      <button class="reset">リセット</button>
      <button class="delete">削除</button>
    `;

    // ＋1
    card.querySelector(".increment").onclick = () => {
      counters[name]++;
      save();
      renderCounters();
    };

    // リセット
    card.querySelector(".reset").onclick = () => {
      counters[name] = 0;
      save();
      renderCounters();
    };

    // 削除
    card.querySelector(".delete").onclick = () => {
      delete counters[name];
      save();
      renderCounters();
    };

    container.appendChild(card);
  });
}

// 保存（履歴も保存する）
function save() {
  // カウンター保存
  localStorage.setItem("counters", JSON.stringify(counters));

  // 今日の日付
  const today = getToday();

  // 今日の履歴がなければ作る
  if (!history[today]) {
    history[today] = {};
  }

  // 今日の履歴に現在のカウンター値を保存
  history[today] = { ...counters };

  // 履歴を保存
  localStorage.setItem("history", JSON.stringify(history));
}

// カウンター追加
document.getElementById("addCounterBtn").onclick = () => {
  const name = document.getElementById("newCounterName").value.trim();
  if (name && !counters[name]) {
    counters[name] = 0;
    save();
    renderCounters();
  }
  document.getElementById("newCounterName").value = "";
};

// 初期表示
renderCounters();
