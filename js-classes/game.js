// Import der Klassen via Node.js
const map = require("./map");
const turret = require("./turret");
const entitites = require("./entities");
const events = require("./Events");
const enemy = require("./Enemy");

// Instanzen erstellen
var entities_ = new entitites();
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

    // Wegpunkte im Konstruktor übergeben?

    this.waveCounter = 0;
    // DrawList enthält alle Elemente die gezeichnet werden sollen
    this.drawList = [];
    this.towerCount = entities_.towerCounter;
    this.enemyCount = entities_.enemyCounter;

    // Zukunft
    this.timer;
    this.mode = 0;
    this.score = 0;
    this.remainingLifes;
    this.ressources = 0;

    // Event erstellen
    // this.event = new events(this.canvas, this.ctx);

    // Map Variablen
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

    //
    //
    // Enemys erstellen
    //
    //

    this.enemyList = [];
    this.enemy = new enemy(60, 60, this.canvas, this.ctx);
    console.log(enemy);

    this.enemyList.push(this.enemy);
    console.log(this.enemyList);

    // Turm erstellen
    this.turret = new turret(50, 50);
  }

  init = () => {
    setInterval(this.draw(), 1000 / 30);

    //Leben im Prototyp auf 1;
    this.remainigLifes = 1;
    this.draw();
  };

  draw = () => {
    window.requestAnimationFrame(this.draw);
    // Clear Canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Game.restartGame();
    // Aufruf der Draw Methoden der Anderen Klassen? Eventuell drawList?
    // for (i = 0, i <= Anzahl Klassen; i++) ...
    this.map.draw();
    this.turret.draw();
    this.enemy.draw();
    this.enemy.handleEnemy(this.enemyList);
  };

  update() {
    //Unklar, ruft eventull update() der anderen Klassen auf.
    /* In beispiel wurden die Aufrufe der Methoden über eine List geregelt, welche über einen
            Trigger vervollstäändigt wurden */
  }

  // Check ob Turm gebaut ist und ob das Spiel schon läuft
  startGame = () => {
    if (this.towerCount == 0 && this.waveCounter == 0) {
      this.init();
    } else {
      alert("Spiel läuft schon.");
      // Build Tower
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
    this.init();

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

// Map beim Laden der Seite einzeichnen
window.onload = g.map.draw;
