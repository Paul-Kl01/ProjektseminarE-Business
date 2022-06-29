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
