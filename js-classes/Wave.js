/*
 * Verwaltung der Waves im Spiel
 * @author Nicole
 *
 */
class wave {
    constructor(entities) {
        this.entities = entities; //Sicherstellen, dass Game und Wave die selbe Instanz von Entities nutzen
        this.currentWave = 1; //Aktuelle Wave ingame
        this.amountOfEnemies = 1; //Initalwert für Enemyanzahl
        this.enemyGroup = 6;
        this.enemySpawnCooldown = 1; //Damit Enemies nicht alle direkt ohne Abstand hintereinnander spawnen
        this.enemyGroupCoolDown = 0; //Initialwert
        this.minCooldown = 20;
        this.maxCooldown = 200;
        this.currentMinCooldown = 50;
        this.currentMaxCooldown = 400;
        this.cooldownDecrement = 5;
        this.amountOfBosses = 0; //Wie viele Bosskämpfe in der aktuellen Welle
        this.maxAmountBosses = 0; //Anzahl der Bosskämpfe soll steigen
    }

    update(){ //Update um Klassenvariablen anzupassen
        if(this.amountOfEnemies > 0) { //Solange amount > 0, Enemies erstellen lassen
            if(this.currentWave > 5) {
                //Extra Parameter, damit Enemies zufällig stärker werden können
                this.initialiseEnemies(this.getRndInteger(1,3)); //Typ 0,1,2 & 3
            }
            else {this.initialiseEnemies();}
        }
        else if(this.currentWave % 5 == 0 && this.amountOfBosses > 0){
            this.initialiseEnemies(0); //Boss alle 10 Wellen spawnen lassen
                this.amountOfBosses--;
        }
    }

    initialiseEnemies(enemyStrength = 1) { //Typ 1 als default Enemy, da Typ 0 = Boss
    //ruft create-method der Klasse Entities auf, um Enemies zu erzeugen
        if(this.enemyGroup > 0 && this.enemyGroupCoolDown == 0) { //Enemies dürfen ganz normal gespawnt werden
            if(this.enemySpawnCooldown > 0) {
                this.enemySpawnCooldown--;
            }
            else{ //in create als zusätzlichen Parameter: enemyStrength übergeben!
                this.entities.createEnemy(enemyStrength);//CreateMethode der EnemyTyp übergeben wird
                //Neuen Cooldown random setzten
                this.enemySpawnCooldown = this.getRndInteger(this.currentMinCooldown,this.currentMaxCooldown);
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

        if(this.currentWave % 5 == 0) {
            this.amountOfBosses = this.maxAmountBosses + 1; //Anzahl der Bosskämpfe für aktuelle Welle festlegen
        }

        //Cooldown für Enemies verringern
        if(this.currentMaxCooldown > this.maxCooldown) {
            this.currentMaxCooldown = this.currentMaxCooldown - this.cooldownDecrement;
        }
        if(this.currentMinCooldown > this.minCooldown) {
            this.currentMinCooldown = this.currentMinCooldown - this.cooldownDecrement;
        }
        this.enemySpawnCooldown = this.getRndInteger(this.currentMinCooldown,this.currentMaxCooldown);
        
        this.amountOfEnemies = Math.pow((this.currentWave),2); //(currentWave)^2
        this.enemyGroupCoolDown = 0;
        this.enemyGroup = 6;
        
        this.update();
    }

    //Random Zahl für bestimmtes Intervall generieren (min & max sind im Intervall inklusive)
    getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1) ) + min;
    }
}

module.exports = wave;
