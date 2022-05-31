import Entities from './Enitites.js'
import Map from './Map.js'

export default class Wave {
    constructor() {
        this.currentWave = 1
        this.amountOfEnemies = 5
        this.enemySpwanCooldown = 2 //Als Anfangswert einfach mal 2 genommen
        this.enemyStartPos = {x, y} //Muss Map-spezifisch sein, also aus der Klasse Map zu entnehmen
    }

    update = () => {
        //Update um Klassenvariablen anzupassen
        this.currentWave++
        //EnemyAnzahl erhöhen...
        //Cooldown zurücksetzten...
        //Später noch Stärke der Enemies anpassen...
    }

    initialiseEnemies = () => {
        //Enemies sollten am besten weit abseits der Map gespwant werden, damit Array mit Enemies für
        //die aktuelle Welle gefüllt ist, da sonst alle anderen Prozesse auf das Spawnen von Enemies warten müssen

        //Startposition der Enemies abhänging von der Map definieren
        this.enemyStartPos = Map.initalEnemyPos
        //Startposition muss nun weit außerhalb der Map liegen bzgl x-Koordinate, damit Enemies nicht direkt Map (sichtbar) betreten
        this.enemyStartPos = {x: this.enemyStartPos.x - 2000, y: this.enemyStartPos.y} //2000 als erster Testwert

        //ruft create-method der Klasse Entities auf, um Enemies zu erzeugen
        for(i = 0; i < amountOfEnemies; i++) {
            if(this.enemySpwanCooldown > 0) {
                i--
                this.enemySpwanCooldown--
            }
            else{
                Entities.create('Enemy', this.enemyStartPos) //StartPosition der Enemies muss mitübergeben werden
                this.enemySpwanCooldown = 2
            }
        }
    }
}