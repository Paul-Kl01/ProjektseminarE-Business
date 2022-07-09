/*
 * Verwaltung der Waves im Spiel
 * @author Nicole
 *
 */
class wave {
    constructor(entities, mapType = 0) { //default mapType = 0
        this.currentWave = 1; //Aktuelle Wave ingame
        this.entities = entities; //Sicherstellen, dass Game und Wave die selbe Instanz von Entities nutzen
        //erster Eintrag ist Boss Gegner
        this.enemySettings = 
                [[15,"#ffd700", 1, 20, this.currentWave],
                [5,"#dc143c", 1, 1, 1],
                [5,"#d0ff14", 1.25, 4 ,1],
                [7,"#7fffd4", 1, 5, 3]];
            //radius, color, speed, lootDrop, Health

        //Skalierung je nach MapType
        if(mapType == 0) {
            this.mapType = 1;
        }
        else {
            this.mapType = 1,5;
        }
        this.amountOfEnemies = 1 * this.mapType; //Initalwert für Enemyanzahl abhängig vom mapType
        this.enemyGroup = 6;
        this.enemySpawnCooldown = 1; //Damit Enemies nicht alle direkt ohne Abstand hintereinnander spawnen
        this.enemyGroupCoolDown = 0; //Initialwert
        this.minCooldown = 10;
        this.maxCooldown = 80;
        this.currentMinCooldown = 50;
        this.currentMaxCooldown = 150;
        this.cooldownDecrement = 10;
        this.amountOfBosses = 0; //Wie viele Bosskämpfe in der aktuellen Welle
        this.maxAmountBosses = 0; //Anzahl der Bosskämpfe soll steigen
        this.currentSkaling = 8; //Wird schrittweise verringert bis this.minSkaling erreicht wird
        this.minSkaling = 2;
    }

    update(){ //Update um Klassenvariablen anzupassen
        if(this.amountOfEnemies > 0) { //Solange amount > 0, Enemies erstellen lassen
            let random = this.getRndInteger(1,10); //Randomzahl um zu bestimmen, wann Boss gespawn wird
            if(random % 2 == 0 || this.currentWave % 5 != 0 || this.amountOfBosses == 0) {
                if(this.currentWave > 5) {
                //Extra Parameter, damit Enemies zufällig stärker werden können
                this.initialiseEnemies(this.getRndInteger(1,3)); //Typ 0,1,2 & 3
                }
                // else if(this.currentWave >= 10) {
                // //Extra Parameter, damit Enemies zufällig stärker werden können
                // this.initialiseEnemies(this.getRndInteger(4,6)); //Typ 4,5 & 6
                // }
                else {this.initialiseEnemies();}
            }
            else if(this.currentWave % 5 == 0 && this.amountOfBosses > 0){
                this.initialiseEnemies(0); //Boss alle k Wellen spawnen lassen
            }
        }
    }

    initialiseEnemies(enemyStrength = 1) { //Typ 1 als default Enemy, da Typ 0 = Boss
    //ruft create-method der Klasse Entities auf, um Enemies zu erzeugen
        if(this.enemyGroup > 0 && this.enemyGroupCoolDown == 0) { //Enemies dürfen ganz normal gespawnt werden
            if(this.enemySpawnCooldown > 0) {
                this.enemySpawnCooldown--;
            }
            else{ //in create als zusätzlichen Parameter: enemyStrength übergeben!
                this.entities.createEnemy(this.enemySettings[enemyStrength]);//CreateMethode der EnemyTyp übergeben wird
                //Neuen Cooldown random setzten
                this.enemySpawnCooldown = this.getRndInteger(this.currentMinCooldown,this.currentMaxCooldown);
                this.amountOfEnemies--;
                this.enemyGroup--;
                if(enemyStrength == 0) {
                    this.amountOfBosses--;
                }
            }
        }

        else if(this.enemyGroup == 0 && this.enemyGroupCoolDown == 0) {
            //Werte zurücksetzen
            this.enemyGroupCoolDown = 20; //Cooldown bis neue Gruppe an Enemies spawnen kann
            this.enemyGroup = 6;
        }
        else if(this.enemyGroupCoolDown > 0) {
            //Cooldown damit neue Gruppe an Enemies spawnen kann runterzählen
            this.enemyGroupCoolDown--;

        }
    }
    
    nextWave() { //Klassenvariablen für die nächste Wave vorbereiten
        this.currentWave++;
        
        //Boss-Stärke erhöhen
        this.enemySettings[0][4] = this.currentWave;

        //Stärke der Enemies erhöhen
        if(this.currentWave % 10 == this.currentSkaling) {
            this.enemySettings[1][4] = (Math.floor(Math.pow((this.enemySettings[1][4] + 1),1.2)));
            this.enemySettings[3][4] = (Math.floor(Math.pow((this.enemySettings[3][4]),1.2)));

            //Bei der DefaultMap soll schneller Enemy ebenfalls hochskaliert werden
            if(this.mapType == 1) {
                this.enemySettings[2][4] = (Math.floor(Math.pow((this.enemySettings[2][4] + 1),1.2)) * this.mapType);
            }
            
            //Skalingzeitpunkt verringern
            if(this.currentSkaling > this.minSkaling) {
                this.currentSkaling--;
            }
        }

        //Anzahl der Bosskämpfe für aktuelle Welle festlegen
        if(this.currentWave % 5 == 0) {
            this.amountOfBosses = this.maxAmountBosses + 1; 
        }

        //Cooldown für Enemies verringern
        if(this.currentMaxCooldown > this.maxCooldown) {
            this.currentMaxCooldown = this.currentMaxCooldown - this.cooldownDecrement;
        }
        if(this.currentMinCooldown > this.minCooldown) {
            this.currentMinCooldown = this.currentMinCooldown - this.cooldownDecrement;
        }
        this.enemySpawnCooldown = this.getRndInteger(this.currentMinCooldown,this.currentMaxCooldown);
        
        this.amountOfEnemies = Math.floor(Math.pow((this.currentWave),1.5) * this.mapType); //(currentWave)^1,5 * mapType(1 oder 1,5) & Abrundung
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
