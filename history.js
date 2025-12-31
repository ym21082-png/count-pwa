// 履歴データを読み込む
let history = JSON.parse(localStorage.getItem("history")) || {};

const historyDiv = document.getElementById("history");

// 履歴が空ならメッセージだけ表示して終了
if (Object.keys(history).length === 0) {
  historyDiv.innerHTML = "<p>まだ履歴がありません。</p>";
  console.log("履歴が空のため、グラフは描画されません。");
} else {

  // 履歴一覧を表示
  Object.keys(history).forEach(date => {
    const dayData = history[date];

    const card = document.createElement("div");
    card.className = "counter-card";

    let html = `<h3>${date}</h3><ul>`;
    Object.keys(dayData).forEach(name => {
      html += `<li>${name}: ${dayData[name]}</li>`;
    });
    html += "</ul>";

    card.innerHTML = html;
    historyDiv.appendChild(card);
  });

  // グラフ用データを作成
  const dates = Object.keys(history);
  const firstDay = dates[0];
  const counters = Object.keys(history[firstDay]);

  // 1つ目のカウンターをグラフ化
  const targetCounter = counters[0];

  const graphLabels = dates;
  const graphData = dates.map(d => history[d][targetCounter] || 0);

  // Chart.js でグラフ描画
  const ctx = document.getElementById("chart");

  new Chart(ctx, {
    type: "line",
    data: {
      labels: graphLabels,
      datasets: [{
        label: targetCounter,
        data: graphData,
        borderColor: "blue",
        backgroundColor: "lightblue",
        fill: true
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: { beginAtZero: true }
      }
    }
  });
}
