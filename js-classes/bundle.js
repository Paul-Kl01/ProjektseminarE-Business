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
var enemyRadius = 1;

class enemy {
  constructor(canvas, ctx, waypoints, startingPoint) {
    this.radius = 5;
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
    this.dead = false;
    this.covereddistance = 0;
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
      this.covereddistance += this.speed;
    }
    if (this.wp1 == true && this.wp2 == false) {
      this.y += this.speed;
      this.covereddistance += this.speed;
    }

    if (this.wp1 == true && this.wp2 === true && this.wp3 == false) {
      this.x -= this.speed;
      this.covereddistance += this.speed;
    }

    if (this.wp1 == true && this.wp2 == true && this.wp3 == true) {
      this.y += this.speed;
      this.covereddistance += this.speed;
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
  hit(damage) {
    this.dead = true;
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

},{"./Wave":6}],2:[function(require,module,exports){
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
class Helper {
  //constructor(canvas,ctx ){
  //this.canvas = canvas;
  //this.ctx = ctx;
  //}
  //constructor(){
  //this.canvas = document.getElementById("canvas");
  //this.ctx = this.canvas.getContext("2d");
  //}

  //detectDistance(x1,y1,x2,y2){
  detectDistance(x1, y1, x2, y2) {
    //Abstand zwischen zwei Punkten d = Wurzel( (x1-x2)^2 + (y1-y2)^2 )
    var a = x1 - x2;
    var b = y1 - y2;
    return Math.sqrt(a * a + b * b);
  }

  //detectCollision(x1,y1,r1,x2,y2,r2){
  detectCollision(x1, y1, r1, x2, y2, r2) {
    //wenn der abstand zw. den beiden Mittelpunkten
    //kleiner/gleich die Summer der beiden Radien -> return true

    var distance = this.detectDistance(x1, y1, x2, y2);
    if (distance <= r1 + r2) {
      return true;
    }
    return false;
  }

  drawCircle(x, y, radius, color) {
    //Kreis zeichnen für Anzeige Reichweite/GameObjects
    //mit Koordinaten x,y ; Radius;  Farbe

    //jedes Mal Holen Canavas, ctx oder im Konstruktor übergeben
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");

    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
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
 * Partikelerzeugung zum Abschießen der Enemies
 * @author Nicole
 *
 */

//Imports und Instanzerzeugung
// const gameObject = require('./GameObject')
// const enemy = require("./Enemy");
const helper = require("./Helper");
var helpers_ = new helper();

class particle {
  //eigene Klassen-Referenz auf canvas & context, da auf Game kein Zugriff
  // canvas = document.getElementById("canvas");
  // ctx = this.canvas.getContext("2d");

  constructor(x, y, damage, closestEnemy) {
    //Über tower.js aufzurufen
    //eventuell Referenz auf Tower übergeben und daraus die Koordinaten ziehen, wegen dem Exportieren & Importieren von Klasse?
    this.enemy = closestEnemy; //wahrscheinlich unnötig?
    this.x = x; //Als Startposition Koordinaten des jeweiligen Turms
    this.y = y;
    this.velocity = { x: 0, y: 0 };
    this.color = "#483d8b";
    this.radius = 1;
    this.damage = damage; //Turmschaden
    this.flag = false;
  }

  update() {
    //Klassenvariablen updaten
    if (
      helpers_.detectCollision(
        this.x,
        this.y,
        this.radius,
        this.enemy.x,
        this.enemy.y,
        this.enemy.radius
      )
    ) {
      this.enemy.hit(this.damage); //Enemy bekommt Schaden übergeben
      this.flag = true;
      //Anschließend muss Partikel entfernt werden
    }
    this.draw();
    this.x = this.x + this.velocity.x; //Bewegung updaten
    this.y = this.y + this.velocity.y;
    //Geschwindigkeit, mit der sich Partikel bewegt evtl. erhöhen
    //Dafür Multiplikation mit Skalar
    this.calcPathToEnemy(); //Da Enemy sich bewegt, muss Bewegungsrichtung des Particles immer wieder angepasst werden
  }

  draw() {
    //Particle jeweils auf canvas zeichnen
    helpers_.drawCircle(this.x, this.y, this.radius, this.color);
  }

  //Partikel als "Laser" sorgt dafür, dass mein restlichen Code direkt vollkommen unnötig wird,
  //man bräuchte nur noch diese eine Methode & Konstruktor
  // pathToEnemy = () => {
  //     //Partikel als "Laser" implementieren
  //     this.ctx.save()
  //     this.ctx.beginPath()
  //     this.ctx.strokeStyle = 'white';
  // 	this.ctx.lineWidth = 1;
  //     this.ctx.moveTo(this.x, this.y);
  // 	this.ctx.lineTo(this.enemy.x, this.enemy.y);
  // 	this.ctx.stroke();
  // 	this.ctx.restore();
  //     this.update;
  // }

  /*Enemies bewegen sich, Path zum Enemy muss immer wieder aktualisiert werden
   *Bis Enemy getroffen wurde vom Particle
   */
  calcPathToEnemy() {
    //Müsste im Rahmen der TowerKlasse nach Konsturktor-Aufruf des Particles einmal initial aufgerufen werden
    const angle = Math.atan2(this.enemy.y - this.y, this.enemy.x - this.x); //Bestimmt den Winkel zwischen Enemy & Particle
    this.velocity = {
      //Bestimmt Ratio anhand welcher Particle zum Enemy gepusht wird und speichert dies in der velocity
      x: 1.1 * Math.cos(angle),
      y: 1.1 * Math.sin(angle),
    };
    this.update; //Position des Particles entsprechend updaten
  }
}

module.exports = particle;

},{"./Helper":3}],5:[function(require,module,exports){
const enemy = require("./Enemy");
const particle = require("./Particle");

class tower {
  constructor(x, y, towerType = 0) {
    this.radius = 15; // Größe des Turmkreises
    //towerId; // woher?
    this.color = "#1E90FF"; // Blau = gut ^^
    this.x = x;
    this.y = y;
    this.towerType = towerType;
    this.cooldownLeft = 30;
    this.particleList = [];
    this.particleCount = 0;

    // Fallentscheidung welchen towerType der Turm hat
    if (towerType == 0) {
      // Standardturm
      this.damage = 1;
      this.price = 10;
      this.speed = 10;
      this.range = 10;
      this.cooldown = 120; // 30 = 1 Sekunde, dann durch Updates herabsetzbar
      this.particlesPerShot = 1;
    }
  }

  shoot = (enemy, amount = 1) => {
    // Anzahl von Partikeln wird erzeugt mit Tower Koordinaten wenn Enemy in Reichweite, und Feuerbereit
    for (var i = 1; i <= amount; i++) {
      var particle_ = new particle(this.x, this.y, this.damage, enemy);
      var id = this.particleCount++;
      this.particleList[id] = particle_;
      console.log(this.particleList);
    }
    this.cooldownLeft = this.cooldown; // Cooldown wieder hochgesetzt
  };

  update() {
    // Schaut ob der Tower wieder schießbereit ist, wenn ja, schauen ob Gegner in Reichweite, wenn ja Partikel erzeugen (= schiessen)
    if (this.cooldownLeft > 0) {
      this.cooldownLeft--;
    }
    for (let i = 0; i < this.particleList.length; i++) {
      if (this.particleList[i].flag == true) continue;
      this.particleList[i].update();
    }
  }

  // +++ Schauen ob man später vllt Höchstgrenzen von Upgrades setzt, oder Prozentual upgraded, oder direkt größere Schritte macht +++

  upgradeDamage(value = 1) {
    // Upgrade von Schaden
    this.damage += value;
  }

  upgradeRange(value = 1) {
    // Upgrade von Reichweite
    this.range += value;
  }

  upgradeSpeed(value = 1) {
    // Upgrade von Schussgeschwindigkeit
    if (this.cooldown > 1 && this.cooldown - value > 0) {
      this.cooldown -= value;
    }
  }

  upgradeAmountParticlesPerShot(value = 1) {
    // Upgrade Projektilanzahl pro Schuss
    this.particlesPerShot += value;
  }

  // draw() {
  //     // Zeichnet den Kreis des Turms
  //     helpers.drawCircle(this.x, this.y, this.radius, this.color)
  // }

  isFireReady() {
    // Prüfen ob der Turm schon Feuerbereit ist (cooldownLeft == 0)
    if (this.cooldownLeft == 0) {
      return true;
    } else {
      return false;
    }
  }
}

module.exports = tower; // muss mit Klassenname übereinstimmen

},{"./Enemy":1,"./Particle":4}],6:[function(require,module,exports){
/*
 * Verwaltung der Waves im Spiel
 * @author Nicole
 *
 */

//Notiz: Es müsste evtl. noch umgesetzt werden, dass Enemies "häufichenweise" spawnen, also nicht alle hintereinander weg?

//Imports und Instanzerzeugung
class wave { //Referenz auf Entitiesinstanz von Game übergeben
    constructor(entities, canvas, ctx) {
        this.entities = entities //Sicherstellen, dass Game und Wave die selbe Instanz von Entities nutzen
        this.currentWave = 1 //Akt. Wave in-game
        this.amountOfEnemies = 5 //Initalwert für Enemyanzahl
        this.enemySpwanCooldown = 1 //Damit Enemies nicht alle direkt ohne Abstand hintereinnander spwanen
        this.isStarting = false //Boolean um zu markieren, wann neue Wave startet
        this.canvas = canvas
        this.ctx = ctx
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
            this.entities.create_enemy(this.canvas, this.ctx); //(this.enemyStartPos) StartPosition der Enemies muss mitübergeben werden
            //Neuen Cooldown random setzten
            this.enemySpwanCooldown = this.getRndInteger(50,500)
            this.amountOfEnemies--
        }
    }
    
    nextWave() { //Klassenvariablen für die nächste Wave vorbereiten
        this.currentWave++
        //EnemyAnzahl exponentiell erhöhen...
        this.enemySpwanCooldown = this.getRndInteger(50,500)
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
},{}],7:[function(require,module,exports){
const Tower = require("./Tower");
const Enemy = require("./Enemy");
const Helper = require("./Helper");

class Entities {
  constructor(startingPoint, waypoints) {
    this.startingPoint = startingPoint;
    this.waypoints = waypoints;
    this.enemyList = [];
    this.towerList = [];
    this.enemyCounter = 0;
    this.towerCounter = 0;
    this.win = false; 
  }

  newWave = (amountOfEnemies) => {
    this.enemyList = [];
    this.enemyCounter = 0;
    this.win = false; 
    this.amountOfEnemies = amountOfEnemies; 

    for(let j = 0; j < this.towerList.length; j++) {
      this.towerList[j].particleList = []; 
      this.towerList[j].particleCount = 0; 
    }
  };

  draw = () => {
    //von jeden Enemy/Tower wird die Draw() Funktion aufgerufen
    for (let i = 0; i < this.enemyList.length; i++) {
      if (this.enemyList[i].dead == true) continue;
      this.drawCircle(
        this.enemyList[i].x,
        this.enemyList[i].y,
        this.enemyList[i].radius,
        this.enemyList[i].color
      );
    }
    for (let j = 0; j < this.towerList.length; j++)
      this.drawCircle(
        this.towerList[j].x,
        this.towerList[j].y,
        this.towerList[j].radius,
        this.towerList[j].color
      );
  };

  drawCircle(x, y, radius, color) {
    //Kreis zeichnen für Anzeige Reichweite/GameObjects
    //mit Koordinaten x,y ; Radius;  Farbe

    //jedes Mal Holen Canavas, ctx oder im Konstruktor übergeben
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");

    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
    ctx.fill();
    ctx.closePath();
  }

  detectDistance(x1, y1, x2, y2) {
    //Abstand zwischen zwei Punkten d = Wurzel( (x1-x2)^2 + (y1-y2)^2 )
    var a = x1 - x2;
    var b = y1 - y2;
    return Math.sqrt(a * a + b * b);
  }

  //detectCollision(x1,y1,r1,x2,y2,r2){
  detectCollision = (x1, y1, r1, x2, y2, r2) => {
    //wenn der abstand zw. den beiden Mittelpunkten
    //kleiner/gleich die Summer der beiden Radien -> return true

    var distance = this.detectDistance(x1, y1, x2, y2);
    if (distance <= r1 + r2) {
      return true;
    }
    return false;
  };

  update = () => {

    var count = 0; 
    //von jeden Enemy/Tower wird die Update() Funktion aufgerufen
    for (let i = 0; i < this.enemyList.length; i++) {
      if (this.enemyList[i].dead == true) {
        count++; 
        continue;
      }
      this.enemyList[i].handleEnemy();
    }
    if (count == this.amountOfEnemies) {
      console.log("win"); 
      this.win = true; 
    }


    for (let j = 0; j < this.towerList.length; j++) this.towerList[j].update();
    this.detect_enemy();
  };

  create_enemy = (canvas, ctx) => {
    var enemy = new Enemy(canvas, ctx, this.waypoints, this.startingPoint);
    var id = this.enemyCounter++;
    this.enemyList[id] = enemy;
    console.log(this.enemyList);
  };

  create_tower = (x, y) => {
    var tower = new Tower(x, y);
    var id = this.towerCounter++;
    this.towerList[id] = tower;
    console.log(this.towerList);
  }; //

  detect_enemy() {
    //leitet den Enemy, der in Towerrange ist und am meisten Weg zurück gelegt hat, an den entsp. schussbereiten Tower weiter

    for (let j = 0; j < this.towerList.length; j++) {
      //Tower schussbereit?

      if (this.towerList[j].cooldownLeft !== 0) continue;
      let last_enemy;

      for (let i = 0; i < this.enemyList.length; i++) {
        //Enmie schon tot?
        if (this.enemyList[i].dead == true) continue;
        //Enemie schon anvisiert und dadurch tot?
        if (this.enemyList[i].futureDamage >= this.enemyList[i].remainingLife)
          continue;

        //Enemie in Tower Range?
        var bool = this.detectCollision(
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
          if (
            this.enemyList[i].covered_distance > last_enemy.covered_distance
          ) {
            last_enemy = this.enemyList[i];
          }
        }
      }
      //wenn last_enemy initialisiert-> Weiterleiten an Tower
      if (last_enemy !== undefined) {
        console.log("tot");
        this.towerList[j].shoot(last_enemy);
      }
    }
  }

  validate_position = (x, y, radius) => {
    //für alle tower -> detectCollision mit x,y,r des zu bauenden und x,y,r des ausgelesen Tower
    for (let j = 0; j < this.towerList.length; j++) {
      let bool = this.detectCollision(
        this.towerList[j].x,
        this.towerList[j].y,
        this.towerList[j].radius,
        x,
        y,
        radius
      );
      if (bool == true) return false;
    }

    //detectCollision Für alle Punkt der Map prüfen
    for (let i = -1; i < this.waypoints.length - 1; i++) {
      //Für Starting Point
      if (i == -1) {
        var x1 = this.startingPoint[0][0];
        var y1 = this.startingPoint[0][1];
      }
      //auslesen aktueller/start waypoint x1, y1
      else {
        var x1 = this.waypoints[i][0];
        var y1 = this.waypoints[i][1];
      }

      //auslesen nächster waypint i+1
      var x2 = this.waypoints[i + 1][0];
      var y2 = this.waypoints[i + 1][1];

      //Richtungsbestimmung
      var start, finish, change_x;
      if (x1 < x2) {
        // Osten, rechts
        start = x1;
        finish = x2;
        change_x = true;
      } else if (x1 > x2) {
        //Westen, links
        start = x2;
        finish = x1;
        change_x = true;
      } else if (y1 < y2) {
        //Süden, unten
        start = y1;
        finish = y2;
        change_x = false;
      } else if (y1 > y2) {
        //Norden, oben
        start = y2;
        finish = y1;
        change_x = false;
      }

      //Prüfen aller Punkte der Map zwischen aktuellem und nächstem Waypoint
      for (let j = start; j < finish; j++) {
        let bool;
        if (change_x == true)
          bool = this.detectCollision(j, y1, 50, x, y, radius);
        else bool = this.detectCollision(x1, j, 50, x, y, radius);
        if (bool == true) return false;
      }
    } //End Waypoint Schleife
    return true;
  };
}

module.exports = Entities;

},{"./Enemy":1,"./Helper":3,"./Tower":5}],8:[function(require,module,exports){
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
    console.log("hio2");

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

    this.wave = new wave(this.entities_, this.canvas, this.ctx);
    this.entities_.newWave(this.wave.amountOfEnemies); 
    //this.wave.initialiseEnemies();

    // Turm erstellen
    this.entities_.create_tower(70, 100);
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
    this.entities_.draw();
    this.entities_.update();
    this.wave.update();
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

},{"./Events":2,"./Wave":6,"./entities":7,"./map":9}],9:[function(require,module,exports){
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

},{}]},{},[8]);
