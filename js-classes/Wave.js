/*
 * Verwaltung der Waves im Spiel
 * @author Nicole
 *
 */

//Notiz: Es müsste evtl. noch umgesetzt werden, dass Enemies "häufichenweise" spawnen, also nicht alle hintereinander weg?

class wave {
    constructor(entities, canvas, ctx) {
        this.entities = entities //Sicherstellen, dass Game und Wave die selbe Instanz von Entities nutzen
        this.currentWave = 1 //Aktuelle Wave ingame
        this.amountOfEnemies = 6 //Initalwert für Enemyanzahl
        this.enemySpwanCooldown = 1 //Damit Enemies nicht alle direkt ohne Abstand hintereinnander spawnen
        this.isStarting = false //Boolean um zu markieren, wann neue Wave startet
        this.canvas = canvas
        this.ctx = ctx
    }

    update(){ //Update um Klassenvariablen anzupassen
        if(this.amountOfEnemies > 0) { //Solange amount > 0, Enemies erstellen lassen
            this.initialiseEnemies()
        }
        //Neue Wave muss getriggert werden
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
            this.entities.create_enemy(this.canvas, this.ctx);
            //Neuen Cooldown random setzten
            this.enemySpwanCooldown = this.getRndInteger(50,500)
            this.amountOfEnemies--
        }
    }
    
    nextWave() { //Klassenvariablen für die nächste Wave vorbereiten
        this.currentWave++
        //EnemyAnzahl exponentiell erhöhen...
        this.enemySpwanCooldown = this.getRndInteger(50,500)
        this.isStarting = false; //Wert wieder zurücksetzten
        this.update()
        //Später noch Stärke der Enemies anpassen...bzw. andere Enemytypen übergeben
    }

    //Markierung, dass nächste Wave starten soll
    triggerNextWave() {
        this.isStarting = true
    }

    //Random Zahl für bestimmtes Intervall generieren (min & max sind im Intervall inklusive)
    getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1) ) + min;
    }
}

module.exports = wave;
