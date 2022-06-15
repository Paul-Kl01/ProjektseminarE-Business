// const Tower = require('./Tower');
const Enemy = require('./Enemy');
const Helper = require('./Helper');
var helpers = new Helper();

class Entities {
  //constructor(canvas, ctx, startingPoint, waypoints) {
    //this.canvas = canvas; 
    //this.ctx = ctx; 
    //this.startingPoint = startingPoint; 
    //this.waypoints = waypoints; 
    //this.enemyList = [];
    //this.towerList = [];
    //this.enemyCounter = 0;
    //this.towerCounter = 0;
  //}

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

create_enemy(){
  var enemy = new Enemy(this.canvas, this.ctx, this.waypoints, this.startingPoint);
  var id = this.enemyCounter++;
  this.enemyList[id] = enemy;
  console.log(this.enemyList);
}

create_tower(x,y){
  //var tower = new Tower(x, y);
  //var id = this.towerCounter++;
  //this.towerList[id] = tower;
  //console.log(this.towerList);
}//


  detect_enemy() {
    //leitet den Enemy, der in Towerrange ist und am meisten Weg zurück gelegt hat, an den entsp. schussbereiten Tower weiter

    for (let j = 0; j < this.towerList.length; j++) {
      //Tower schussbereit?
      if (this.towerList[i].cooldownleft !== 0) continue;
      let last_enemy;

      for (let i = 0; i < this.enemyList.length; i++) {
        //Enmie schon tot?
        if ((this.enemyList[j].dead == true)) continue;
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

        if (bool = true) {
          //wenn erster der in Reichweite-> als Vergleichswert(last_enemie) zw.speichern
          if (last_enemy === undefined) {
            last_enemy = this.enemyList[i];
          }
        }
        //sonst Abgleich ob zurück gelegter Weg des aktuellen Enemy größer als bei Vergleichs-Enemie;
        else {
          if (this.enemyList[i].covered_distance > last_enemy.covered_distance) {
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
        if ((this.enemyList[j].dead == true)) continue;
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

        if ((bool == true)) {
          this.towerList[j].shoot(this.enemyList[j]);
          //Weiter Prüfen mit nächstem Tower
          break;
        }
      }
    }
  }

  validate_position(x,y,radius){

    //für alle tower -> detectCollision mit x,y,r des zu bauenden und x,y,r des ausgelesen Tower
    for (let j = 0; j < this.towerList.length; j++) {
      let bool = helpers.detectCollision(
        this.towerList[j].x,
        this.towerList[j].y,
        this.towerList[j].radius,
        x,
        y,
        radius, 
      );
      if (bool == true) return false; 
    }

//detectCollision Für alle Punkt der Map prüfen 
    for (let i =-1; i < this.waypoints.length; i++) {

     //Für Starting Point
      if (i == -1){
        var x1 = this.startingPoint[0][0];
        var y1 = this.startingPoint[0][1];
      }
      //auslesen aktueller/start waypoint x1, y1
      else {
        var  x1 = this.waypoints[i][0];
        var  y1 = this.waypoints[i][1];
      }

	    //auslesen nächster waypint i+1
 	    var x2 = this.waypoints[i+1][0];
      var y2 = this.waypoints[i+1][1];

      //Richtungsbestimmung
      var start, finish, change_x; 
      if (x1 < x2) { // Osten, rechts 
        start = x1; 
        finish = x2; 
        change_x = true; 
      }
      else if (x1 > x2){   //Westen, links
        start = x2;
        finish = x1; 
        change_x = true; 
      }
      else if (y1 < y2){ //Süden, unten
        start = y1; 
        finish = y2; 
        change_x = false; 
      }
      else if (y1 > y2){
	      start = y2; 
        finish = y1; 
        change_x = false; 
      }
 	
      //Prüfen aller Punkte der Map zwischen aktuellem und nächstem Waypoint
	    for (let j = start; j < finish; j++) {

        let bool;
		    if (change_x == true)  bool = helpers.detectCollision(j,y1,50,x,y,radius); 
        else bool = helpers.detectCollision(x1,j, 50, x, y, radius);
        if (bool == true) return false; 
      }		
    }//End Waypoint Schleife
    return true; 
  }
}

module.exports = Entities;
