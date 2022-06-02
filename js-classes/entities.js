class entities {
  constructor() {
    this.enemyList = [];
    this.towerList = [];
    this.enemyCounter = 0;
    this.towerCounter = 0;
  }

  draw() {
    //von jeden Enemy/Tower wird die Draw() Funktion aufgerufen
    for (let i = 0; i < this.enemyList.length; i++) this.enemyList[i].draw();
    for (let j = 0; j < this.towerList.length; j++) this.towerList[j].draw();
  }

  update() {
    //von jeden Enemy/Tower wird die Update() Funktion aufgerufen
    for (let i = 0; i < this.enemyList.length; i++) this.enemyList[i].update();
    for (let j = 0; j < this.towerList.length; j++) this.towerList[j].update();
  }

  create(x, y, radius, color, type) {
    //type zur Fallunterscheidung welche Art von Entität; 0 Enemy, 1 Tower
    var id;
    switch (type) {
      case "0":
        id: ++this.enemyCounter;
        break;

      case "1":
        id: ++this.towerCounter;
    }

    //Entity Typ erstellen
    var entity = {
      id: id,
      type: type,
      x: x,
      y: y,
      r: r,
      color: color,
      draw: function () {
        game.drawCircle(this.x, this.y, this.radius, this.color);
      },
      update: function () {},
    };

    //Entity zur entsprechenden Liste hinzufügen
    switch (type) {
      case "0":
        this.enemyList[entity.id] = entity;
        break;

      case "1":
        this.towerList[entity.id] = entity;
    }
  }

  detectCollision(x1, y1, r1, x2, y2, r2) {
    //wenn der abstand zw. den beiden Mittelpunkten
    //kleiner/gleich die Summer der beiden Radien -> return true

    var distance = Helper.detectDistance(x1, y1, x2, y2);
    if (distance <= r1 + r2) {
      return true;
    }
    return false;
  }

  //detectCollision(entity1, entity2){
  //    var a = entity1.radius + entity2.radius;
  //    var distance = Helper.detectDistance(entity1.x, entity1.y, entity2.x, entity2.y);
  //    if (distance <= a){
  //        return true;
  //    }
  //    return false;
  //}
}

module.exports = entities;
