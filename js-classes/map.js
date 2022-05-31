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
    initalEnemyPos,
    startingPoint
  ) {
    this.waypoints = waypoints;
    this.mapBackground = mapBackground;
    this.roadColor = roadColor;
    this.startingPoint = startingPoint;
    //this.initalEnemyPos = {x,y}; // Einfügen aus Enemy
  }

  // Spielflaeche auf Canvas zeichnen
  draw = () => {
    // Canvas definieren
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
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
