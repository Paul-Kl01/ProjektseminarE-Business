import Particle from './Particle';
import Entities from './Entities';
import Game from './Game';

class Tower {

    constructor(x, y, type = 0) {
        this.radius = 5; // Größe des Turmkreises
        //towerId; // woher?
        this.color = '#1E90FF'; // Blau = gut ^^
        this.x = x; 
        this.y = y;
        this.type = type; 
        this.cooldown = 20; //20 = 1 Sekunde, dann durch Updates herabsetzbar
        this.cooldownLeft = 0;

        // Fallentscheidung welchen Type der Turm hat
        if (type == 0) { 
            // Standardturm
            this.damage = 1;
            this.price = 10;
            this.speed = 10;
            this.range = 10;
        } 
    }

    shoot(amount) {
        // Anzahl von Partikeln wird erzeugt mit Tower Koordinaten
        if (this.isFireReady() == true) {
            for (var i = 1; i <= amount; i++) {
                var particle = new Particle.create(this.x, this.y); // schauen ob Create zu Particle passt
            }
            this.cooldownLeft = this.cooldown; //Cooldown wieder hochgesetzt
        } 
    }

    /* Update z.B. ob er schon wieder schießbereit ist
    update() {
        // Cooldown Update bsp
    }
    */

    draw() {
        // Zeichnet den Kreis des Turms
        Game.drawCircle(this.x, this.y, this.radius, this.color)
    }

    isFireReady() {
        if (this.cooldownLeft == 0) {
            return true;
        } else {
            return false;
        }
    }
}