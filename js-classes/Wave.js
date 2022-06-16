/*
 * Verwaltung der Waves im Spiel
 * @author Nicole
 *
 */

//Notiz: Es müsste evtl. noch umgesetzt werden, dass Enemies "häufichenweise" spawnen, also nicht alle hintereinander weg?

//Imports und Instanzerzeugung
class wave { //Referenz auf Entitiesinstanz von Game übergeben
    constructor(entities, startingPoint, canvas, ctx, waypoints) {
        this.entities = entities //Sicherstellen, dass Game und Wave die selbe Instanz von Entities nutzen
        this.currentWave = 1 //Akt. Wave in-game
        this.amountOfEnemies = 5 //Initalwert für Enemyanzahl
        this.enemySpwanCooldown = 1 //Damit Enemies nicht alle direkt ohne Abstand hintereinnander spwanen
        this.enemyStartPos = startingPoint //Muss Map-spezifisch sein, also aus der Klasse Map zu entnehmen
        this.isStarting = false //Boolean um zu markieren, wann neue Wave startet
        this.canvas = canvas
        this.ctx = ctx
        this.waypoints = waypoints
    }

    update(){ //Update um Klassenvariablen anzupassen
        if(this.amountOfEnemies > 0) { //Solange amount > 0, Enemies erstellen lassen
            this.initialiseEnemies()
        }
        //Neue Wave muss getriggert werden, irgendwie über Game und dem Ablauf des Timers bis zur nächsten Welle
        if(this.isStarting) {
            this.nextWave()
        }
    }

    initialiseEnemies() {
    //ruft create-method der Klasse Entities auf, um Enemies zu erzeugen
        if(this.enemySpwanCooldown > 0) {
            this.enemySpwanCooldown--
        }
        else{
            this.entities.create(this.canvas, this.ctx, this.waypoints, this.enemyStartPos, 0); //(this.enemyStartPos) StartPosition der Enemies muss mitübergeben werden
            //Neuen Cooldown random setzten
            this.enemySpwanCooldown = this.getRndInteger(500,5000)
            this.amountOfEnemies--
        }
    }
    
    nextWave() { //Klassenvariablen für die nächste Wave vorbereiten
        this.currentWave++
        //EnemyAnzahl exponentiell erhöhen...
        this.enemySpwanCooldown = this.getRndInteger(500,5000)
        this.update()
        //Später noch Stärke der Enemies anpassen...
    }

    //Markierung, dass nächste Wave starten soll
    //muss getriggert werden, irgendwie über Game und dem Ablauf des Timers bis zur nächsten Welle
    triggerNextWave() {
        this.isStarting = true
    }

    //Random Zahl für bestimmtes Intervall generieren (min & max sind im Intervall inklusive)
    getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1) ) + min;
    }
}

module.exports = wave;