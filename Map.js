// import Game from './Game';
// import Helper from './Helper';

export default class Map {
  constructor(roadColor, mapBackground, waypoints, initalEnemyPos) {
    this.waypoints = waypoints;
    this.mapBackground = mapBackground;
    this.roadColor = roadColor;
    //this.initalEnemyPos = {x,y}; // Einfügen aus Enemy
  }

  draw() {
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

/* Map aufbauen
const map = new Map("#F08080", "#eee", [
  [800, 60],
  [800, 200],
  [200, 200],
  [200, 500],
]);
map.draw();
console.log(map);*/
