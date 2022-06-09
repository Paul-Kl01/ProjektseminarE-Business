
class Helper{


  //constructor(canvas,ctx ){
    //this.canvas = canvas; 
    //this.ctx = ctx;
  //}
  //constructor(){
    //this.canvas = document.getElementById("canvas");
    //this.ctx = this.canvas.getContext("2d");
  //}


//detectDistance(x1,y1,x2,y2){    
static detectDistance(x1,y1,x2,y2){

    //Abstand zwischen zwei Punkten d = Wurzel( (x1-x2)^2 + (y1-y2)^2 )
    var a = x1-x2; 
    var b = y1-y2; 
    return Math.sqrt(a*a + b*b);
}

//detectCollision(x1,y1,r1,x2,y2,r2){
static detectCollision(x1,y1,r1,x2,y2,r2){
  //wenn der abstand zw. den beiden Mittelpunkten
  //kleiner/gleich die Summer der beiden Radien -> return true

      var distance = Helper.detectDistance(x1, y1, x2, y2); 
      if (distance <= (r1+r2)){
          return true; 
      }
      return false; 
  }


static drawCircle(x, y, radius, color) {
    //Kreis zeichnen für Anzeige Reichweite/GameObjects
    //mit Koordinaten x,y ; Radius;  Farbe

    //jedes Mal Holen Canavas, ctx oder im Konstruktor übergeben
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");

    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(x, y, radius, 0,  2 * Math.PI, false);
    ctx.fill();
    ctx.closePath(); 
  }

  //drawCircle = (x, y, radius, color) => {
    //this.ctx.beginPath();
    //this.ctx.fillStyle = color;
    //this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
    //this.ctx.fill();
    //this.ctx.closePath(); 
  //}

}
module.exports = Helper; 