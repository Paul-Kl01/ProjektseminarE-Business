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
<<<<<<< Updated upstream
    this.x = this.x + this.velocity.x; //Bewegung updaten
    this.y = this.y + this.velocity.y;
=======
    console.log(this.velocity.x * window.GLOBALSPEED);
    console.log(this.velocity.y * window.GLOBALSPEED);
    this.x = this.x + (this.velocity.x * window.GLOBALSPEED); //Bewegung updaten
    this.y = this.y + (this.velocity.y * window.GLOBALSPEED);
>>>>>>> Stashed changes

    if (this.enemy.dead == true) this.flag = true;

    if (
      this.inRange(
        this.x,
        this.y,
        this.radius,
        this.towerX,
        this.towerY,
        this.towerRange
      )
    ) {
      this.calcPathToEnemy(); //Da Enemy sich bewegt, muss Bewegungsrichtung des Particles immer wieder angepasst werden
    } else {
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
  inRange(x1, y1, r1, x2, y2, r2) {
    var a = x1 - x2;
    var b = y1 - y2;
    if (Math.sqrt(a * a + b * b) <= r1 + r2 + 100) {
      //Der Wert 100 sorgt dafür, dass Particle etwas weiter aus der Range rauskommt
      return true;
    }
    return false;
  }
}

module.exports = particle;
