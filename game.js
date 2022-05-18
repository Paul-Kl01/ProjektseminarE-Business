/* Einige Methoden sind eher als Pseudocode zu verstehen
 *  Zur exakten Implementierung ist es für die Game-Classe nötig die anderen Klassen im Detail zu kennen
 *  Es gibt bei mir noch einige Unklarheiten bzgl. manacher Methoden, bzw. derer Realisierung.
 *  Kriegen wir schon gelöst xD
 */

// import Entities from "/.Entities";
// import alle klassen
 import Map from "./Map.js";
class Game {
  constructor() {
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.waveCounter = 0;
    // DrawList enthält alle Elemente die gezeichnet werden sollen
    this.drawList = [];

    //Zukunft
    this.timer;
    this.mode = 0;
    this.score = 0;
    this.remainingLifes = 0;
    this.ressources = 0;


    //Window erstellt globale Variable
    window.map = new Map("#F08080", "#eee", [
      [800, 60],
      [800, 200],
      [200, 200],
      [200, 500],
    ]);

    //Müssen Create() funktionen der anderen Klasse hier mittles this.--- = new ... aufgerufen werden?
  }

  init() {
    // Aufruf der draw() Methoden der anderen Klassen
    setInterval(Game.draw(), 1000 / 30);

    //Leben im Prototyp auf 1;
    this.remainigLifes = 1;

    this.draw();
  }

  drawCircle(x, y, radius, color) {
    Game.ctx.beginPath();

    //Kreis zeichnen
    Game.ctx.arc(x, y, r, 0, 2 * Math.PI);
    //Kreis ausmalen
    Game.ctx.fillStyle = color;
    Game.ctx.fill();
  }

  draw() {
    // window.requestAnimationFrame(draw())

    // Clear Canvas
    // Game.ctx.clearRect(0, 0, Game.canvas.width, game.canvas.height);

    // Game.restartGame();
    // Aufruf der Draw Methoden der Anderen Klassen? Eventuell drawList?
    // for (i = 0, i <= Anzahl Klassen; i++) ...
    map.draw();
  }

  update() {
    //Unklar, ruft eventull update() der anderen Klassen auf.
    /* In beispiel wurden die Aufrufe der Methoden über eine List geregelt, welche über einen
            Trigger vervollstäändigt wurden */
  }

  // startet spiel -- brauch es die Methode wirklich?
  startGame() {
    if (Entities.Liste.length == 0) Game.initialise();
  }

  // alle Werte 0 setzen, entities löschen
  // Würde restartMethode in reset umbenennen.
  restartGame() {
    // Reset Score, WaveCounter, Ressources, timer
    this.score = 0;
    this.waveCounter = 0;
    this.ressources = 0;
    //this.timer = reset -- muss noch implementiert werden

    // Entities liste = 0;
  }

  drawOverlay() {
    /* Methode obselet wenn Aufrufe über HTML 'buttonOnClick' plus CSS realisiert ist */
  }

  pauseGame() {
    /* Timer stoppen, Waves "anhalten"
        at the Moment keine Ahnung wie das implementiert werden soll */
  }

  gameOver() {
    if (this.remainigLifes == 0) {
      //reset Game
    }
  }
}

 window.g = new Game();
//Map aufbauen
