document.addEventListener("DOMContentLoaded", function () {
  const pageType = document.body.getAttribute("data-page-type");

  switch (pageType) {
    case "index":
      initIndexPage();
      fetchPreviousMatches();
      break;
    case "match":
      initMatchPage();
      break;
  }
});

function initIndexPage() {
  const registerForm = document.getElementById("register-form");
  if (registerForm) {
    registerForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const team1Name = document.getElementById("team1-name").value;
      const team2Name = document.getElementById("team2-name").value;
      readImage(document.getElementById("team1-logo").files[0], (team1Logo) => {
        readImage(document.getElementById("team2-logo").files[0], (team2Logo) => {
          localStorage.setItem("team1", JSON.stringify({ name: team1Name, logo: team1Logo }));
          localStorage.setItem("team2", JSON.stringify({ name: team2Name, logo: team2Logo }));
          window.location.href = "match.html";
        });
      });
    });
  }
  fetchPreviousMatches();
}

function readImage(file, callback) {
  const reader = new FileReader();
  reader.onload = function (e) {
    callback(e.target.result);
  };
  reader.readAsDataURL(file);
}

function fetchPreviousMatches() {
  // Expanded dummy data for previous matches
  const previousMatches = [
    { id: 1, team1: "Team A", team2: "Team B", score: "2 - 3", yellowCards: "4 - 1", redCards: "1 - 0", fouls: "5 - 3" },
    { id: 2, team1: "Team C", team2: "Team D", score: "1 - 1", yellowCards: "2 - 2", redCards: "0 - 1", fouls: "6 - 4" },
  ];

  const matchesList = document.getElementById("matches-list");
  matchesList.innerHTML = ""; // Clear existing list items if any
  previousMatches.forEach((match) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `<strong>${match.team1} vs ${match.team2}</strong> - Score: ${match.score}<br>
                              Yellow Cards: ${match.yellowCards}, Red Cards: ${match.redCards}, Fouls: ${match.fouls}`;
    matchesList.appendChild(listItem);
  });
}

function initMatchPage() {
  setupMatchControls();
  loadTeamInfo();
}

function setupMatchControls() {
  const startButton = document.getElementById("start-button");
  const pauseButton = document.getElementById("pause-button");
  const endButton = document.getElementById("end-button");

  let matchTimer = null;
  let matchSeconds = 0;

  startButton.addEventListener("click", () => {
    if (!matchTimer) {
      matchTimer = setInterval(() => {
        matchSeconds++;
        document.getElementById("timer-display").textContent = formatTime(matchSeconds);
      }, 1000);
    }
  });

  pauseButton.addEventListener("click", () => {
    if (matchTimer) {
      clearInterval(matchTimer);
      matchTimer = null;
    }
  });

  endButton.addEventListener("click", () => {
    if (confirm("Are you sure you want to end the match?")) {
      if (matchTimer) {
        clearInterval(matchTimer);
        matchTimer = null;
      }
      matchSeconds = 0;
      document.getElementById("timer-display").textContent = "00:00";

      // Collect match data
      const matchData = {
        team1: {
          name: document.getElementById("team1-name").textContent,
          goals: parseInt(document.getElementById("team1-goals").textContent),
          yellowCards: parseInt(document.getElementById("team1-yellow-cards").textContent),
          fouls: parseInt(document.getElementById("team1-fouls").textContent),
          // Add other stats as needed
        },
        team2: {
          name: document.getElementById("team2-name").textContent,
          goals: parseInt(document.getElementById("team2-goals").textContent),
          yellowCards: parseInt(document.getElementById("team2-yellow-cards").textContent),
          fouls: parseInt(document.getElementById("team2-fouls").textContent),
          // Add other stats as needed
        },
        matchDuration: formatTime(matchSeconds),
      };

      // Send the match data to the backend
      fetch("updateMatchState", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(matchData),
      })
        .then((response) => response.json())
        .then((data) => console.log("Match data saved:", data))
        .catch((error) => console.error("Error saving match data:", error));

      // Redirect to the main page
      window.location.href = "index.html";
    }
  });
}

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

function loadTeamInfo() {
  const team1 = JSON.parse(localStorage.getItem("team1"));
  const team2 = JSON.parse(localStorage.getItem("team2"));
  document.getElementById("team1-name").textContent = team1.name;
  document.getElementById("team1-logo").src = team1.logo;
  document.getElementById("team2-name").textContent = team2.name;
  document.getElementById("team2-logo").src = team2.logo;
  document.querySelectorAll(".control-button").forEach((button) => {
    button.addEventListener("click", function () {
      const team = this.getAttribute("data-team");
      const stat = this.getAttribute("data-stat");
      incrementStat(team, stat);
    });
  });
}

function incrementStat(team, stat) {
  const statCountElement = document.getElementById(`${team}-${stat}`);
  let currentCount = parseInt(statCountElement.textContent, 10);
  statCountElement.textContent = ++currentCount;
}
