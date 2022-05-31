(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
class events {
  canvas = document.querySelector("canvas");

  getCursorPosition = (canvas, event) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    console.log(x, y);
  };
}

module.exports = events;
},{}],2:[function(require,module,exports){

class entities {

    constructor(){
        this.enemyList = []; 
        this.towerList = []; 
        this.enemyCounter =  0; 
        this.towerCounter =  0; 
    }

    draw(){
        //von jeden Enemy/Tower wird die Draw() Funktion aufgerufen 
        for ( let i=0; i < this.enemyList.length; i++) this.enemyList[i].draw(); 
        for ( let j=0; j < this.towerList.length; j++) this.towerList[j].draw(); 
    }

    update(){
         //von jeden Enemy/Tower wird die Update() Funktion aufgerufen 
        for ( let i=0; i < this.enemyList.length; i++) this.enemyList[i].update(); 
        for ( let j=0; j < this.towerList.length; j++) this.towerList[j].update(); 
    } 

    create(x, y, radius, color, type) {
        //type zur Fallunterscheidung welche Art von Entität; 0 Enemy, 1 Tower
        var id; 
        switch (type) {
            case "0" :
                id: ++this.enemyCounter; 
                break; 

            case '1':
                id: ++this.towerCounter; 
        }

        //Entity Typ erstellen
        var entity = 
        {
            id: id, 
            type: type,
            x: x, 
            y:y, 
            r:r,  
            color: color, 
            draw: function(){
                game.drawCircle(this.x, this.y, this.radius, this.color)
            }, 
            update: function(){}
        }; 


        //Entity zur entsprechenden Liste hinzufügen 
        switch (type) {
            case "0" :
                this.enemyList[entity.id] = entity; 
                break; 

            case '1':
                this.towerList[entity.id] = entity;
        }
    }

    detectCollision(x1,y1,r1,x2,y2,r2){
    //wenn der abstand zw. den beiden Mittelpunkten
    //kleiner/gleich die Summer der beiden Radien -> return true

        var distance = Helper.detectDistance(x1, y1, x2, y2); 
        if (distance <= (r1+r2)){
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

// Import via Node.js
const map = require('./map');
const turret = require('./turret');
const entitites = require('./entities');
const events = require('./Events');
var entities_ = new entitites();
var event = new events();

class game {
  constructor() {
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.waveCounter = 0;
    // DrawList enthält alle Elemente die gezeichnet werden sollen
    this.drawList = [];
    this.towerCount = entities_.towerCounter;
    this.enemyCount = entities_.enemyCounter;

    //Zukunft
    this.timer;
    this.mode = 0;
    this.score = 0;
    this.remainingLifes;
    this.ressources = 0;


    this.map = new map("#F08080", "#eee", [
      [800, 60],
      [800, 200],
      [200, 200],
      [200, 500],
    ]);

    this.turret = new turret(50, 50);

    //Müssen Create() funktionen der anderen Klasse hier mittles this.--- = new ... aufgerufen werden?
  }

  init = () => {
    setInterval(this.draw(), 1000 / 30);
    
    //Leben im Prototyp auf 1;
    this.remainigLifes = 1;
    this.draw();

  }
  
  
  draw = () => {
    
    window.requestAnimationFrame(this.draw);
    // Clear Canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Game.restartGame();
    // Aufruf der Draw Methoden der Anderen Klassen? Eventuell drawList?
    // for (i = 0, i <= Anzahl Klassen; i++) ...
    this.map.draw();
    this.turret.draw();
  }

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
    }
  

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
  }

  pauseGame() {
    /* Timer stoppen, Waves "anhalten"
        at the Moment keine Ahnung wie das implementiert werden soll */
  }

  gameOver = () => {
    if (this.remainigLifes == 0) {
      this.restartGame();
      alert("Game Over");
    }
  }
}


// Neue Instanz des Spiels
 const g = new game();

 // Verankerung der Buttons mit den Funktionen
 document.getElementById("btnStart").addEventListener("click", g.startGame, false);
 document.getElementById("btnReset").addEventListener("click", g.restartGame, false);

 // Map beim Laden der Seite einzeichnen
 window.onload = g.map.draw;

},{"./Events":1,"./entities":2,"./map":4,"./turret":5}],4:[function(require,module,exports){
// import Game from './Game';
// import Helper from './Helper';

class map {
  constructor(roadColor, mapBackground, waypoints, initalEnemyPos) {
    this.waypoints = waypoints;
    this.mapBackground = mapBackground;
    this.roadColor = roadColor;
    //this.initalEnemyPos = {x,y}; // Einfügen aus Enemy
  }

  draw = () =>{
    // Canvas erstellen (aus Game importieren)
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");

    // Canvas Background
    ctx.fillStyle = this.mapBackground;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Waypoints (800,60),(800,200),(200,500)

    ctx.beginPath();
    ctx.strokeStyle = this.roadColor;
    // Koordinaten Weg
    let x;
    let y;

    // Startpunkt weg
    ctx.moveTo(0, 60);

    // Weg zeichnen
    for (let i = 0; i < this.waypoints.length; i++) {
      x = this.waypoints[i][0];
      y = this.waypoints[i][1];
      ctx.lineTo(x, y);
    }
    ctx.lineWidth = 50;
    ctx.stroke();
  }
}

module.exports = map;

/* Map aufbauen
const map = new Map("#F08080", "#eee", [
  [800, 60],
  [800, 200],
  [200, 200],
  [200, 500],
]);
map.draw();
console.log(map);*/

},{}],5:[function(require,module,exports){
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
},{}]},{},[3]);
