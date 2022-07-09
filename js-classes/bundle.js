(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
class enemy {
  constructor(waypoints, startingPoint, enemySettings) {
    this.radius = enemySettings[0];
    this.color = enemySettings[1];
    this.speed = enemySettings[2];
    this.lootDrop = enemySettings[3];
    this.health = enemySettings[4];
    this.waypoints = waypoints;
    this.startingPoint = startingPoint;
    this.lastwp = -1;
    this.dead = false;
    this.reached = false;
    this.coveredDistance = 0;
    this.x = this.startingPoint[0];
    this.y = this.startingPoint[1];
  }


  //update Funktion bewegt die Gegner in Abhängigkeit davon, welchen WP sie bereits erreicht haben.
  update() {

    if (this.lastwp == -1) {
      var x1 = this.startingPoint[0];
      var y1 = this.startingPoint[1];
    }
    //auslesen aktueller/start waypoint x1, y1
    else {
      var x1 = this.waypoints[this.lastwp][0];
      var y1 = this.waypoints[this.lastwp][1];
    }

    //auslesen nächster waypint i+1
    var x2 = this.waypoints[this.lastwp + 1][0];
    var y2 = this.waypoints[this.lastwp + 1][1];


    

      if(x1 < x2){ //rechts
        this.x += this.speed;
        this.coveredDistance += this.speed;
      }
      if(x1 > x2){ //links
        this.x -= this.speed;
        this.coveredDistance += this.speed;
      }
      if(y1 < y2){ //oben
        this.y += this.speed;
        this.coveredDistance += this.speed;
      }
      if(y1 > y2){ //unten
        this.y -= this.speed;
        this.coveredDistance += this.speed;

      }
      if(this.x == x2 && this.y == y2){
        this.lastwp += 1;
      }

      if (this.lastwp == this.waypoints.length-1) {
        this.reached = true;
        this.dead = true;

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
  hit(damage) {
    this.health -= damage;
    if(this.health <= 0){
      this.dead = true;
    }

  }
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
}

module.exports = events;

},{}],3:[function(require,module,exports){
/*
 * Partikelerzeugung zum Abschießen der Enemies
 * @author Nicole
 *
 */
class particle {
  constructor(x, y, damage, closestEnemy, speed, range) {
    this.enemy = closestEnemy;
    this.x = x; //Als Startposition Koordinaten des jeweiligen Turms
    this.y = y;
    this.velocity = { x: speed, y: speed };
    this.color = "#483d8b";
    this.radius = 1;
    this.damage = damage; //Turmschaden
    this.flag = false;
    this.speed = speed;
    this.towerX = x;
    this.towerY = y;
    this.towerRange = range;
  }

  update() {
    this.x = this.x + this.velocity.x; //Bewegung updaten
    this.y = this.y + this.velocity.y;
    
    if(this.enemy.dead == true) this.flag = true;

    if(this.inRange(this.x,this.y,this.radius,this.towerX,this.towerY,this.towerRange)) {
      this.calcPathToEnemy(); //Da Enemy sich bewegt, muss Bewegungsrichtung des Particles immer wieder angepasst werden
    }
    else{
      this.flag = true; //Flag wird gesetzt sobald Particle zu weit aus der TowerRange raus ist
    }
    
  }

  /*Enemies bewegen sich, Path zum Enemy muss immer wieder aktualisiert werden,
   *bis Enemy getroffen wurde vom Particle
   */
  calcPathToEnemy() {
    const angle = Math.atan2(this.enemy.y - this.y, this.enemy.x - this.x); //Bestimmt den Winkel zwischen Enemy & Particle
    this.velocity = {
      //Bestimmt Ratio anhand welcher Particle zum Enemy gepusht wird und speichert dies in der velocity
      x: this.speed * Math.cos(angle), //Konstante this.speed bestimmt die Geschwindigkeit des Particle
      y: this.speed * Math.sin(angle),
    };
    this.update; //Position des Particles entsprechend updaten
  }

  //Stellt sicher, dass Particle nicht zu weit außerhalb der TowerRange existieren kann
  //1 -> Particle , 2 -> TowerRange
  inRange(x1,y1,r1,x2,y2,r2) {
    var a = x1 - (x2);
    var b = y1 - (y2);
    if (Math.sqrt(a * a + b * b) <= r1 + r2 + 100) { //Der Wert 100 sorgt dafür, dass Particle etwas weiter aus der Range rauskommt
      return true;
    }
    return false;
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
    this.cooldown = towerSettings[4];
    this.particleList = [];
    this.particleCount = 0;
    this.rangeColor = 'rgba(30, 144, 255, 0.2)';
    this.speed = towerSettings[6];
    this.damage = towerSettings[5];
    // Fallentscheidung welchen towerType der Turm hat
    /*Edit - Constantin: Wir haben den TowerTyp via TowerSettings in der Game durchgereicht, das spart die IF-Statements */


    // if (towerType == 0) {
    //   // Standardturm
    //   this.price = 10;
    //   this.range = 100;
    //   this.cooldown = 120; // 30 = 1 Sekunde, dann durch Updates herabsetzbar
    //   this.particlesPerShot = 1;
    // }
  }

  shoot = (enemy, amount = 1) => {
    // Anzahl von Partikeln wird erzeugt mit Tower Koordinaten wenn Enemy in Reichweite, und Feuerbereit
    for (var i = 1; i <= amount; i++) {
      var particle_ = new particle(this.x, this.y, this.damage, enemy, this.speed, this.range);
      var id = this.particleCount++;
      this.particleList[id] = particle_;
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
class wave {
    constructor(entities, mapType = 0) { //default mapType = 0
        this.currentWave = 1; //Aktuelle Wave ingame
        this.entities = entities; //Sicherstellen, dass Game und Wave die selbe Instanz von Entities nutzen
        //erster Eintrag ist Boss Gegner
        this.enemySettings = 
                [[15,"#ffd700", 1, 20, this.currentWave],
                [5,"#dc143c", 1, 1, 1],
                [5,"#d0ff14", 1.25, 4 ,1],
                [7,"#7fffd4", 1, 5, 3]];
            //radius, color, speed, lootDrop, Health

        //Skalierung je nach MapType
        if(mapType == 0) {
            this.mapType = 1;
        }
        else {
            this.mapType = 1,5;
        }
        this.amountOfEnemies = 1 * this.mapType; //Initalwert für Enemyanzahl abhängig vom mapType
        this.enemyGroup = 6;
        this.enemySpawnCooldown = 1; //Damit Enemies nicht alle direkt ohne Abstand hintereinnander spawnen
        this.enemyGroupCoolDown = 0; //Initialwert
        this.minCooldown = 10;
        this.maxCooldown = 80;
        this.currentMinCooldown = 50;
        this.currentMaxCooldown = 150;
        this.cooldownDecrement = 10;
        this.amountOfBosses = 0; //Wie viele Bosskämpfe in der aktuellen Welle
        this.maxAmountBosses = 0; //Anzahl der Bosskämpfe soll steigen
    }

    update(){ //Update um Klassenvariablen anzupassen
        if(this.amountOfEnemies > 0) { //Solange amount > 0, Enemies erstellen lassen
            let random = this.getRndInteger(1,10); //Randomzahl um zu bestimmen, wann Boss gespawn wird
            if(random % 2 == 0 || this.currentWave % 5 != 0 || this.amountOfBosses == 0) {
                if(this.currentWave > 5) {
                //Extra Parameter, damit Enemies zufällig stärker werden können
                this.initialiseEnemies(this.getRndInteger(1,3)); //Typ 0,1,2 & 3
                }
                // else if(this.currentWave >= 10) {
                // //Extra Parameter, damit Enemies zufällig stärker werden können
                // this.initialiseEnemies(this.getRndInteger(4,6)); //Typ 4,5 & 6
                // }
                else {this.initialiseEnemies();}
            }
            else if(this.currentWave % 5 == 0 && this.amountOfBosses > 0){
                this.initialiseEnemies(0); //Boss alle k Wellen spawnen lassen
            }
        }
    }

    initialiseEnemies(enemyStrength = 1) { //Typ 1 als default Enemy, da Typ 0 = Boss
    //ruft create-method der Klasse Entities auf, um Enemies zu erzeugen
        if(this.enemyGroup > 0 && this.enemyGroupCoolDown == 0) { //Enemies dürfen ganz normal gespawnt werden
            if(this.enemySpawnCooldown > 0) {
                this.enemySpawnCooldown--;
            }
            else{ //in create als zusätzlichen Parameter: enemyStrength übergeben!
                this.entities.createEnemy(this.enemySettings[enemyStrength]);//CreateMethode der EnemyTyp übergeben wird
                //Neuen Cooldown random setzten
                this.enemySpawnCooldown = this.getRndInteger(this.currentMinCooldown,this.currentMaxCooldown);
                this.amountOfEnemies--;
                this.enemyGroup--;
                if(enemyStrength == 0) {
                    this.amountOfBosses--;
                }
            }
        }

        else if(this.enemyGroup == 0 && this.enemyGroupCoolDown == 0) {
            //Werte zurücksetzen
            this.enemyGroupCoolDown = 20; //Cooldown bis neue Gruppe an Enemies spawnen kann
            this.enemyGroup = 6;
        }
        else if(this.enemyGroupCoolDown > 0) {
            //Cooldown damit neue Gruppe an Enemies spawnen kann runterzählen
            this.enemyGroupCoolDown--;

        }
    }
    
    nextWave() { //Klassenvariablen für die nächste Wave vorbereiten
        this.currentWave++;
        
        //Boss-Stärke erhöhen
        this.enemySettings[0][4] = this.currentWave;

        //Stärke der Enemies erhöhen
        if(this.currentWave % 10 == 8) {
            this.enemySettings[1][4] = (Math.floor(Math.pow((this.enemySettings[1][4] + 1),1.2)));
            //this.enemySettings[2][4] = (Math.floor(Math.pow((this.enemySettings[2][4] + 1),1.2)) * this.mapType);
            this.enemySettings[3][4] = (Math.floor(Math.pow((this.enemySettings[3][4]),1.2)));
        }

        //Anzahl der Bosskämpfe für aktuelle Welle festlegen
        if(this.currentWave % 5 == 0) {
            this.amountOfBosses = this.maxAmountBosses + 1; 
        }

        //Cooldown für Enemies verringern
        if(this.currentMaxCooldown > this.maxCooldown) {
            this.currentMaxCooldown = this.currentMaxCooldown - this.cooldownDecrement;
        }
        if(this.currentMinCooldown > this.minCooldown) {
            this.currentMinCooldown = this.currentMinCooldown - this.cooldownDecrement;
        }
        this.enemySpawnCooldown = this.getRndInteger(this.currentMinCooldown,this.currentMaxCooldown);
        
        this.amountOfEnemies = Math.floor(Math.pow((this.currentWave),1.5) * this.mapType); //(currentWave)^1,5 * mapType(1 oder 1,5) & Abrundung
        this.enemyGroupCoolDown = 0;
        this.enemyGroup = 6;
        
        this.update();
    }

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
    this.money = 50;
    this.deaths = 0;
  }

  nextWave = (amountOfEnemies) => {
    this.enemyList = [];
    this.enemyCounter = 0;
    this.win = false; 
    this.amountOfEnemies = amountOfEnemies; 
    this.deaths = 0;

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
    var count_deaths = 0;
    //von jeden Enemy/Tower wird die Update() Funktion aufgerufen
    for (let i = 0; i < this.enemyList.length; i++) {
      if (this.enemyList[i].dead == true) {
        count++;
        if(this.enemyList[i].reached == true){
          count_deaths ++;
        }
        continue;
      }
      this.enemyList[i].update();
    }
    this.deaths = count_deaths;
    if (count == this.amountOfEnemies) {
      this.win = true; 
      
      return;
    }

    for (let j = 0; j < this.towerList.length; j++) this.towerList[j].update();
    this.detectEnemy();
    this.detectHit(); 

  };


  createEnemy = (enemySettings) => {
    var enemy = new Enemy(this.waypoints, this.startingPoint, enemySettings );
    var id = this.enemyCounter++;
    this.enemyList[id] = enemy;
  };

  createTower = (x, y, towerSettings) => {
    var tower = new Tower(x, y, towerSettings);
    var id = this.towerCounter++;
    this.towerList[id] = tower;
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
        radius + 45
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
          if (i == -1 && j == 0) 
            bool = this.detectCollision(j, y1, 150, x, y, radius);
          else
            bool = this.detectCollision(j, y1, 35, x, y, radius);
        else bool = this.detectCollision(x1, j, 35, x, y, radius);
        if (bool == true) return false;
      }
    } //End Waypoint Schleife
    return true;
  };  
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
  if (g.entities_.money >= g.towerSettings[0][0] && g.entities_.money < g.towerSettings[1][0] && g.entities_.towerList.length < g.wave.currentWave) {
    // Tower 1
    d1.style.background = "green";
    d1.style.color = "white";
    d2.style.background = "white";
    d2.style.color = "black";
  } else if (g.entities_.money >= g.towerSettings[1][0] && g.entities_.towerList.length < g.wave.currentWave) {
    // Tower 2
    d2.style.background = "green";
    d2.style.color = "white";
    d1.style.background = "green";
    d1.style.color = "white";
  } else {
    d1.style.background = "white";
    d2.style.background = "white";
    d1.style.color = "black";
    d2.style.color = "black";
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
