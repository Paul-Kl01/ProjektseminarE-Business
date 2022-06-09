const wave = require("./Wave");

var initialEnemyx = 0;
var initialEnemyy = 60;
var dx = 2;
var dy = 2;
var waypoints = [];
var enemyList = [];
let frame = 0;
var wp1 = false;
var wp2 = false;
var wp3 = false;
var enemyColor = "red";
var enemyRadius = 10;

class enemy {
  constructor(canvas, ctx, waypoints, startingPoint) {
    this.radius = 10;
    this.color = "red";
    this.status = 1;
    this.speed = 2;
    this.canvas = canvas;
    this.ctx = ctx;
    this.waypoints = waypoints;
    this.startingPoint = startingPoint;

    this.x = this.startingPoint[0];
    this.y = this.startingPoint[1];

    this.wp1x = this.waypoints[0][0];
    this.wp1y = this.waypoints[0][1];
    this.wp2x = this.waypoints[1][0];
    this.wp2y = this.waypoints[1][1];
    this.wp3x = this.waypoints[2][0];
    this.wp3y = this.waypoints[2][2];
    this.wp4x = this.waypoints[3][0];
    this.wp4y = this.waypoints[3][3];
  }

  //update Funktion bewegt die Gegner in Abhängigkeit davon, welchen WP sie bereits erreicht haben.
  update() {
    if (wp1 == false) {
      this.x += this.speed;
    }
    if (wp1 == true && wp2 == false) {
      this.y += this.speed;
    }

    if (wp1 == true && wp2 === true && wp3 == false) {
      this.x -= this.speed;
    }

    if (wp1 == true && wp2 == true && wp3 == true) {
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
  handleEnemy(enemyList) {
    console.log("handle", enemyList);
    // if (enemyList.length == 0) {
    //   this.drawEnemy;
    // }

    for (let i = 0; i < enemyList.length; i++) {
      console.log(i);
      enemyList[i].update();
      enemyList[i].draw();

      //Check für jeden Gegner, ob er einen Wegpunkt erreicht hat.

      if (enemyList[i].x == this.wp1x && enemyList[i].y == this.wp1y) {
        wp1 = true;
      }
      if (enemyList[i].x == this.wp2x && enemyList[i].y == this.wp2y) {
        wp2 = true;
      }
      if (enemyList[i].x == this.wp3x && enemyList[i].y == this.wp3y) {
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
      // if (frame % 100 === 0) {
      //   enemyList.push(new enemy(0, 60));
      // }

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
