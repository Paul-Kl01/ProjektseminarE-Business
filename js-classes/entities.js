// const Tower = require('./Tower');
const Enemy = require('./Enemy');
const Helper = require('./Helper');
var helpers = new Helper();

class Entities {
  constructor() {
    this.enemyList = [];
    this.towerList = [];
    this.enemyCounter = 0;
    this.towerCounter = 0;
  }

  clear_enemyList = () => {
    this.enemyList = [];
    this.enemyCounter = 0;
  };

  draw = () => {
    //von jeden Enemy/Tower wird die Draw() Funktion aufgerufen
    for (let i = 0; i < this.enemyList.length; i++) this.enemyList[i].draw();
    for (let j = 0; j < this.towerList.length; j++) this.towerList[j].draw();
  };

  update = () => {
    //this.detect_enemy();
    // this.detect_first_enemy();
    
    //von jeden Enemy/Tower wird die Update() Funktion aufgerufen
    for (let i = 0; i < this.enemyList.length; i++) this.enemyList[i].handleEnemy();
    // for (let j = 0; j < this.towerList.length; j++) this.towerList[j].update();
  };

  create = (canvas, ctx, waypoints, startingPoint, objecttype) => {
    //objecttype zur Fallunterscheidung welche Art von Entität; 0 Enemy, 1 Tower 2 Particle
    var id;

    //Entity erzeugen und zur entsprechenden Liste hinzufügen
    switch (objecttype) {
      case 0:
        var enemy = new Enemy(canvas, ctx, waypoints, startingPoint);
        id = this.enemyCounter++;
        this.enemyList[id] = enemy;
        console.log(this.enemyList);
        break;

      case "1":
        // var tower = new Tower(x, y, r, colour);
        // id = this.towerCounter++;
        this.towerList[id] = tower;
    }
  };

  //toDo: wie heißt KlassenVar bei Enemy für zurück gelegten Weg (hier: weg)
  // Weiterleitung des vom Tower abzuschließenden Enemy: über tower.shoot(enemy)
  detect_enemy() {
    //leitet den Enemy, der in Towerrange ist und am meisten Weg zurück gelegt hat, an den entsp. schussbereiten Tower weiter

    for (let j = 0; j < this.towerList.length; j++) {
      //Tower schussbereit?
      if (this.towerList[i].cooldownleft !== 0) continue;
      let last_enemy;

      for (let i = 0; i < this.enemyList.length; i++) {
        //Enmie schon tot?
        if ((this.enemyList[j].dead = true)) continue;
        //Enemie schon anvisiert und dadurch tot?
        if (this.enemyList[j].futureDamage >= this.enemyList[j].remainingLife)
          continue;
        //Enemie in Tower Range?
        var bool = helpers.detectCollision(
          this.towerList[j].x,
          this.towerList[j].y,
          this.towerList[j].range,
          this.enemyList[i].x,
          this.enemyList[i].y,
          this.enemyList[i].radius
        );

        if ((bool = true)) {
          //wenn erster der in Reichweite-> als Vergleichswert(last_enemie) zw.speichern
          if (last_enemy === undefined) {
            last_enemy = this.enemyList[i];
          }
        }
        //sonst Abgleich ob zurück gelegter Weg des aktuellen Enemy größer als bei Vergleichs-Enemie;
        else {
          if (this.enemyList[i].weg > last_enemy.weg) {
            last_enemy = this.enemyList[i];
          }
        }
      }
      //wenn last_enemy initialisiert-> Weiterleiten an Tower
      if (last_enemy !== undefined) {
        this.towerList[j].shoot(last_enemy);
      }
    }
  }

  detect_first_enemy() {
    //einfache detect_enemy zum Testen, schießt ersten gefundenen Enemy in Range ab
    for (let j = 0; j < this.towerList.length; j++) {
      //Tower schussbereit?
      if (this.towerList[i].cooldownleft !== 0) continue;

      for (let i = 0; i < this.enemyList.length; i++) {
        //Enmie schon tot?
        if ((this.enemyList[j].dead = true)) continue;
        //Enemie schon anvisiert und dadurch tot?
        if (this.enemyList[j].futureDamage >= this.enemyList[j].remainingLife)
          continue;
        //Enemie in Tower Range?
        var bool = helpers.detectCollision(
          this.towerList[j].x,
          this.towerList[j].y,
          this.towerList[j].range,
          this.enemyList[i].x,
          this.enemyList[i].y,
          this.enemyList[i].radius
        );

        if ((bool = true)) {
          this.towerList[j].shoot(this.enemyList[j]);
          //Weiter Prüfen mit nächstem Tower
          break;
        }
      }
    }
  }
}

module.exports = Entities;
