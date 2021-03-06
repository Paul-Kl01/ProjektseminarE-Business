const particle = require("./Particle");
/*
 * Verwaltung der Türme im Spiel
 * @author Benedikt
 *
 */
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
    this.rangeColor = "rgba(30, 144, 255, 0.2)";
    this.speed = towerSettings[6];
    this.damage = towerSettings[5];
  }

  shoot = (enemy, amount = 1) => {
    // Anzahl von Partikeln wird erzeugt mit Tower Koordinaten wenn Enemy in Reichweite, und Feuerbereit
    for (var i = 1; i <= amount; i++) {
      var particle_ = new particle(
        this.x,
        this.y,
        this.damage,
        enemy,
        this.speed,
        this.range
      );
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

  /* Methoden werden (noch, Stand: release) nicht genutzt */
  
  // upgradeDamage(value = 1) {
  //   // Upgrade von Schaden
  //   this.damage += value;
  // }

  // upgradeRange(value = 1) {
  //   // Upgrade von Reichweite
  //   this.range += value;
  // }

  // upgradeSpeed(value = 1) {
  //   // Upgrade von Schussgeschwindigkeit
  //   if (this.cooldown > 1 && this.cooldown - value > 0) {
  //     this.cooldown -= value;
  //   }
  // }

  // upgradeAmountParticlesPerShot(value = 1) {
  //   // Upgrade Projektilanzahl pro Schuss
  //   this.particlesPerShot += value;
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
