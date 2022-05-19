import "helper.js";
import "entities.js";
import "enemy.js";

class Particle {
    constructor (towerX, towerY, closestEnemy) { //Über tower.js aufzurufen
        this.x = towerX //Als Startposition Koordinaten des jeweiligen Turms
        this.y = towerY
        this.velocity = {x: 0, y: 0}
        this.color = "#483d8b"
        this.radius = 1
        this.focusedEnemy = closestEnemy //Referenziert später Enemy die fokussiert werden soll
    }

    update() { //Klassenvariablen updaten
        if(entities.detectCollsision()) {
            enemy.hit() //Enemy bekommt Schaden übergeben
        }
        this.draw()
        this.x = this.x + this.velocity.x //Bewegung updaten
        this.y = this.y + this.velocity.y 
        //Geschwindigkeit, mit der sich Partikel bewegt evtl. erhöhen 
        //Dafür Multiplikation mit Skalar
        this.calcPathToEnemy() //Da Enemy sich bewegt, muss Bewegungsrichtung des Particles immer wieder angepasst werden
    }

    draw() { //Particle jeweils auf canvas zeichnen
        helper.drawCircle(this.x, this.y, this.radius, this.color)
    }

    /*PROBLEM: Enemies bewegen sich, Path zum Enemy muss immer wieder aktualisiert werden
     *Bis Enemy getroffen wurde vom Particle
     */
    calcPathToEnemy() { //Müsste im Rahmen der TowerKlasse nach Konsturktor-Aufruf des Particles einmal inizial aufgerufen werden
        const angle = Math.atan2(closestEnemy.y - this.y , closestEnemy.x - this.x) //Bestimmt den Winkel zwischen Enemy & Particle
        this.velocity = { //Bestimmt Ratio anhand welcher Particle zum Enemy gepusht wird und speichert dies in der velocity
            x: Math.cos(angle),
            y: Math.sin(angle)
        }
        this.update //Position des Particles entsprechend updaten
    }
}