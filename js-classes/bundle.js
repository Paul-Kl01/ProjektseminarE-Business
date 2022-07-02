(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){

// var initialEnemyx = 0;
// var initialEnemyy = 60;
// var dx = 2;
// var dy = 2;
// var waypoints = [];
// var enemyList = [];
// let frame = 0;
// var enemyColor = "red";
// var enemyRadius = 1;

class enemy {
  constructor(waypoints, startingPoint, enemyType) {
    this.radius = 5;
    this.color = "red";
    this.status = 1;
    this.speed = 1.25;
    this.lootDrop = 3;
    this.waypoints = waypoints;
    this.startingPoint = startingPoint;
    this.wp1 = false;
    this.wp2 = false;
    this.wp3 = false;
    this.dead = false;
    this.enemyType = enemyType;
    this.coveredDistance = 0;
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
      this.coveredDistance += this.speed;
    }
    if (this.wp1 == true && this.wp2 == false) {
      this.y += this.speed;
      this.coveredDistance += this.speed;
    }

    if (this.wp1 == true && this.wp2 === true && this.wp3 == false) {
      this.x -= this.speed;
      this.coveredDistance += this.speed;
    }

    if (this.wp1 == true && this.wp2 == true && this.wp3 == true) {
      this.y += this.speed;
      this.coveredDistance += this.speed;
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
// function drawEnemy() {
//   enemyList.push(new enemy(0, 60));
//   enemyList[1].this.draw();
// }

//Redirect zur Gameover Site
//Alternative: bool variable die den animation Aufruf stoppt.
function GameOver() {
  window.location.replace(gameover.html);
  clearInterval(interval);
}

module.exports = enemy;

},{}],2:[function(require,module,exports){
class events {
  constructor(canvas, context) {
    this.canvas = canvas;
    this.context = context;
    this.rect = canvas.getBoundingClientRect();
    this.scaleX = this.canvas.width / this.rect.width;
    this.scaleY = this.canvas.height / this.rect.height;
    this.mouse = {
      x: 0,
      y: 0,
      clicked: false, 
    }
  }
    onmove = (e) => {
      this.mouse.x = (e.clientX - this.rect.left) * this.scaleX
      this.mouse.y = (e.clientY - this.rect.top) * this.scaleY
    }

     onclick = (e) => {
      this.mouse.clicked = true;
    }

    update = () => {
      this.mouse.clicked = false;
    }
  


//   getMousePosition = () => {
//     canvas.addEventListener("mousemove", function (e) {
//       console.log("Test");
//       var cRect = canvas.getBoundingClientRect(); // Gets CSS pos, and width/height
//       var canvasX = Math.round(e.clientX - cRect.left); // Subtract the 'left' of the canvas
//       var canvasY = Math.round(e.clientY - cRect.top); // from the X/Y positions to make
//       ctx.clearRect(0, 0, canvas.width, canvas.height); // (0,0) the top left of the canvas
//       ctx.fillText("X: " + canvasX + ", Y: " + canvasY, 10, 20);
//       console.log(canvasX, canvasY);
//     });
//   };
}

module.exports = events;

},{}],3:[function(require,module,exports){
/*
 * Partikelerzeugung zum Abschießen der Enemies
 * @author Nicole
 *
 */

class particle {
  constructor(x, y, damage, closestEnemy, speed) {
    this.enemy = closestEnemy;
    this.x = x; //Als Startposition Koordinaten des jeweiligen Turms
    this.y = y;
    this.velocity = { x: 0, y: 0 };
    this.color = "#483d8b";
    this.radius = 1;
    this.damage = damage; //Turmschaden
    this.flag = false;
    this.speed = speed;
  }

  update() {
    this.x = this.x + this.velocity.x; //Bewegung updaten
    this.y = this.y + this.velocity.y;
    this.calcPathToEnemy(); //Da Enemy sich bewegt, muss Bewegungsrichtung des Particles immer wieder angepasst werden
  }

  /*Enemies bewegen sich, Path zum Enemy muss immer wieder aktualisiert werden,
   *bis Enemy getroffen wurde vom Particle
   */
  calcPathToEnemy() {
    const angle = Math.atan2(this.enemy.y - this.y, this.enemy.x - this.x); //Bestimmt den Winkel zwischen Enemy & Particle
    this.velocity = {
      //Bestimmt Ratio anhand welcher Particle zum Enemy gepusht wird und speichert dies in der velocity
      x: this.speed * Math.cos(angle), //Konstante im Term bestimmt die Geschwindigkeit des Particle
      y: this.speed * Math.sin(angle),
    };
    this.update; //Position des Particles entsprechend updaten
  }
}

module.exports = particle;

},{}],4:[function(require,module,exports){
const particle = require("./Particle");

class tower {
  constructor(x, y, towerSettings) {
    this.price = towerSettings[0];
    this.radius = towerSettings[1];
    this.color = towerSettings[2];
    this.range = towerSettings[3];
    this.x = x;
    this.y = y;
    this.cooldownLeft = 0;
    this.cooldown = 200;
    this.particleList = [];
    this.particleCount = 0;
    this.rangeColor = 'rgba(30, 144, 255, 0.2)';
    this.speed = 1.3;
    // Fallentscheidung welchen towerType der Turm hat
    /*Edit - Constantin: Wir haben den TowerTyp via TowerSettings in der Game durchgereicht, das spart die IF-Statements */


    // if (towerType == 0) {
    //   // Standardturm
    //   this.damage = 1;
    //   this.price = 10;
    //   this.range = 100;
    //   this.cooldown = 120; // 30 = 1 Sekunde, dann durch Updates herabsetzbar
    //   this.particlesPerShot = 1;
    // }
  }

  shoot = (enemy, amount = 1) => {
    // Anzahl von Partikeln wird erzeugt mit Tower Koordinaten wenn Enemy in Reichweite, und Feuerbereit
    for (var i = 1; i <= amount; i++) {
      var particle_ = new particle(this.x, this.y, this.damage, enemy, this.speed);
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
},{"./Particle":3}],5:[function(require,module,exports){
/*
 * Verwaltung der Waves im Spiel
 * @author Nicole
 *
 */

//Notiz: Es müsste evtl. noch umgesetzt werden, dass Enemies "häufichenweise" spawnen, also nicht alle hintereinander weg?

class wave {
    constructor(entities) {
        this.entities = entities //Sicherstellen, dass Game und Wave die selbe Instanz von Entities nutzen
        this.currentWave = 1 //Aktuelle Wave ingame
        this.amountOfEnemies = Math.pow(2, this.currentWave) //Initalwert für Enemyanzahl 2^1 = 2
        this.enemyGroup = 6
        this.enemySpawnCooldown = 1 //Damit Enemies nicht alle direkt ohne Abstand hintereinnander spawnen
        this.enemyGroupCoolDown = 0 //Initialwert
        //this.isStarting = false //Boolean um zu markieren, wann neue Wave startet

    }

    update(){ //Update um Klassenvariablen anzupassen
        //Neue Wave muss getriggert werden
        // if(this.isStarting) {
        //     this.nextWave();
        // }

        if(this.amountOfEnemies > 0) { //Solange amount > 0, Enemies erstellen lassen
            if(this.currentWave > 5) {
                //Extra Parameter, damit Enemies zufällig stärker werden können
                this.initialiseEnemies(this.getRndInteger(0,2)); //Erstmal Typ 0,1 & 2, sind das zu viele oder zu wenige Typen?
            }
            else {this.initialiseEnemies();}
        }
        
    }

    initialiseEnemies(enemyStrength = 0) { //Typ 0 als default Enemy?
    //ruft create-method der Klasse Entities auf, um Enemies zu erzeugen
        if(this.enemyGroup > 0 && this.enemyGroupCoolDown == 0) { //Enemies dürfen ganz normal gespawnt werden
            if(this.enemySpawnCooldown > 0) {
                this.enemySpawnCooldown--;
            }
            else{ //in create als zusätzlichen Parameter: enemyStrength übergeben!
                this.entities.createEnemy(enemyStrength);//CreateMethode der EnemyTyp übergeben wird
                //Neuen Cooldown random setzten
                this.enemySpawnCooldown = this.getRndInteger(25,200);
                this.amountOfEnemies--;
                this.enemyGroup--;
            }
        }

        else if(this.enemyGroup == 0 && this.enemyGroupCoolDown == 0) {
            //Werte zurücksetzen
            this.enemyGroupCoolDown = 50; //Cooldown bis neue Gruppe an Enemies spawnen kann
            this.enemyGroup = 6;
        }
        else if(this.enemyGroupCoolDown > 0) {
            //Cooldown damit neue Gruppe an Enemies spawnen kann runterzählen
            this.enemyGroupCoolDown--;

        }
    }
    
    nextWave() { //Klassenvariablen für die nächste Wave vorbereiten
        this.currentWave++;
        //EnemyAnzahl exponentiell erhöhen...
        this.enemySpawnCooldown = this.getRndInteger(25,250);
        //this.amountOfEnemies = this.currentWave * 6;
        this.amountOfEnemies = Math.pow(2, this.currentWave) // 2^(currentWave)
        this.enemyGroupCoolDown = 0;
        this.enemyGroup = 6;
        //this.isStarting = false; //Wert wieder zurücksetzten
        this.update();
        //Später noch Stärke der Enemies anpassen...bzw. andere Enemytypen übergeben
    }

    //Markierung, dass nächste Wave starten soll
    // triggerNextWave() {
    //     this.isStarting = true;
    //     this.update();
    // }

    //Random Zahl für bestimmtes Intervall generieren (min & max sind im Intervall inklusive)
    getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1) ) + min;
    }
}

module.exports = wave;

},{}],6:[function(require,module,exports){
const Tower = require("./Tower");
const Enemy = require("./Enemy");

class Entities {
  constructor(startingPoint, waypoints) {
    this.startingPoint = startingPoint;
    this.waypoints = waypoints;
    this.enemyList = [];
    this.towerList = [];
    this.enemyCounter = 0;
    this.towerCounter = 0;
    this.win = false; 
    this.money = 10;
  }

  nextWave = (amountOfEnemies) => {
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
    //von jeden Enemy/Tower/Particle wird die drawCircle() Methode aufgerufen
    for (let i = 0; i < this.enemyList.length; i++) {
      if (this.enemyList[i].dead == true) continue;
      this.drawCircle(
        this.enemyList[i].x,
        this.enemyList[i].y,
        this.enemyList[i].radius,
        this.enemyList[i].color
      );
    }
    for (let j = 0; j < this.towerList.length; j++) {
      this.drawCircle(
        this.towerList[j].x,
        this.towerList[j].y,
        this.towerList[j].radius,
        this.towerList[j].color
      );
      // Draw Range
      this.drawCircle(
        this.towerList[j].x,
        this.towerList[j].y,
        this.towerList[j].range,
        this.towerList[j].rangeColor
      );

          //Particle zeichnen
      for (let k = 0; k < this.towerList[j].particleList.length; k++) {
        if (this.towerList[j].particleList[k].flag == true) continue;
        this.drawCircle(
          this.towerList[j].particleList[k].x,
          this.towerList[j].particleList[k].y,
          this.towerList[j].particleList[k].radius,
          this.towerList[j].particleList[k].color
        );
      };
    }
  }

  drawCircle(x, y, radius, color) {
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
  };

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
      this.win = true; 
      
      return;
    }

    for (let j = 0; j < this.towerList.length; j++) this.towerList[j].update();
    this.detectEnemy();
    this.detectHit(); 

  };


  createEnemy = (enemyType) => {
    var enemy = new Enemy(this.waypoints, this.startingPoint, enemyType );
    var id = this.enemyCounter++;
    this.enemyList[id] = enemy;
    console.log(this.enemyList);
  };

  createTower = (x, y, towerSettings) => {
    var tower = new Tower(x, y, towerSettings);
    var id = this.towerCounter++;
    this.towerList[id] = tower;
    console.log(this.towerList);
    this.money -= this.towerList[id].price;
  }; 

  detectEnemy() {
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

        if (bool == true) {
          //wenn erster der in Reichweite-> als Vergleichswert(last_enemie) zw.speichern
          if (last_enemy === undefined) {
            last_enemy = this.enemyList[i];
          }
    
          //sonst Abgleich ob zurück gelegter Weg des aktuellen Enemy größer als bei Vergleichs-Enemie;
          else {
            if ( this.enemyList[i].coveredDistance > last_enemy.coveredDistance) {
              last_enemy = this.enemyList[i];
            }
          }
        }
      }
      //wenn last_enemy initialisiert-> Weiterleiten an Tower
      if (last_enemy !== undefined) {
        this.towerList[j].shoot(last_enemy);
      }
    }
  }

  detectHit(){
    for (let j = 0; j < this.towerList.length; j++) {
      for (let k = 0; k < this.towerList[j].particleList.length; k++) {
        if (this.towerList[j].particleList[k].flag == true || this.towerList[j].particleList[k].enemy.dead == true) continue;
        var bool= this.detectCollision(
            this.towerList[j].particleList[k].x,
            this.towerList[j].particleList[k].y,
            this.towerList[j].particleList[k].radius,
            this.towerList[j].particleList[k].enemy.x,
            this.towerList[j].particleList[k].enemy.y,
            this.towerList[j].particleList[k].enemy.radius
          ) 
        if (bool == true){
        // Enemy bekommt Schaden übergeben
          this.towerList[j].particleList[k].enemy.hit(this.towerList[j].particleList[k].damage); 
          this.towerList[j].particleList[k].flag = true;
          if (this.towerList[j].particleList[k].enemy.dead == true){
            this.money += this.towerList[j].particleList[k].enemy.lootDrop
          }
        }
      }
    }
  }


  validatePosition = (x, y, radius) => {
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
        var x1 = this.startingPoint[0];
        var y1 = this.startingPoint[1];
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

  towerRangePreview = (x,y,radius,color) =>{
    this.drawCircle(x,y,radius,color)
  }
}

module.exports = Entities;

},{"./Enemy":1,"./Tower":4}],7:[function(require,module,exports){
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
    this.remainingLifes;
    // Drop Tower Mode, damit um Mauszeiger gezeichnet werden kann.
    this.dropTowerMode = false;
    // Wenn der Start Game Button gedrückt wurde ändert sich die Flag
    this.startGamePressed = false;
    // Tower Typ
    this.towerType = 0;
    // Pause-Flag
    this.pause = false;
    /* ---------------------------------------------------- */

    // Event Instanz zum Maus-Handling
    this.events_ = new events(this.canvas, this.ctx);

    // Eigenschaften eines Turmes
    this.towerSettings = [
      [10, 15, "#1E90FF", 100, 120],
      [20, 15, "#00bb2d", 100],
      // Price, Radius, Color, Range, Cooldown, Damage
    ];

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
    document.getElementById("coinCount").innerHTML = this.entities_.money;
  }

  init = () => {
    this.gameRunnning = true;
    this.wave = new wave(this.entities_);
    this.entities_.nextWave(this.wave.amountOfEnemies);
    if (this.initCounter == 0) this.draw();
    this.initCounter = 1;
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

      // Solange nicht alle Gegner Tot sind und solange der StartButton gedrückt wurde
      if (this.entities_.win == false) {
        if (this.startGamePressed == true) {
          this.entities_.update();
          this.wave.update();
        }
      } else {
        this.wave.nextWave();
        this.entities_.nextWave(this.wave.amountOfEnemies);
      }

      // Anzeige von WaveCount und Coins
      document.getElementById("wcount").innerHTML = this.wave.currentWave;
      document.getElementById("coinCount").innerHTML = this.entities_.money;
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
        ) == false
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
    if (this.events_.mouse.clicked == true) {
      if (
        this.entities_.validatePosition(
          this.events_.mouse.x,
          this.events_.mouse.y,
          this.towerSettings[this.towerType][1]
        ) == true
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
    } else if (this.gameRunning == true) {
      console.log("spiel läuft");
    } else {
      console.log("bin im startgameif");
      this.startGamePressed = true;
      this.init();
      // this.gameRunning = true;
    }
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
  .addEventListener("click", g.pauseGame, false);

/* Tower Build */
// count nötig, da sonst init immer wieder beim Tower bauen aufgerufen wird.
var count = 0;
document.getElementById("btnBuild").addEventListener("click", function () {
  g.dropTowerMode = true;
  if (count == 0) {
    g.init();
    count++;
  }
  g.towerType = 0;
  g.drawTowerMouse();
  // g.entities_.create_tower(220,110);
  // g.entities_.draw();
});

// Pop Up laden
window.onload = openModal;

// Map beim Laden der Seite einzeichnen
window.onload = g.map.draw;

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
}

// Button Dropdown
const buildTower = document.querySelector("#btnBuild");

buildTower.addEventListener("click", myFunction);

function myFunction() {
  document.querySelector("#dropdown").classList.toggle("show");
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

},{"./Events":2,"./Wave":5,"./entities":6,"./map":8}],8:[function(require,module,exports){
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

},{}]},{},[7]);
