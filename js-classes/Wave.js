// import Entities from './Enitites.js'
// import Map from './Map.js'

const entities = require('./Entities')
const map = require('./Map')
var map_ = new map();
var entities_ = new entities();

class wave {
    constructor() {
        this.currentWave = 1
        this.amountOfEnemies = 5
        this.enemySpwanCooldown = 1
        this.enemyStartPos = map_.initalEnemyPos//Muss Map-spezifisch sein, also aus der Klasse Map zu entnehmen
    }

    update(){ //Update um Klassenvariablen anzupassen
        if(this.amountOfEnemies > 0) {
            this.initialiseEnemies
        }
        //this.currentWave++
        //EnemyAnzahl erhöhen...
        //Später noch Stärke der Enemies anpassen...
    }

    initialiseEnemies() {
    //ruft create-method der Klasse Entities auf, um Enemies zu erzeugen
        if(this.enemySpwanCooldown > 0) {
            this.enemySpwanCooldown--
        }
        else{
            entities_.create('Enemy') //(this.enemyStartPos) StartPosition der Enemies muss mitübergeben werden
            this.enemySpwanCooldown = 1
            this.amountOfEnemies--
        }
    }    
}

module.exports = wave;