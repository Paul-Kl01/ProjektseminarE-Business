/*
 * Verwaltung der Enemies im Spiel
 * @author Felix
 *
 */
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

    if (x1 < x2) {
      //rechts
      this.x += this.speed;
      this.coveredDistance += this.speed;
    }
    if (x1 > x2) {
      //links
      this.x -= this.speed;
      this.coveredDistance += this.speed;
    }
    if (y1 < y2) {
      //oben
      this.y += this.speed;
      this.coveredDistance += this.speed;
    }
    if (y1 > y2) {
      //unten
      this.y -= this.speed;
      this.coveredDistance += this.speed;
    }
    if (this.x == x2 && this.y == y2) {
      this.lastwp += 1;
    }

    if (this.lastwp == this.waypoints.length - 1) {
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
    if (this.health <= 0) {
      this.dead = true;
    }
  }
}

module.exports = enemy;
