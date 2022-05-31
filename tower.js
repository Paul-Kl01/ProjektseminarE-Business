<<<<<<< Updated upstream
import Particle from './Particle';
import Entities from './Entities';

class Tower {
    constructor(x, y, type = 0) {
=======
class Tower {
    constructor(x, y, towerType = 0) {
>>>>>>> Stashed changes
        this.radius = 5; // Größe des Turmkreises
        //towerId; // woher?
        this.color = '#1E90FF'; // Blau = gut ^^
        this.x = x; 
        this.y = y;
<<<<<<< Updated upstream
        this.type = type; 
        this.cooldownLeft = 0;

        // Fallentscheidung welchen Type der Turm hat
        if (type == 0) { 
=======
        this.towerType = towerType; 
        this.cooldownLeft = 0;

        // Fallentscheidung welchen towerType der Turm hat
        if (towerType== 0) { 
>>>>>>> Stashed changes
            // Standardturm
            this.damage = 1;
            this.price = 10;
            this.speed = 10;
            this.range = 10;
            this.cooldown = 30; // 30 = 1 Sekunde, dann durch Updates herabsetzbar
            this.particlesPerShot = 1;
        } 
    }

<<<<<<< Updated upstream
    shoot(amount = 1) {
        // Anzahl von Partikeln wird erzeugt mit Tower Koordinaten
        if (this.isFireReady() == true) {
            for (var i = 1; i <= amount; i++) {
                var particle = new Particle.create(this.x, this.y); // schauen ob Create zu Particle passt
=======
    shoot(enemy, amount = 1) {
        // Anzahl von Partikeln wird erzeugt mit Tower Koordinaten wenn Enemy in Reichweite, und Feuerbereit
        if ((this.isFireReady() == true)&&(this.searchEnemy() != false)) {
            for (var i = 1; i <= amount; i++) {

                var particle = new Particle(this.x, this.y, enemy);
>>>>>>> Stashed changes
            }
            this.cooldownLeft = this.cooldown; // Cooldown wieder hochgesetzt
        } 
    }

    update() {
        // Schaut ob der Tower wieder schießbereit ist, wenn ja, schauen ob Gegner in Reichweite, wenn ja Partikel erzeugen (= schiessen)
        if (this.isFireReady() == true) {
            enemy = this.enemyInRange(); // Bekommt wenn vorhanden enemy übergeben

            // Wenn Gegner in Reicheweite, dann schießen
            if (enemy != false) {
                // Schiessen
                this.shoot();
            }
        } else {
            // noch nicht Feuerbereit, cooldown left runterzählen
            this.cooldownLeft--;
        }
    }

    // +++ Schauen ob man später vllt Höchstgrenzen von Upgrades setzt, oder Prozentual upgraded, oder direkt größere Schritte macht +++
    
    upgradeDamage(value = 1) {
        // Upgrade von Schaden
        this.damage += value;
    }

    upgradeRange(value = 1) {
        // Upgrade von Reichweite
        this.range += value;
    }

    upgradeSpeed(value = 1) {
        // Upgrade von Schussgeschwindigkeit
        if ((this.cooldown > 1)&&((this.cooldown - value)>0)) {
            this.cooldown -= value;
        }
    }

    upgradeAmountParticlesPerShot(value = 1) {
        // Upgrade Projektilanzahl pro Schuss
        this.particlesPerShot += value;
    }

    draw() {
        // Zeichnet den Kreis des Turms
<<<<<<< Updated upstream
        Game.drawCircle(this.x, this.y, this.radius, this.color)
=======
        Helper.drawCircle(this.x, this.y, this.radius, this.color)
>>>>>>> Stashed changes
    }

    isFireReady() {
        // Prüfen ob der Turm schon Feuerbereit ist (cooldownLeft == 0)
        if (this.cooldownLeft == 0) {
            return true;
        } else {
            return false;
        }
    }

<<<<<<< Updated upstream
    /*
    enemyInRange() {
        // Fragt bei Entities an, ob enemy in Reichweite ist, bekommt Enemy als objekt zurück
        // Übergibt die aktuelle Towerposition, und die Reicheweite mit
        // Return Enemy Objekt oder false
    }
    */

=======
>>>>>>> Stashed changes
}