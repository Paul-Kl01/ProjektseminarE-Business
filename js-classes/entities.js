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

  reset = () => {
    for(let j = 0; j < this.towerList.length; j++) {
      for(let i = 0; i < this.towerList[j].particleList.length; i++) {
        this.towerList[j].particleList[i].reset();
      }
      this.towerList[j].particleList = []; 
      this.towerList[j].particleCount = 0; 
    }

    for (let i = 0; i < this.enemyList.length; i++) {
      this.enemyList[i].reset();
    }
    this.towerList = [];
    this.enemyList = [];
    this.win = false;
    this.enemyCounter = 0;
    this.towerCounter = 0;
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
    }
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
      this.win = true; 
      confirm("Win");
      return;
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

        if ((bool == true)) {
          //wenn erster der in Reichweite-> als Vergleichswert(last_enemie) zw.speichern
          if (last_enemy === undefined) {
            last_enemy = this.enemyList[i];
          }
        
        //sonst Abgleich ob zurück gelegter Weg des aktuellen Enemy größer als bei Vergleichs-Enemie;
        else {
          if (
            this.enemyList[i].coveredDistance > last_enemy.coveredDistance
          ) {
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
