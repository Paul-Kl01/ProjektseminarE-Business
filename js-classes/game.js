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

      this.events_ = new events(this.canvas, this.ctx);
      this.waveCounter = 0;
      // Läuft das Spiel?
      this.gameRunning = false;
      // Counter für init-Funktion, da sonst Animation-Loop entsteht
      this.initCounter = 0;

      // Zukunft
      this.timer;
      this.mode = 0;
      this.score = 0;
      this.remainingLifes;
      this.ressources = 20;


      // Drop Tower Mode, damit um Mauszeiger gezeichnet werden kann.
      this.dropTowerMode = false;
      // Wenn der Start Game Button gedrückt wurde ändert sich die Flag
      this.startGamePressed = false;


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

      this.entities_ = new entitites(this.startingPoint, this.waypoints);
      this.towerCount = this.entities_.towerCounter;
      this.enemyCount = this.entities_.enemyCounter;
   }

   init = () => {
      this.gameRunnning = true;
      this.wave = new wave(this.entities_, this.canvas, this.ctx);
      this.entities_.newWave(this.wave.amountOfEnemies);
      //Leben im Prototyp auf 1;
      if (this.initCounter == 0) this.draw();
      this.initCounter = 1;
      document.getElementById("wcount").innerHTML = this.waveCounter;
      this.wave.nextWave();
   };

   draw = () => {
      // Animation starten
      window.requestAnimationFrame(this.draw)
      // Clear Canvas
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      // Map zeichnen
      this.map.draw();

      /* EventListening für Maus-Interaktion: */
      this.drawTowerMouse();

      // Zeichen aller Entities
      this.entities_.draw();

      // Solange nicht alle Gegner Tot sind und solange der StartButton gedrückt wurde
      if (this.entities_.win == false) {
         if (this.startGamePressed == true) {
            this.entities_.update();
            this.wave.update();
         }
      }
      // Wave-Counter
   

   };

   /* EventListening für Maus-Interaktion:
      Wenn der DropTowerMode True ist, dann wird ein Kreis um den Mauszeiger im Bereich des Canvas gezeichnet
      Wenn dann geklickt wird, dann wird ein Turm an dieser Stelle gebaut und der EventListener bricht ab.
     */
   drawTowerMouse = () => {
      if (this.dropTowerMode) {
         this.canvas.addEventListener("mousemove", this.events_.onmove);
         this.canvas.addEventListener("click", this.events_.onclick);
         this.entities_.drawCircle(this.events_.mouse.x, this.events_.mouse.y, 15, "#1E90FF");
         this.entities_.drawCircle(this.events_.mouse.x, this.events_.mouse.y, 100, "rgba(30, 144, 255, 0.2)");
      }
      if (this.events_.mouse.clicked == true) {
         this.entities_.create_tower(this.events_.mouse.x, this.events_.mouse.y);
         this.events_.mouse.clicked = false;
         this.dropTowerMode = false
         this.canvas.removeEventListener("click", this.events_.onclick);
      }
   }

   // Check ob Turm gebaut ist und ob das Spiel schon läuft
   startGame = () => {
      if (this.entities_.towerList.length == 0) {
         confirm("Bau lieber zuerst einen Turm");
      } else if (this.gameRunning == true) {
         console.log("spiel läuft");
      } else {
         console.log("bin im startgameif");
         this.startGamePressed = true;
         this.waveCounter++;
         this.init();
         // this.gameRunning = true;
      }
   };

   // Lädt Seite neu
   restartGame = () => {
      location.reload();
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

/* Tower Build */
// count nötig, da sonst init immer wieder beim Tower bauen aufgerufen wird.
var count = 0;
document.getElementById("btnBuild").addEventListener("click", function() {
   g.dropTowerMode = true;
   if (count == 0) {
      g.init();
      count++;
   }
   g.drawTowerMouse();
   // g.entities_.create_tower(220,110);
   // g.entities_.draw();
});

// Map beim Laden der Seite einzeichnen
window.onload = g.map.draw;