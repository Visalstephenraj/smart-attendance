// Sample student list
const students = ["Arun", "Meena", "Siva", "Priya", "Karthik"];

// -------- Store Attendance Page --------
if (document.getElementById("attendanceForm")) {
  const today = new Date().toISOString().split("T")[0];
  document.getElementById("todayDate").innerText = today;

  const table = document.querySelector("table");
  students.forEach((student, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${student}</td>
      <td><input type="radio" name="student_${index}" value="Present"></td>
      <td><input type="radio" name="student_${index}" value="Absent"></td>
    `;
    table.appendChild(row);
  });

  document.getElementById("attendanceForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const course = document.getElementById("course").value;
    let attendance = {};
    students.forEach((student, index) => {
      const status = document.querySelector(`input[name="student_${index}"]:checked`);
      attendance[student] = status ? status.value : "Absent";
    });

    let records = JSON.parse(localStorage.getItem("attendanceRecords")) || {};
    if (!records[course]) records[course] = {};
    records[course][today] = attendance;

    localStorage.setItem("attendanceRecords", JSON.stringify(records));
    alert("Attendance saved successfully!");
    window.location.href = "index.html";
  });
}

// -------- View Attendance Page --------
function loadAttendance() {
  const course = document.getElementById("courseSelect").value;
  const date = document.getElementById("dateSelect").value;

  let records = JSON.parse(localStorage.getItem("attendanceRecords")) || {};
  let output = "<p>No records found.</p>";

  if (records[course] && records[course][date]) {
    output = `<h3>${course} - ${date}</h3>
      <table>
        <tr><th>S.No</th><th>Name</th><th>Status</th></tr>`;
    let i = 1;
    for (const [name, status] of Object.entries(records[course][date])) {
      output += `<tr><td>${i++}</td><td>${name}</td><td>${status}</td></tr>`;
    }
    output += "</table>";
  }

  document.getElementById("recordsTable").innerHTML = output;
}
