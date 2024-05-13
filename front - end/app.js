// Implementing an event listener for DOM content loaded
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

// Initialize the index page by setting up the registration form and fetching previous matches
function initIndexPage() {
  const registerForm = document.getElementById("register-form");
  if (registerForm) {
    registerForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const team1Name = document.getElementById("team1-name").value;
      const team2Name = document.getElementById("team2-name").value;
      const team1LogoUrl = document.getElementById("team1-logo").value; // Assuming input type is text for URL
      const team2LogoUrl = document.getElementById("team2-logo").value; // Assuming input type is text for URL

      const matchInitializationData = {
        teamHomeName: team1Name,
        teamHomeLogo: team1LogoUrl,
        teamHomeGoals: 0,
        teamHomeYCards: 0,
        teamHomeFouls: 0,
        teamAwayName: team2Name,
        teamAwayLogo: team2LogoUrl,
        teamAwayGoals: 0,
        teamAwayYCards: 0,
        teamAwayFouls: 0,
      };

      initializeMatch(matchInitializationData, (match) => {
        localStorage.setItem("matchId", match.id);
        localStorage.setItem("team1", JSON.stringify({ name: team1Name, logo: team1LogoUrl }));
        localStorage.setItem("team2", JSON.stringify({ name: team2Name, logo: team2LogoUrl }));
        window.location.href = "match.html";
      });
    });
  }
  fetchPreviousMatches();
}

// Initializes the match by sending the match initialization data to the server
function initializeMatch(data, callback) {
  fetch("http://localhost:8080/api/matches", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((match) => {
      console.log("Match initialized");
      callback(match);
    })
    .catch((error) => console.error("Error initializing match:", error));
}

// Fetches and displays previous match data from the server
function fetchPreviousMatches() {
  fetch("http://localhost:8080/api/matches")
    .then((response) => response.json())
    .then((previousMatches) => {
      const matchesList = document.getElementById("matches-list");
      matchesList.innerHTML = ""; // Clear existing list items if any
      previousMatches.forEach((match) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `<strong>${match.teamHomeName} vs ${match.teamAwayName}</strong> - Score: ${match.teamHomeGoals} - ${match.teamAwayGoals}<br>
                              Yellow Cards: ${match.teamHomeYCards} - ${match.teamAwayYCards}, Fouls: ${match.teamHomeFouls} - ${match.teamAwayFouls}`;
        matchesList.appendChild(listItem);
      });
    })
    .catch((error) => console.error("Error fetching previous matches:", error));
}

// Initialize the match page by setting up match controls and loading team information
function initMatchPage() {
  setupMatchControls();
  loadTeamInfo();
}

// Set up the controls for managing the match (start, pause, end)
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

      const matchId = localStorage.getItem("matchId");
      const matchData = {
        team1: {
          name: document.getElementById("team1-name").textContent,
          goals: parseInt(document.getElementById("team1-goals").textContent),
          yellowCards: parseInt(document.getElementById("team1-yellow-cards").textContent),
          fouls: parseInt(document.getElementById("team1-fouls").textContent),
        },
        team2: {
          name: document.getElementById("team2-name").textContent,
          goals: parseInt(document.getElementById("team2-goals").textContent),
          yellowCards: parseInt(document.getElementById("team2-yellow-cards").textContent),
          fouls: parseInt(document.getElementById("team2-fouls").textContent),
        },
        matchDuration: formatTime(matchSeconds),
      };

      updateMatch(matchId, matchData, () => {
        console.log("Match data updated");
        localStorage.removeItem("matchId");
        window.location.href = "index.html";
      });
    }
  });
}

// Updates the match by sending the match data to the server
function updateMatch(id, data, callback) {
  fetch(`http://localhost:8080/api/matches/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((match) => {
      console.log("Match updated");
      callback(match);
    })
    .catch((error) => console.error("Error updating match:", error));
}

// Load team information from localStorage and sets up button controls
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

// Increment the specified statistic for the given team
function incrementStat(team, stat) {
  const statCountElement = document.getElementById(`${team}-${stat}`);
  let currentCount = parseInt(statCountElement.textContent, 10);
  statCountElement.textContent = ++currentCount;
}

// Utils

// Formats the given time in seconds to a MM:SS string
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

// Read an image file and converts it to a base64 string
function readImage(file, callback) {
  const reader = new FileReader();
  reader.onload = function (e) {
    callback(e.target.result);
  };
  reader.readAsDataURL(file);
}
