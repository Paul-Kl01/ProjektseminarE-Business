(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const wave = require("./Wave");

var initialEnemyx = 0;
var initialEnemyy = 60;
var dx = 2;
var dy = 2;
var waypoints = [];
var enemyList = [];
let frame = 0;
var wp1x = 800;
var wp1y = 60;
var wp2x = 800;
var wp2y = 200;
var wp3x = 200;
var wp3y = 200;
var wp4x = 200;
var wp4y = 500;
var wp1 = false;
var wp2 = false;
var wp3 = false;
var enemyColor = "red";
var enemyRadius = 10;

class enemy {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 10;
    this.color = "red";
    this.status = 1;
    this.speed = 5;
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
  }

  //update Funktion bewegt die Gegner in Abhängigkeit davon, welchen WP sie bereits erreicht haben.
  update() {
    if (wp1 == false) {
      this.x += this.speed;
    }
    if (wp1 == true && wp2 == false) {
      this.y += this.speed;
    }

    if (wp1 == true && wp === true && wp3 == false) {
      this.x -= this.speed;
    }

    if (wp1 == true && wp2 == true && wp3 == true) {
      this.y += this.speed;
    }
  }
  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.closePath();
  }
}
function drawEnemy() {
  enemyList.push(new enemy(0, 60));
  enemyList[1].this.draw();
}
function handleEnemy() {
  if (enemyList.length == 0) {
    this.drawEnemy;
  }

  for (let i = 0; i < enemyList.length; i++) {
    enemyList[i].update();
    enemyList[i].draw();

    //Check für jeden Gegner, ob er einen Wegpunkt erreicht hat.

    if (enemyList[i].x == wp1x && enemyList[i].y == wp1y) {
      wp1 = true;
    }
    if (enemyList[i].x == wp2x && enemyList[i].y == wp2y) {
      wp2 = true;
    }
    if (enemyList[i].x == wp3x && enemyList[i].y == wp3y) {
      wp3 = true;
    }

    // trigger Game Over wenn Gegner letzten Wegpunkt erreicht.
    //Koordinaten Hard coded für Prototyp
    if (
      enemyList[i].x + enemyList[i].radius == 200 &&
      enemyList[i].x + enemyList[i].radius == 500
    ) {
      GameOver;
    }

    // Konstant neue Gegner erzeugen
    if (frame % 100 === 0) {
      enemyList.push(new enemy(0, 60));
    }

    //Kollisionsprüfung von Gegner mit Partikel Platzhalter
    if (this.detectCollision == true) {
      enemyList[i].status = 0; //
      //enemyList health - x
      //hier würde Schaden übergeben
    }

    //Gegner aus dem Arraay löschen 'töten'
    if (enemyList[i].status == 0) {
      enemyList.splice(i, 1);
      i--;
    }
  }
}

//Redirect zur Gameover Site
//Alternative: bool variable die den animation Aufruf stoppt.
function GameOver() {
  window.location.replace(gameover.html);
  clearInterval(interval);
}

module.exports = enemy;

},{"./Wave":5}],2:[function(require,module,exports){
class entities {
  constructor() {
    this.enemyList = [];
    this.towerList = [];
    this.enemyCounter = 0;
    this.towerCounter = 0;
  }

  draw() {
    //von jeden Enemy/Tower wird die Draw() Funktion aufgerufen
    for (let i = 0; i < this.enemyList.length; i++) this.enemyList[i].draw();
    for (let j = 0; j < this.towerList.length; j++) this.towerList[j].draw();
  }

  update() {
    //von jeden Enemy/Tower wird die Update() Funktion aufgerufen
    for (let i = 0; i < this.enemyList.length; i++) this.enemyList[i].update();
    for (let j = 0; j < this.towerList.length; j++) this.towerList[j].update();
  }

  create(x, y, radius, color, type) {
    //type zur Fallunterscheidung welche Art von Entität; 0 Enemy, 1 Tower
    var id;
    switch (type) {
      case "0":
        id: ++this.enemyCounter;
        break;

      case "1":
        id: ++this.towerCounter;
    }

    //Entity Typ erstellen
    var entity = {
      id: id,
      type: type,
      x: x,
      y: y,
      r: r,
      color: color,
      draw: function () {
        game.drawCircle(this.x, this.y, this.radius, this.color);
      },
      update: function () {},
    };

    //Entity zur entsprechenden Liste hinzufügen
    switch (type) {
      case "0":
        this.enemyList[entity.id] = entity;
        break;

      case "1":
        this.towerList[entity.id] = entity;
    }
  }

  detectCollision(x1, y1, r1, x2, y2, r2) {
    //wenn der abstand zw. den beiden Mittelpunkten
    //kleiner/gleich die Summer der beiden Radien -> return true

    var distance = Helper.detectDistance(x1, y1, x2, y2);
    if (distance <= r1 + r2) {
      return true;
    }
    return false;
  }

  //detectCollision(entity1, entity2){
  //    var a = entity1.radius + entity2.radius;
  //    var distance = Helper.detectDistance(entity1.x, entity1.y, entity2.x, entity2.y);
  //    if (distance <= a){
  //        return true;
  //    }
  //    return false;
  //}
}

module.exports = entities;

},{}],3:[function(require,module,exports){
class events {
  constructor(canvas, context) {
    this.canvas = canvas;
    this.context = context;
  }

  getMousePosition = () => {
    canvas.addEventListener("mousemove", function (e) {
      console.log("Test");
      var cRect = canvas.getBoundingClientRect(); // Gets CSS pos, and width/height
      var canvasX = Math.round(e.clientX - cRect.left); // Subtract the 'left' of the canvas
      var canvasY = Math.round(e.clientY - cRect.top); // from the X/Y positions to make
      ctx.clearRect(0, 0, canvas.width, canvas.height); // (0,0) the top left of the canvas
      ctx.fillText("X: " + canvasX + ", Y: " + canvasY, 10, 20);
      console.log(canvasX, canvasY);
    });
  };
}

module.exports = events;

},{}],4:[function(require,module,exports){
/*
 * Spielflaeche erzeugen
 * @author Paul
 *
 */

class map {
  constructor(
    roadColor,
    mapBackground,
    waypoints,
    startingPoint,
    canvas,
    context
  ) {
    this.waypoints = waypoints;
    this.mapBackground = mapBackground;
    this.roadColor = roadColor;
    this.startingPoint = startingPoint;
    this.canvas = canvas;
    this.context = context;
    //this.initalEnemyPos = {x,y}; // Einfügen aus Enemy
  }

  // Weg auf Canvas zeichnen
  draw = () => {
    // Canvas definieren
    var canvas = this.canvas;
    var ctx = this.context;
    ctx.beginPath();
    ctx.strokeStyle = this.roadColor;

    // Canvas Background
    ctx.fillStyle = this.mapBackground;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Koordinaten Weg
    let x;
    let y;

    // Startpunkt Path definieren
    ctx.moveTo(this.startingPoint[0], this.startingPoint[1]);

    // Path zeichnen
    for (let i = 0; i < this.waypoints.length; i++) {
      x = this.waypoints[i][0];
      y = this.waypoints[i][1];
      ctx.lineTo(x, y);
    }
    ctx.lineWidth = 50;
    ctx.stroke();
  };
}

// Klasse Exportieren
module.exports = map;

},{}],5:[function(require,module,exports){
// import Entities from './Enitites.js'
// import Map from './Map.js'

const entities = require('./Entities')
const map = require('./Map')
var map_ = new map();
var entities_ = new entities();

class wave {
    constructor() {
        this.currentWave = 1
        this.amountOfEnemies = 5
        this.enemySpwanCooldown = 1
        this.enemyStartPos = map_.initalEnemyPos//Muss Map-spezifisch sein, also aus der Klasse Map zu entnehmen
    }

    update(){ //Update um Klassenvariablen anzupassen
        if(this.amountOfEnemies > 0) {
            this.initialiseEnemies
        }
        //this.currentWave++
        //EnemyAnzahl erhöhen...
        //Später noch Stärke der Enemies anpassen...
    }

    initialiseEnemies() {
    //ruft create-method der Klasse Entities auf, um Enemies zu erzeugen
        if(this.enemySpwanCooldown > 0) {
            this.enemySpwanCooldown--
        }
        else{
            entities_.create('Enemy') //(this.enemyStartPos) StartPosition der Enemies muss mitübergeben werden
            this.enemySpwanCooldown = 1
            this.amountOfEnemies--
        }
    }    
}

module.exports = wave;
},{"./Entities":2,"./Map":4}],6:[function(require,module,exports){
arguments[4][2][0].apply(exports,arguments)
},{"dup":2}],7:[function(require,module,exports){
// Import der Klassen via Node.js
const map = require("./map");
const turret = require("./turret");
const entitites = require("./entities");
const events = require("./Events");
const enemy = require("./Enemy");

// Instanzen erstellen
var entities_ = new entitites();
var events_ = new events();
var enemy_ = new enemy();

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
    this.event.getMousePosition();
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

},{"./Enemy":1,"./Events":3,"./entities":6,"./map":8,"./turret":9}],8:[function(require,module,exports){
arguments[4][4][0].apply(exports,arguments)
},{"dup":4}],9:[function(require,module,exports){
// import Particle from './Particle';
// import Entities from './Entities';
// import Game from "./game";
class tower {

    constructor(x, y, type = 0) {
        this.radius = 25; // Größe des Turmkreises
        //towerId; // woher?
        this.color = '#1E90FF'; // Blau = gut ^^
        this.x = x; 
        this.y = y;
        this.type = type; 
        this.cooldown = 20; //20 = 1 Sekunde, dann durch Updates herabsetzbar
        this.cooldownLeft = 0;
        this.canvas = document.getElementById("canvas");
        this.ctx = this.canvas.getContext('2d');

        // Fallentscheidung welchen Type der Turm hat
        if (type == 0) { 
            // Standardturm
            this.damage = 1;
            this.price = 10;
            this.speed = 10;
            this.range = 10;
        } 
    }

    shoot = (amount) => {
        // Anzahl von Partikeln wird erzeugt mit Tower Koordinaten
        if (this.isFireReady() == true) {
            for (var i = 1; i <= amount; i++) {
                var particle = new Particle.create(this.x, this.y); // schauen ob Create zu Particle passt
            }
            this.cooldownLeft = this.cooldown; //Cooldown wieder hochgesetzt
        } 
    }

    /* Update z.B. ob er schon wieder schießbereit ist
    update() {
        // Cooldown Update bsp
    }
    */

    draw = () => {
        this.drawCircle(this.x, this.y, this.radius, this.color);
    }
    drawCircle = (x, y, radius, color) => {
        this.ctx.beginPath();
    
        //Kreis zeichnen
        this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
        //Kreis ausmalen
        this.ctx.fillStyle = color;
        this.ctx.fill();
      }

    isFireReady() {
        if (this.cooldownLeft == 0) {
            return true;
        } else {
            return false;
        }
    }
}
module.exports = tower;
},{}]},{},[7]);
