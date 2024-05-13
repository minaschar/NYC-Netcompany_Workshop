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
      const team1LogoFile = document.getElementById("team1-logo").files[0];
      const team2LogoFile = document.getElementById("team2-logo").files[0];

      readImage(team1LogoFile, (team1LogoUrl, team1LogoName) => {
        readImage(team2LogoFile, (team2LogoUrl, team2LogoName) => {
          const matchInitializationData = {
            teamHomeName: team1Name,
            teamHomeLogo: team1LogoName,
            teamHomeGoals: 0,
            teamHomeYCards: 0,
            teamHomeFouls: 0,
            teamAwayName: team2Name,
            teamAwayLogo: team2LogoName,
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
      });
    });
  }
  fetchPreviousMatches();
}

// Initializes the match by sending the match initialization data to the server
function initializeMatch(data, callback) {
  //Implement...
}

// Fetches and displays previous match data from the server
function fetchPreviousMatches() {
  //Implement...
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

  //Implement endButton listener...
}

// Updates the match by sending the match data to the server
function updateMatch(id, data, callback) {
  //Implement...
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

// -------------- Utils --------------

// Increment the specified statistic for the given team
function incrementStat(team, stat) {
  const statCountElement = document.getElementById(`${team}-${stat}`);
  let currentCount = parseInt(statCountElement.textContent, 10);
  statCountElement.textContent = ++currentCount;
}

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
    callback(e.target.result, file?.name);
  };
  reader.readAsDataURL(file);
}
