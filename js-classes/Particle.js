/*
 * Partikelerzeugung zum Abschießen der Enemies
 * @author Nicole
 *
 */

//Imports und Instanzerzeugung
const gameObject = require('./GameObject')
const enemy = require('./Enemy')
const helper = require('./Helper')
const tower = require('./Tower')
var gameObject_ = new gameObject();
var enemy_;
var helpers_ = new helper();
var tower_;

class particle extends gameObject_{
    //eigene Klassen-Referenz auf canvas & context, da auf Game kein Zugriff
    // canvas = document.getElementById("canvas");
    // ctx = this.canvas.getContext("2d");

    constructor (towerX, towerY, closestEnemy) { //Über tower.js aufzurufen
        //eventuell Referenz auf Tower übergeben und daraus die Koordinaten ziehen, wegen dem Exportieren & Importieren von Klasse?
        enemy_ = closestEnemy //wahrscheinlich unnötig?

        this.x = towerX //Als Startposition Koordinaten des jeweiligen Turms
        this.y = towerY
        this.velocity = {x: 0, y: 0}
        this.color = "#483d8b"
        this.radius = 1
        this.focusedEnemy = enemy_ //Referenziert später Enemy der fokussiert werden soll
    }

    update() { //Klassenvariablen updaten
        if(helpers_.detectCollsision(this.x, this.y, this.radius, this.focusedEnemy.x, this.focusedEnemy.y, this.focusedEnemy.radius)) {
            enemy_.hit() //Enemy bekommt Schaden übergeben
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
        helpers_.drawCircle(this.x, this.y, this.radius, this.color)
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
	// 	this.ctx.lineTo(this.focusedEnemy.x, this.focusedEnemy.y);
	// 	this.ctx.stroke();
	// 	this.ctx.restore();
    //     this.update;
    // }

    /*Enemies bewegen sich, Path zum Enemy muss immer wieder aktualisiert werden
     *Bis Enemy getroffen wurde vom Particle
     */
    calcPathToEnemy() { //Müsste im Rahmen der TowerKlasse nach Konsturktor-Aufruf des Particles einmal initial aufgerufen werden
        const angle = Math.atan2(closestEnemy.y - this.y , closestEnemy.x - this.x) //Bestimmt den Winkel zwischen Enemy & Particle
        this.velocity = { //Bestimmt Ratio anhand welcher Particle zum Enemy gepusht wird und speichert dies in der velocity
            x: Math.cos(angle),
            y: Math.sin(angle)
        }
        this.update //Position des Particles entsprechend updaten
    }
}

module.exports = particle;