/*
 * Verwaltung der Waves im Spiel
 * @author Nicole
 *
 */

//Notiz: Es müsste evtl. noch umgesetzt werden, dass Enemies "häufichenweise" spawnen, also nicht alle hintereinander weg?

//Imports und Instanzerzeugung
class wave { //Referenz auf Entitiesinstanz von Game übergeben
    constructor(entities, canvas, ctx) {
        this.entities = entities //Sicherstellen, dass Game und Wave die selbe Instanz von Entities nutzen
        this.currentWave = 1 //Akt. Wave in-game
        this.amountOfEnemies = 6 //Initalwert für Enemyanzahl
        this.enemySpwanCooldown = 1 //Damit Enemies nicht alle direkt ohne Abstand hintereinnander spwanen
        this.isStarting = false //Boolean um zu markieren, wann neue Wave startet
        this.canvas = canvas
        this.ctx = ctx
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
            this.entities.create_enemy(this.canvas, this.ctx); //(this.enemyStartPos) StartPosition der Enemies muss mitübergeben werden
            //Neuen Cooldown random setzten
            this.enemySpwanCooldown = this.getRndInteger(50,500)
            this.amountOfEnemies--
        }
    }
    
    nextWave() { //Klassenvariablen für die nächste Wave vorbereiten
        this.currentWave++
        //EnemyAnzahl exponentiell erhöhen...
        this.enemySpwanCooldown = this.getRndInteger(50,500)
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