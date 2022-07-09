// Import der Klassen via Node.js
const map = require("./map");
const entitites = require("./entities");
const events = require("./Events");
const wave = require("./Wave");

/*
 * Bündeln der Klassen
 * @author Constantin
 *
 */

class game {
  constructor() {
    // Canvas erstellen
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");

    /* Initalisierung der Variablen:
     */
    // Läuft das Spiel?
    this.gameRunning = false;
    // Counter für init-Funktion, da sonst Animation-Loop entsteht
    this.initCounter = 0;
    // Life Counter
    this.remainingLifes = 3;
    // Drop Tower Mode, damit um Mauszeiger gezeichnet werden kann.
    this.dropTowerMode = false;
    // Wenn der Start Game Button gedrückt wurde ändert sich die Flag
    this.startGamePressed = false;
    // Tower Typ
    this.towerType = 0;
    // Pause-Flag
    this.pause = false;
    // Map-Typ (0 = default)
    this.mapType = 0;
    this.map;
    /* ---------------------------------------------------- */

    // Event Instanz zum Maus-Handling
    this.events_ = new events(this.canvas, this.ctx);

    // Eigenschaften eines Turmes
    this.towerSettings = [
      [30, 15, "#1E90FF", 100, 80, 1, 1.4],
      [85, 15, "#00bb2d", 150, 150, 4, 1.6],
      // Price, Radius, Color, Range, Cooldown, Damage, Speed
    ];

    // MapTyp unterscheidung, falls Schwer, sonst default
  }

  init = () => {
    this.gameRunnning = true;
    this.entities_.nextWave(this.wave.amountOfEnemies);
    if (this.initCounter == 0) this.draw();
    this.initCounter = 1;
  };

  // Create Map zur Unterscheidung der Map Typen
  createMap = (mapType) => {
    if (mapType == 1) {
      this.mapType = 1;
      this.waypoints = [
        [300, 60],
        [300, 200],
        [200, 200],
        [200, 320],
        [440, 320],
        [440, 100],
        [700, 100],
        [700, 400],
        [900, 400],
        [900, 500],
      ];
      // Map StartingPoints
      this.startingPoint = [0, 60];
    } else {
      // Map Waypoints
      this.waypoints = [
        [800, 60],
        [800, 200],
        [200, 200],
        [200, 500],
      ];

      // Map StartingPoints
      this.startingPoint = [0, 60];
    }
    // Map erstellen
    this.map = new map(
      "#F08080",
      "#eee",
      this.waypoints,
      this.startingPoint,
      this.canvas,
      this.ctx
    );
    this.map.draw();

    // Konstruktor von Entities kann erst aufgerufen werden, wenn die Map erstellt ist
    this.entities_ = new entitites(this.startingPoint, this.waypoints);
    this.wave = new wave(this.entities_, this.mapType);
    this.towerCount = this.entities_.towerCounter;
    this.enemyCount = this.entities_.enemyCounter;
    document.getElementById("coinCount").innerHTML = this.entities_.money;
    document.getElementById("lifeCount").innerHTML =
      this.remainingLifes - this.entities_.deaths;
    document.getElementById("wcount").innerHTML = this.wave.currentWave;
  };
  draw = () => {
    // Animation starten
    if (this.pause == false) {
      window.requestAnimationFrame(this.draw);

      // Clear Canvas
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      // Map zeichnen
      this.map.draw();

      /* EventListening für Maus-Interaktion: */
      this.drawTowerMouse();

      // Zeichen aller Entities
      this.entities_.draw();

      if (this.remainingLifes - this.entities_.deaths == 0) this.gameOver();

      // Solange nicht alle Gegner Tot sind und solange der StartButton gedrückt wurde
      if (this.entities_.win == false) {
        if (this.startGamePressed == true) {
          this.entities_.update();
          this.wave.update();
        }
      } else {
        this.remainingLifes -= this.entities_.deaths;
        this.wave.nextWave();
        this.entities_.nextWave(this.wave.amountOfEnemies);
      }

      // Anzeige von WaveCount und Coins
      document.getElementById("wcount").innerHTML = this.wave.currentWave;
      document.getElementById("coinCount").innerHTML = this.entities_.money;
      document.getElementById("lifeCount").innerHTML =
        this.remainingLifes - this.entities_.deaths;
    }
  };

  /* EventListening für Maus-Interaktion:
      Wenn der DropTowerMode True ist, dann wird ein Kreis um den Mauszeiger im Bereich des Canvas gezeichnet
      Wenn dann geklickt wird, dann wird ein Turm an dieser Stelle gebaut und der EventListener bricht ab.
     */
  drawTowerMouse = () => {
    if (this.dropTowerMode) {
      this.canvas.addEventListener("mousemove", this.events_.onmove);
      this.canvas.addEventListener("click", this.events_.onclick);
      if (
        this.entities_.validatePosition(
          this.events_.mouse.x,
          this.events_.mouse.y,
          this.towerSettings[this.towerType][1]
        ) == false || 
        this.entities_.money < this.towerSettings[this.towerType][0] || this.entities_.towerList.length >= this.wave.currentWave
      ) {
        this.entities_.drawCircle(
          this.events_.mouse.x,
          this.events_.mouse.y,
          this.towerSettings[this.towerType][1],
          "#000000"
        );
        this.entities_.drawCircle(
          this.events_.mouse.x,
          this.events_.mouse.y,
          this.towerSettings[this.towerType][3],
          "rgba(30, 144, 255, 0.2)"
        );
      } else {
        this.entities_.drawCircle(
          this.events_.mouse.x,
          this.events_.mouse.y,
          this.towerSettings[this.towerType][1],
          this.towerSettings[this.towerType][2]
        );
        this.entities_.drawCircle(
          this.events_.mouse.x,
          this.events_.mouse.y,
          this.towerSettings[this.towerType][3],
          "rgba(30, 144, 255, 0.2)"
        );
      }
    }
    if (this.events_.mouse.clicked == true && this.dropTowerMode == true) {
      if (
        this.entities_.validatePosition(
          this.events_.mouse.x,
          this.events_.mouse.y,
          this.towerSettings[this.towerType][1]
        ) == true &&
        this.entities_.money >= this.towerSettings[this.towerType][0] && this.entities_.towerList.length < this.wave.currentWave
      ) {
        this.entities_.createTower(
          this.events_.mouse.x,
          this.events_.mouse.y,
          this.towerSettings[this.towerType]
        );
        this.events_.mouse.clicked = false;
        this.dropTowerMode = false;
        this.canvas.removeEventListener("click", this.events_.onclick);
      } else {
        this.canvas.removeEventListener("click", this.events_.onclick);
        this.events_.mouse.clicked = false;
      }
    }
  };

  // Check ob Turm gebaut ist und ob das Spiel schon läuft
  startGame = () => {
    if (this.entities_.towerList.length == 0) {
      confirm("Bau lieber zuerst einen Turm");
    } else if (this.startGamePressed == false) {
      this.startGamePressed = true;
      this.init();
    } else {
      alert("Spiel läuft");
    }
    // this.gameRunning = true;
  };

  // Lädt Seite neu
  restartGame = () => {
    location.reload();
  };

  pauseGame = () => {
    /* Timer stoppen, Waves "anhalten"
          at the Moment keine Ahnung wie das implementiert werden soll */
    this.pause = !this.pause;
    if (this.pause == false) this.draw();
    //  window.cancelAnimationFrame(this.draw);
  };

  gameOver = () => {
    // this.restartGame();
    this.pause = true;
    this.startGamePressed = false;
    alert(
      "Game Over: \n Du hast: " +
        this.wave.currentWave +
        " Welle(n) geschafft! \n Herzlichen Glückwunsch"
    );
    this.restartGame();
  };
}

// Neue Instanz des Spiels
const g = new game();

// Verankerung der Buttons mit den Funktionen
document
  .getElementById("btnStart")
  .addEventListener("click", g.startGame, false);
document
  .getElementById("btnReset")
  .addEventListener("click", g.pauseGame, false);

/* Tower Build */
// count nötig, da sonst init immer wieder beim Tower bauen aufgerufen wird.
var count = 0;
document.getElementById("d1").addEventListener("click", function () {
  g.dropTowerMode = true;
  if (count == 0) {
    g.init();
    count++;
  }
  g.towerType = 0;
  g.drawTowerMouse();

  //Escape aus Baumodus
  window.addEventListener("keydown", function (e) {
    if (e.key === "Escape") g.dropTowerMode = false;
  });
});

document.getElementById("d2").addEventListener("click", function () {
  g.dropTowerMode = true;
  if (count == 0) {
    g.init();
    count++;
  }
  g.towerType = 1;
  g.drawTowerMouse();

  // Escape out of Baumodus
  window.addEventListener("keydown", function (e) {
    if (e.key === "Escape") g.dropTowerMode = false;
  });
});

document.getElementById("mapAuswahl").addEventListener("click", function () {
  if (confirm("Soll die Map gewechselt werden?") == false) {
    return;
  } else {
    if (g.mapType == 0) {
      g.startGamePressed = false;
      g.mapType = 1;
      g.createMap(g.mapType);
      g.map.draw;
    } else {
      g.startGamePressed = false;
      g.mapType = 0;
      g.createMap(g.mapType);
      g.map.draw;
    }
  }
});

// Pop Up laden
// Map beim Laden der Seite einzeichnen
window.addEventListener("load", g.createMap(g.mapType));
window.addEventListener("load", openModal);

// Pop Up Rules
const modal = document.querySelector("#modal");
const modalBtn = document.querySelector("#btnModal");
const closeBtn = document.querySelector(".close");

modalBtn.addEventListener("click", openModal);
closeBtn.addEventListener("click", closeModal);
window.addEventListener("click", outsideClick);

function openModal() {
  modal.style.display = "block";
}

function closeModal() {
  modal.style.display = "none";
}

function outsideClick(e) {
  if (e.target == modal) {
    modal.style.display = "none";
  }
  if (e.target == buildTower) {
    buildTower.style.display = "none";
  } else {
    buildTower.style.display = "flex";
  }
}

// Button Dropdown
const buildTower = document.querySelector("#btnBuild");
const pause = document.querySelector("#btnStart");
const start = document.querySelector("#btnReset");
const d1 = document.querySelector("#d1");
const d2 = document.querySelector("#d2");

buildTower.addEventListener("click", toggle);

d1.addEventListener("click", close);
d2.addEventListener("click", close);

function close() {
  buildTower.style.display = "flex";
}

function toggle() {
  document.querySelector("#dropdown").classList.toggle("show");

  // Tower Button Farbe ändern
  if(g.entities_.money < g.towerSettings[0][0] || g.entities_.towerList.length >= g.wave.currentWave) {
      d1.style.background = "white";
      d2.style.background = "white";
      d1.style.color = "black";
      d2.style.color = "black";
  } else if (g.entities_.money >= g.towerSettings[0][0] && g.entities_.money < g.towerSettings[1][0] && g.entities_.towerList.length < g.wave.currentWave) {
    // Tower 1
    d1.style.background = "green";
    d1.style.color = "white";
    d2.style.background = "white";
    d2.style.color = "black";
  } else if (g.entities_.money >= g.towerSettings[1][0] && g.entities_.towerList.length < g.wave.currentWave) {
    // Tower 1 & 2 werden grün gefärbt
    d2.style.background = "green";
    d2.style.color = "white";
    d1.style.background = "green";
    d1.style.color = "white";
  } 
}

window.onclick = function (event) {
  if (!event.target.matches(".dropbtn")) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};
