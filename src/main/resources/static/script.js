function clockIn() {
  fetch("/clock-in")
    .then((r) => r.text())
    .then((t) => {
      document.getElementById("result").innerText = t;
      loadRecords();
    });
}

function clockOut() {
  fetch("/clock-out")
    .then((r) => r.text())
    .then((t) => {
      document.getElementById("result").innerText = t;
      loadRecords();
    });
}

function loadRecords() {
  fetch("/records")
    .then((r) => r.json())
    .then((data) => {
      let html = "";
      let status = document.getElementById("status");

      data.forEach((a) => {
        let workTime = "";

        if (a.clockIn && a.clockOut) {
          let start = new Date(a.clockIn);
          let end = new Date(a.clockOut);

          let diff = (end - start) / 1000 / 60;

          let h = Math.floor(diff / 60);
          let m = Math.floor(diff % 60);

          workTime = h + "時間" + m + "分";
        }

        html += `
<tr>
<td>${a.id}</td>
<td>${a.clockIn ?? ""}</td>
<td>${a.clockOut ?? ""}</td>
<td>${workTime}</td>
</tr>
`;
      });

      document.getElementById("records").innerHTML = html;

      /* 勤務中バッジ */

      if (data.length > 0) {
        let last = data[data.length - 1];

        if (last.clockIn && !last.clockOut) {
          status.innerHTML =
            '<span class="badge badge-working">🟢 勤務中</span>';
        } else {
          status.innerHTML = '<span class="badge badge-off">🔴 退勤済</span>';
        }
      }
    });
}

loadRecords();
