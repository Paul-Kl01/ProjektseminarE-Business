/*
 * Partikelerzeugung zum Abschießen der Enemies
 * @author Nicole
 *
 */

//Imports und Instanzerzeugung
// const gameObject = require('./GameObject')
const enemy = require('./Enemy')
const helper = require('./Helper')
const tower = require('./tower')

class particle{
    constructor(tower, closestEnemy) { //Über tower.js aufzurufen
        //eventuell Referenz auf Tower übergeben und daraus die Koordinaten ziehen, wegen dem Exportieren & Importieren von Klasse?
        this.tower = tower
        this.enemy = closestEnemy //wahrscheinlich unnötig?
        this.x = this.tower.x //Als Startposition Koordinaten des jeweiligen Turms
        this.y = this.tower.y
        this.velocity = {x: 0, y: 0}
        this.color = "#483d8b"
        this.radius = 1
        this.damage = this.tower.damage //Turmschaden
    }

    update() { //Klassenvariablen updaten
        if(entities.detectCollsision(this.x, this.y, this.radius, this.enemy.x, this.enemy.y, this.enemy.radius)) {
            this.enemy.hit() //Enemy bekommt Schaden übergeben
            //Anschließend muss Partikel entfernt werden
        }
        this.draw()
        this.x = this.x + this.velocity.x //Bewegung updaten
        this.y = this.y + this.velocity.y 
        //Geschwindigkeit, mit der sich Partikel bewegt evtl. erhöhen 
        //Dafür Multiplikation mit Skalar
        this.calcPathToEnemy() //Da Enemy sich bewegt, muss Bewegungsrichtung des Particles immer wieder angepasst werden
    }

    draw() { //Particle jeweils auf canvas zeichnen
        //helpers_.drawCircle(this.x, this.y, this.radius, this.color)
    }

    //Partikel als "Laser" sorgt dafür, dass mein restlichen Code direkt vollkommen unnötig wird,
    //man bräuchte nur noch diese eine Methode & Konstruktor
    // pathToEnemy = () => {
    //     //Partikel als "Laser" implementieren
    //     this.ctx.save()
    //     this.ctx.beginPath()
    //     this.ctx.strokeStyle = 'white';
	// 	this.ctx.lineWidth = 1;
    //     this.ctx.moveTo(this.x, this.y);
	// 	this.ctx.lineTo(this.enemy.x, this.enemy.y);
	// 	this.ctx.stroke();
	// 	this.ctx.restore();
    //     this.update;
    // }

    /*Enemies bewegen sich, Path zum Enemy muss immer wieder aktualisiert werden
     *Bis Enemy getroffen wurde vom Particle
     */
    calcPathToEnemy() { //Müsste im Rahmen der TowerKlasse nach Konsturktor-Aufruf des Particles einmal initial aufgerufen werden
        const angle = Math.atan2(this.enemy.y - this.y , this.enemy.x - this.x) //Bestimmt den Winkel zwischen Enemy & Particle
        this.velocity = { //Bestimmt Ratio anhand welcher Particle zum Enemy gepusht wird und speichert dies in der velocity
            x: Math.cos(angle),
            y: Math.sin(angle)
        }
        this.update //Position des Particles entsprechend updaten
    }
}

module.exports = particle;