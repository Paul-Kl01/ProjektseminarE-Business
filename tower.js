import Particle from './Particle';
import Entities from './Entities';
import Game from './Game';

class Tower extends Entities {

    constructor(x, y, type = 0) {
        this.radius = 5; // Größe des Turmkreises
        //towerId; // woher?
        this.color = '#1E90FF'; // Blau = gut ^^
        this.x = x; 
        this.y = y;
        this.type = type; 

        // Fallentscheidung welchen Type der Turm hat
        if (type == 0) { 
            // Standardturm
            this.damage = 1;
            this.price = 10;
            this.speed = 10;
            this.range = 10;
        } 
    }

    /* Übernimmt der Constructor
    create(x, y, type) {
        // *Übernimmt der Construktor
    }
    */

    // Wann entscheidet der Turm zu schießen?

    shoot(amount) {
        // Anzahl von Partikeln wird erzeugt mit Tower Koordinaten
        for (var i = 1; i <= amount; i++) {
            var particle = new Particle.create(this.x, this.y); // schauen ob Create zu Particle passt
        }
    }

    /* Keine Positionsupdates vom Tower, bleibt da wo er ist ^^
    update() {
        // Update von Position
    }
    */

    /* Gehört Abfrage ob an x,y gebaut werden kann nicht in die Map oder Game? 
    validatePosition(x, y) {
        // Turm darf nicht auf Weg oder auf Position anderer Tower stehen
    }
    */

    draw() {
        // Zeichnet den Kreis des Turms
        Game.drawCircle(this.x, this.y, this.radius, this.color)
    }
}