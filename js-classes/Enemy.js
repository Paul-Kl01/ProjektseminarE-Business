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
