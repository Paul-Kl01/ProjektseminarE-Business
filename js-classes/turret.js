// import Particle from './Particle';
// import Entities from './Entities';
// import Game from "./game";
class tower {

    constructor(x, y, type = 0) {
        this.radius = 25; // Größe des Turmkreises
        //towerId; // woher?
        this.color = '#1E90FF'; // Blau = gut ^^
        this.x = x; 
        this.y = y;
        this.type = type; 
        this.cooldown = 20; //20 = 1 Sekunde, dann durch Updates herabsetzbar
        this.cooldownLeft = 0;
        this.canvas = document.getElementById("canvas");
        this.ctx = this.canvas.getContext('2d');

        // Fallentscheidung welchen Type der Turm hat
        if (type == 0) { 
            // Standardturm
            this.damage = 1;
            this.price = 10;
            this.speed = 10;
            this.range = 10;
        } 
    }

    shoot = (amount) => {
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

    draw = () => {
        this.drawCircle(this.x, this.y, this.radius, this.color);
    }
    drawCircle = (x, y, radius, color) => {
        this.ctx.beginPath();
    
        //Kreis zeichnen
        this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
        //Kreis ausmalen
        this.ctx.fillStyle = color;
        this.ctx.fill();
      }

    isFireReady() {
        if (this.cooldownLeft == 0) {
            return true;
        } else {
            return false;
        }
    }
}
module.exports = tower;