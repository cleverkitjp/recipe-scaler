function convert() {
  const original = parseFloat(document.getElementById("original").value);
  const target = parseFloat(document.getElementById("target").value);
  const ratio = target / original;

  const rows = document.querySelectorAll("#ingredients tbody tr");

  rows.forEach((row) => {
    const quantityCell = row.cells[1].querySelector("input");
    const unitCell = row.cells[2].querySelector("input");
    const resultCell = row.cells[3];

    const base = parseFloat(quantityCell.value);
    const unit = unitCell.value;
    if (isNaN(base)) {
      resultCell.textContent = "エラー";
      return;
    }

    const result = base * ratio;

    if (unit === "個") {
      if (result % 1 < 0.25) {
        resultCell.textContent = Math.floor(result) + "個";
      } else if (result % 1 > 0.75) {
        resultCell.textContent = Math.ceil(result) + "個";
      } else {
        resultCell.textContent = Math.floor(result) + "個＋少々";
      }
    } else {
      resultCell.textContent = Math.round(result * 10) / 10 + unit;
    }
  });
}

function addRow() {
  const table = document.querySelector("#ingredients tbody");
  const row = document.createElement("tr");
  row.innerHTML = `
    <td data-label="食材名"><input value="" /></td>
    <td data-label="分量"><input type="number" value="" /></td>
    <td data-label="単位"><input value="" /></td>
    <td class="result" data-label="換算後">-</td>
    <td data-label="削除"><button onclick="deleteRow(this)">×</button></td>
  `;
  table.appendChild(row);
}

function deleteRow(button) {
  const row = button.closest("tr");
  row.remove();
}
