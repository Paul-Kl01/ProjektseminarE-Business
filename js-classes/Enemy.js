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
