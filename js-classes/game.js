// Import der Klassen via Node.js
const map = require("./map");
const entitites = require("./entities");
const events = require("./Events");
const wave = require("./Wave");

// Instanzen erstellen
var events_ = new events();

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

    this.waveCounter = 0;
    // DrawList enthält alle Elemente die gezeichnet werden sollen
    this.drawList = [];

    // Läuft das Spiel?
    this.gameRunning = false;

    // Zukunft
    this.timer;
    this.mode = 0;
    this.score = 0;
    this.remainingLifes;
    this.ressources = 0;
    

    // Event erstellen
    // this.event = new events(this.canvas, this.ctx);

    // Map Variablen
    console.log("hio");
    this.waypoints = [
      [800, 60],
      [800, 200],
      [200, 200],
      [200, 500],
    ];
    this.startingPoint = [0, 60];

    // Map erstellen
    this.map = new map(
      "#F08080",
      "#eee",
      this.waypoints,
      this.startingPoint,
      this.canvas,
      this.ctx
    );

    this.entities_ = new entitites(this.startingPoint, this.waypoints);
    this.towerCount = this.entities_.towerCounter;
    this.enemyCount = this.entities_.enemyCounter;

   
    //this.wave.initialiseEnemies();

    // Turm erstellen
    // this.entities_.create_tower(70, 100);
  }

  init = () => {
    this.wave = new wave(this.entities_);
    this.entities_.newWave(this.wave.amountOfEnemies); 
    
    //Leben im Prototyp auf 1;
    this.draw();
    this.gameRunnning = false;
  };

  draw = () => {
    window.requestAnimationFrame(this.draw);
    // Clear Canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Game.restartGame();
    // Aufruf der Draw Methoden der Anderen Klassen? Eventuell drawList?
    // for (i = 0, i <= Anzahl Klassen; i++) ...
    this.map.draw();
    if(this.entities_.win == false) {
      this.entities_.draw();
      this.entities_.update();
      this.wave.update();
    } else {
      return;
    }
    document.getElementById("wcount").innerHTML = this.waveCounter;
    // this.turret.draw();
    // this.enemy.draw();
    // this.enemy.handleEnemy(this.enemyList);
  };

  update() {
    //Unklar, ruft eventull update() der anderen Klassen auf.
    /* In beispiel wurden die Aufrufe der Methoden über eine List geregelt, welche über einen
            Trigger vervollstäändigt wurden */
  }

  // Check ob Turm gebaut ist und ob das Spiel schon läuft
  startGame = () => {
    if (this.entities_.towerList.length == 0) {
      confirm("Bau lieber zuerst einen Turm");
    } else if (this.gameRunning == true) {
      console.log("spiel läuft");
    } else {
      console.log("bin im startgameif");
      this.waveCounter++;
      this.init();
      // this.gameRunning = true;
    }
  };

  // alle Werte 0 setzen, entities löschen
  // Würde restartMethode in reset umbenennen.
  restartGame = () => {
    // Reset Score, WaveCounter, Ressources, timer
    this.score = 0;
    this.waveCounter = 0;
    this.ressources = 0;
    //this.timer = reset -- muss noch implementiert werden

    //Entities liste leeren
    location.reload();

    // Entities liste = 0;
  };

  pauseGame() {
    /* Timer stoppen, Waves "anhalten"
        at the Moment keine Ahnung wie das implementiert werden soll */
  }

  gameOver = () => {
    if (this.remainigLifes == 0) {
      this.restartGame();
      alert("Game Over");
    }
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
  .addEventListener("click", g.restartGame, false);
document.getElementById("btnBuild").addEventListener("click", function () {
  g.entities_.createTower(220,110);
  g.entities_.draw();
});

// Map beim Laden der Seite einzeichnen
window.onload = g.map.draw;
