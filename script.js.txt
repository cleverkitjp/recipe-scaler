function convert() {
  const original = parseFloat(document.getElementById("original").value);
  const target = parseFloat(document.getElementById("target").value);
  const ratio = target / original;

  const rows = document.querySelectorAll("#ingredients tbody tr");

  rows.forEach((row) => {
    const quantityCell = row.cells[1].querySelector("input");
    const resultCell = row.cells[3];

    const base = parseFloat(quantityCell.value);
    if (isNaN(base)) {
      resultCell.textContent = "エラー";
      return;
    }

    const result = base * ratio;

    // 卵など1.3個の処理（簡易）
    if (row.cells[2].querySelector("input").value === "個") {
      if (result % 1 < 0.25) {
        resultCell.textContent = Math.floor(result) + "個";
      } else if (result % 1 > 0.75) {
        resultCell.textContent = Math.ceil(result) + "個";
      } else {
        resultCell.textContent = Math.floor(result) + "個＋少々";
      }
    } else {
      resultCell.textContent = Math.round(result * 10) / 10;
    }
  });
}
