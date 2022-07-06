(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
class enemy {
  constructor(waypoints, startingPoint, enemyType) {
    this.enemySettings= [[15,"green",1,20,20],
                [5,"red",1,1,1],
                [5,"orange",1.25,4,1],
                [7,"purple",1,5,5]];
    //radius, color, speed, lootDrop, Health
    //erster Eintrag ist Boss Gegner
    this.enemyType = enemyType;
    this.radius = this.enemySettings[this.enemyType][0];
    this.color = this.enemySettings[this.enemyType][1];
    this.speed = this.enemySettings[this.enemyType][2];
    this.lootDrop = this.enemySettings[this.enemyType][3];
    this.health = this.enemySettings[this.enemyType][4];
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
    this.speed = 1.3;
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
        this.entities = entities; //Sicherstellen, dass Game und Wave die selbe Instanz von Entities nutzen
        this.mapType = mapType + 1;
        this.currentWave = 1; //Aktuelle Wave ingame
        this.amountOfEnemies = 1; //Initalwert für Enemyanzahl
        this.enemyGroup = 6;
        this.enemySpawnCooldown = 1; //Damit Enemies nicht alle direkt ohne Abstand hintereinnander spawnen
        this.enemyGroupCoolDown = 0; //Initialwert
        this.minCooldown = 20;
        this.maxCooldown = 150;
        this.currentMinCooldown = 50;
        this.currentMaxCooldown = 400;
        this.cooldownDecrement = 10;
        this.amountOfBosses = 0; //Wie viele Bosskämpfe in der aktuellen Welle
        this.maxAmountBosses = 0; //Anzahl der Bosskämpfe soll steigen
    }

    update(){ //Update um Klassenvariablen anzupassen
        console.log("RestEnemies: " + this.amountOfEnemies);
        if(this.amountOfEnemies > 0) { //Solange amount > 0, Enemies erstellen lassen
            let random = this.getRndInteger(1,10); //Randomzahl um zu bestimmen, wann Boss gespawn wird
            if(random == 5 || this.currentWave % 5 != 0 || this.amountOfBosses == 0) {
                if(this.currentWave > 5 ) {
                //Extra Parameter, damit Enemies zufällig stärker werden können
                this.initialiseEnemies(this.getRndInteger(1,3)); //Typ 0,1,2 & 3
                }
                else {this.initialiseEnemies();}
            }
            else if(this.currentWave % 5 == 0 && this.amountOfBosses > 0){
                this.initialiseEnemies(0); //Boss alle 10 Wellen spawnen lassen
                //this.amountOfBosses--;
                console.log("Bossanzahl: " + this.amountOfBosses);
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
                this.entities.createEnemy(enemyStrength);//CreateMethode der EnemyTyp übergeben wird
                //Neuen Cooldown random setzten
                this.enemySpawnCooldown = this.getRndInteger(this.currentMinCooldown,this.currentMaxCooldown);
                this.amountOfEnemies--;
                this.enemyGroup--;
                if(enemyStrength == 0) {
                    this.amountOfBosses--;
                    console.log("BOSS DRAUSSEN!");
                }
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

        if(this.currentWave % 5 == 0) {
            this.amountOfBosses = this.maxAmountBosses + 1; //Anzahl der Bosskämpfe für aktuelle Welle festlegen
        }

        //Cooldown für Enemies verringern
        if(this.currentMaxCooldown > this.maxCooldown) {
            this.currentMaxCooldown = this.currentMaxCooldown - this.cooldownDecrement;
        }
        if(this.currentMinCooldown > this.minCooldown) {
            this.currentMinCooldown = this.currentMinCooldown - this.cooldownDecrement;
        }
        this.enemySpawnCooldown = this.getRndInteger(this.currentMinCooldown,this.currentMaxCooldown);
        
        this.amountOfEnemies = Math.floor(Math.pow((this.currentWave),1.5)); //(currentWave)^2
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
    this.money = 10;
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


  createEnemy = (enemyType) => {
    var enemy = new Enemy(this.waypoints, this.startingPoint, enemyType );
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
