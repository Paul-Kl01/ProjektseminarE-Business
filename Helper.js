
class Helper{
    
static detectDistance(x1,y1,x2,y2){

    //Abstand zwischen zwei Punkten d = Wurzel( (x1-x2)^2 + (y1-y2)^2 )
    var a = x1-x2; 
    var b = y1-y2; 
    return Math.sqrt(a*a + b*b)
}

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
    //Kreis zeichnen
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    //Kreis ausmalen
    ctx.fillStyle = color;
    ctx.fill();
  }

}