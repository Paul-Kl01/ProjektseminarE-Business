(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const wave = require("./Wave");

var initialEnemyx = 0;
var initialEnemyy = 60;
var dx = 2;
var dy = 2;
var waypoints = [];
var enemyList = [];
let frame = 0;
var enemyColor = "red";
var enemyRadius = 10;

class enemy {
  constructor(canvas, ctx, waypoints, startingPoint) {
    this.radius = 10;
    this.color = "red";
    this.status = 1;
    this.speed = 1;
    this.canvas = canvas;
    this.ctx = ctx;
    this.waypoints = waypoints;
    this.startingPoint = startingPoint;
    this.wp1 = false;
    this.wp2 = false;
    this.wp3 = false;

    this.x = this.startingPoint[0];
    this.y = this.startingPoint[1];

    this.wp1x = this.waypoints[0][0];
    this.wp1y = this.waypoints[0][1];
    this.wp2x = this.waypoints[1][0];
    this.wp2y = this.waypoints[1][1];
    this.wp3x = this.waypoints[2][0];
    this.wp3y = this.waypoints[2][1];
    this.wp4x = this.waypoints[3][0];
    this.wp4y = this.waypoints[3][1];
  }

  //update Funktion bewegt die Gegner in Abhängigkeit davon, welchen WP sie bereits erreicht haben.
  update() {
    if (this.wp1 == false) {
      this.x += this.speed;
    }
    if (this.wp1 == true && this.wp2 == false) {
      this.y += this.speed;
    }

    if (this.wp1 == true && this.wp2 === true && this.wp3 == false) {
      this.x -= this.speed;
    }

    if (this.wp1 == true && this.wp2 == true && this.wp3 == true) {
      this.y += this.speed;
    }
  }

  draw() {
    // Enemy zeichnen
    this.ctx.beginPath();
    this.ctx.fillStyle = this.color;
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    this.ctx.fill();
    this.ctx.closePath();
  }

  // Logik
  handleEnemy() {
    // console.log("handle", enemyList);
    // if (enemyList.length == 0) {
    //   this.drawEnemy;
    // }

      this.update();
      // this.draw();

      //Check für jeden Gegner, ob er einen Wegpunkt erreicht hat.

      if (this.x == this.wp1x && this.y == this.wp1y) {
        this.wp1 = true;
      }
      if (this.x == this.wp2x && this.y == this.wp2y) {
        this.wp2 = true;
      }
      if (this.x == this.wp3x && this.y == this.wp3y) {
        this.wp3 = true;
      }

      // trigger Game Over wenn Gegner letzten Wegpunkt erreicht.
      //Koordinaten Hard coded für Prototyp
      if (
        this.x + this.radius == 200 &&
        this.x + this.radius == 500
      ) {
        GameOver;
      }

      // Konstant neue Gegner erzeugen
      // if (frame % 100 === 0) {
      //   enemyList.push(new enemy(0, 60));
      // }

      //Kollisionsprüfung von Gegner mit Partikel Platzhalter
      // if (this.detectCollision == true) {
      //   this.status = 0; //
      //   //enemyList health - x
      //   //hier würde Schaden übergeben
      // }

      // //Gegner aus dem Arraay löschen 'töten'
      // if (this.status == 0) {
      //   enemyList.splice(i, 1);
      //   i--;
      // }
    
  }
}

// Ersten Enemy erstellen
function drawEnemy() {
  enemyList.push(new enemy(0, 60));
  enemyList[1].this.draw();
}

//Redirect zur Gameover Site
//Alternative: bool variable die den animation Aufruf stoppt.
function GameOver() {
  window.location.replace(gameover.html);
  clearInterval(interval);
}

module.exports = enemy;

},{"./Wave":4}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){

class Helper{


  //constructor(canvas,ctx ){
    //this.canvas = canvas; 
    //this.ctx = ctx;
  //}
  //constructor(){
    //this.canvas = document.getElementById("canvas");
    //this.ctx = this.canvas.getContext("2d");
  //}


//detectDistance(x1,y1,x2,y2){    
static detectDistance(x1,y1,x2,y2){

    //Abstand zwischen zwei Punkten d = Wurzel( (x1-x2)^2 + (y1-y2)^2 )
    var a = x1-x2; 
    var b = y1-y2; 
    return Math.sqrt(a*a + b*b);
}

//detectCollision(x1,y1,r1,x2,y2,r2){
static detectCollision(x1,y1,r1,x2,y2,r2){
  //wenn der abstand zw. den beiden Mittelpunkten
  //kleiner/gleich die Summer der beiden Radien -> return true

      var distance = Helper.detectDistance(x1, y1, x2, y2); 
      if (distance <= (r1+r2)){
          return true; 
      }
      return false; 
  }


static drawCircle(x, y, radius, color) {
    //Kreis zeichnen für Anzeige Reichweite/GameObjects
    //mit Koordinaten x,y ; Radius;  Farbe

    //jedes Mal Holen Canavas, ctx oder im Konstruktor übergeben
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");

    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(x, y, radius, 0,  2 * Math.PI, false);
    ctx.fill();
    ctx.closePath(); 
  }

  //drawCircle = (x, y, radius, color) => {
    //this.ctx.beginPath();
    //this.ctx.fillStyle = color;
    //this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
    //this.ctx.fill();
    //this.ctx.closePath(); 
  //}

}
module.exports = Helper; 
},{}],4:[function(require,module,exports){
/*
 * Verwaltung der Waves im Spiel
 * @author Nicole
 *
 */

//Imports und Instanzerzeugung

class wave { //Referenz auf Entitiesinstanz von Game übergeben
    constructor(entities, startingPoint, canvas, ctx, waypoints) {
        this.entities = entities //Sicherstellen, dass Game und Wave die selbe Instanz von Entities nutzen
        this.currentWave = 1 //Akt. Wave in-game
        this.amountOfEnemies = 5 //Initalwert für Enemyanzahl
        this.enemySpwanCooldown = 1 //Damit Enemies nicht alle direkt ohne Abstand hintereinnander spwanen
        this.enemyStartPos = startingPoint //Muss Map-spezifisch sein, also aus der Klasse Map zu entnehmen
        this.isStarting = false //Boolean um zu markieren, wann neue Wave startet
        this.canvas = canvas
        this.ctx = ctx
        this.waypoints = waypoints
    }

    update(){ //Update um Klassenvariablen anzupassen
        if(this.amountOfEnemies > 0) { //Solange amount > 0, Enemies erstellen lassen
            this.initialiseEnemies()
        }
        //Neue Wave muss getriggert werden, irgendwie über Game und dem Ablauf des Timers bis zur nächsten Welle
        if(this.isStarting) {
            this.nextWave()
        }
    }

    initialiseEnemies() {
    //ruft create-method der Klasse Entities auf, um Enemies zu erzeugen
        if(this.enemySpwanCooldown > 0) {
            this.enemySpwanCooldown--
        }
        else{
            this.entities.create(this.canvas, this.ctx, this.waypoints, this.enemyStartPos, 0); //(this.enemyStartPos) StartPosition der Enemies muss mitübergeben werden
            //Neuen Cooldown random setzten
            this.enemySpwanCooldown = this.getRndInteger(10,30)
            this.amountOfEnemies--
        }
    }
    
    nextWave() { //Klassenvariablen für die nächste Wave vorbereiten
        this.currentWave++
        //EnemyAnzahl exponentiell erhöhen...
        this.amountOfEnemies = this.getRndInteger(5, 5 * Math.exp(this.currentWave))
        this.enemySpwanCooldown = this.getRndInteger(10,30)

        this.update()
        //Später noch Stärke der Enemies anpassen...
    }

    //Markierung, dass nächste Wave starten soll
    //muss getriggert werden, irgendwie über Game und dem Ablauf des Timers bis zur nächsten Welle
    triggerNextWave() {
        this.isStarting = true
    }

    //Random Zahl für bestimmtes Intervall generieren (min & max sind im Intervall inklusive)
    getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1) ) + min;
    }
}

module.exports = wave;
},{}],5:[function(require,module,exports){
// const Tower = require('./Tower');
const Enemy = require('./Enemy');
const Helper = require('./Helper');
var helpers = new Helper();

class Entities {
  constructor() {
    this.enemyList = [];
    this.towerList = [];
    this.enemyCounter = 0;
    this.towerCounter = 0;
  }

  clear_enemyList = () => {
    this.enemyList = [];
    this.enemyCounter = 0;
  };

  draw = () => {
    //von jeden Enemy/Tower wird die Draw() Funktion aufgerufen
    for (let i = 0; i < this.enemyList.length; i++) this.enemyList[i].draw();
    for (let j = 0; j < this.towerList.length; j++) this.towerList[j].draw();
  };

  update = () => {
    //this.detect_enemy();
    // this.detect_first_enemy();
    
    //von jeden Enemy/Tower wird die Update() Funktion aufgerufen
    for (let i = 0; i < this.enemyList.length; i++) this.enemyList[i].handleEnemy();
    // for (let j = 0; j < this.towerList.length; j++) this.towerList[j].update();
  };

  create = (canvas, ctx, waypoints, startingPoint, objecttype) => {
    //objecttype zur Fallunterscheidung welche Art von Entität; 0 Enemy, 1 Tower 2 Particle
    var id;

    //Entity erzeugen und zur entsprechenden Liste hinzufügen
    switch (objecttype) {
      case 0:
        var enemy = new Enemy(canvas, ctx, waypoints, startingPoint);
        id = this.enemyCounter++;
        this.enemyList[id] = enemy;
        console.log(this.enemyList);
        break;

      case "1":
        // var tower = new Tower(x, y, r, colour);
        // id = this.towerCounter++;
        this.towerList[id] = tower;
    }
  };

  //toDo: wie heißt KlassenVar bei Enemy für zurück gelegten Weg (hier: weg)
  // Weiterleitung des vom Tower abzuschließenden Enemy: über tower.shoot(enemy)
  detect_enemy() {
    //leitet den Enemy, der in Towerrange ist und am meisten Weg zurück gelegt hat, an den entsp. schussbereiten Tower weiter

    for (let j = 0; j < this.towerList.length; j++) {
      //Tower schussbereit?
      if (this.towerList[i].cooldownleft !== 0) continue;
      let last_enemy;

      for (let i = 0; i < this.enemyList.length; i++) {
        //Enmie schon tot?
        if ((this.enemyList[j].dead = true)) continue;
        //Enemie schon anvisiert und dadurch tot?
        if (this.enemyList[j].futureDamage >= this.enemyList[j].remainingLife)
          continue;
        //Enemie in Tower Range?
        var bool = helpers.detectCollision(
          this.towerList[j].x,
          this.towerList[j].y,
          this.towerList[j].range,
          this.enemyList[i].x,
          this.enemyList[i].y,
          this.enemyList[i].radius
        );

        if ((bool = true)) {
          //wenn erster der in Reichweite-> als Vergleichswert(last_enemie) zw.speichern
          if (last_enemy === undefined) {
            last_enemy = this.enemyList[i];
          }
        }
        //sonst Abgleich ob zurück gelegter Weg des aktuellen Enemy größer als bei Vergleichs-Enemie;
        else {
          if (this.enemyList[i].weg > last_enemy.weg) {
            last_enemy = this.enemyList[i];
          }
        }
      }
      //wenn last_enemy initialisiert-> Weiterleiten an Tower
      if (last_enemy !== undefined) {
        this.towerList[j].shoot(last_enemy);
      }
    }
  }

  detect_first_enemy() {
    //einfache detect_enemy zum Testen, schießt ersten gefundenen Enemy in Range ab
    for (let j = 0; j < this.towerList.length; j++) {
      //Tower schussbereit?
      if (this.towerList[i].cooldownleft !== 0) continue;

      for (let i = 0; i < this.enemyList.length; i++) {
        //Enmie schon tot?
        if ((this.enemyList[j].dead = true)) continue;
        //Enemie schon anvisiert und dadurch tot?
        if (this.enemyList[j].futureDamage >= this.enemyList[j].remainingLife)
          continue;
        //Enemie in Tower Range?
        var bool = helpers.detectCollision(
          this.towerList[j].x,
          this.towerList[j].y,
          this.towerList[j].range,
          this.enemyList[i].x,
          this.enemyList[i].y,
          this.enemyList[i].radius
        );

        if ((bool = true)) {
          this.towerList[j].shoot(this.enemyList[j]);
          //Weiter Prüfen mit nächstem Tower
          break;
        }
      }
    }
  }
}

module.exports = Entities;

},{"./Enemy":1,"./Helper":3}],6:[function(require,module,exports){
// Import der Klassen via Node.js
const map = require("./map");
const turret = require("./turret");
const entitites = require("./entities");
const events = require("./Events");
const enemy = require("./Enemy");
const wave = require("./Wave");

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

    this.wave = new wave(entities_,this.startingPoint, this.canvas, this.ctx, this.waypoints);
    this.wave.initialiseEnemies();
    // entities_.create(this.canvas, this.ctx, this.waypoints, this.startingPoint, 0);
    

    // this.enemyList = [];
    // this.enemy = new enemy(
    //   this.canvas,
    //   this.ctx,
    //   this.waypoints,
    //   this.startingPoint
    // );
    // console.log(enemy);

    // this.enemyList.push(this.enemy);
    // console.log(this.enemyList);

    // Turm erstellen
    this.turret = new turret(100, 100);
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
    entities_.draw();
    entities_.update();
    this.wave.update();
    this.turret.draw();
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

},{"./Enemy":1,"./Events":2,"./Wave":4,"./entities":5,"./map":7,"./turret":8}],7:[function(require,module,exports){
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

},{}],8:[function(require,module,exports){
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
},{}]},{},[6]);
