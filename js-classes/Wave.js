/*
 * Verwaltung der Waves im Spiel
 * @author Nicole
 *
 */

//Notiz: Es müsste evtl. noch umgesetzt werden, dass Enemies "häufichenweise" spawnen, also nicht alle hintereinander weg?

class wave {
    constructor(entities) {
        this.entities = entities //Sicherstellen, dass Game und Wave die selbe Instanz von Entities nutzen
        this.currentWave = 1 //Aktuelle Wave ingame
        this.amountOfEnemies = Math.pow(2, this.currentWave) //Initalwert für Enemyanzahl 2^1 = 2
        this.enemyGroup = 6
        this.enemySpawnCooldown = 1 //Damit Enemies nicht alle direkt ohne Abstand hintereinnander spawnen
        this.enemyGroupCoolDown = 0 //Initialwert
        //this.isStarting = false //Boolean um zu markieren, wann neue Wave startet

    }

    update(){ //Update um Klassenvariablen anzupassen
        //Neue Wave muss getriggert werden
        // if(this.isStarting) {
        //     this.nextWave();
        // }

        if(this.amountOfEnemies > 0) { //Solange amount > 0, Enemies erstellen lassen
            if(this.currentWave > 5) {
                //Extra Parameter, damit Enemies zufällig stärker werden können
                this.initialiseEnemies(this.getRndInteger(0,2)); //Erstmal Typ 0,1 & 2, sind das zu viele oder zu wenige Typen?
            }
            else {this.initialiseEnemies();}
        }
        
    }

    initialiseEnemies(enemyStrength = 0) { //Typ 0 als default Enemy?
    //ruft create-method der Klasse Entities auf, um Enemies zu erzeugen
        if(this.enemyGroup > 0 && this.enemyGroupCoolDown == 0) { //Enemies dürfen ganz normal gespawnt werden
            if(this.enemySpawnCooldown > 0) {
                this.enemySpawnCooldown--;
            }
            else{ //in create als zusätzlichen Parameter: enemyStrength übergeben!
                this.entities.createEnemy(enemyStrength);//CreateMethode der EnemyTyp übergeben wird
                //Neuen Cooldown random setzten
                this.enemySpawnCooldown = this.getRndInteger(25,200);
                this.amountOfEnemies--;
                this.enemyGroup--;
            }
        }

        else if(this.enemyGroup == 0 && this.enemyGroupCoolDown == 0) {
            //Werte zurücksetzen
            this.enemyGroupCoolDown = 50; //Cooldown bis neue Gruppe an Enemies spawnen kann
            this.enemyGroup = 6;
        }
        else if(this.enemyGroupCoolDown > 0) {
            //Cooldown damit neue Gruppe an Enemies spawnen kann runterzählen
            this.enemyGroupCoolDown--;

        }
    }
    
    nextWave() { //Klassenvariablen für die nächste Wave vorbereiten
        this.currentWave++;
        //EnemyAnzahl exponentiell erhöhen...
        this.enemySpawnCooldown = this.getRndInteger(25,250);
        //this.amountOfEnemies = this.currentWave * 6;
        this.amountOfEnemies = Math.pow(2, this.currentWave) // 2^(currentWave)
        this.enemyGroupCoolDown = 0;
        this.enemyGroup = 6;
        //this.isStarting = false; //Wert wieder zurücksetzten
        this.update();
        //Später noch Stärke der Enemies anpassen...bzw. andere Enemytypen übergeben
    }

    //Markierung, dass nächste Wave starten soll
    // triggerNextWave() {
    //     this.isStarting = true;
    //     this.update();
    // }

    //Random Zahl für bestimmtes Intervall generieren (min & max sind im Intervall inklusive)
    getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1) ) + min;
    }
}

module.exports = wave;
