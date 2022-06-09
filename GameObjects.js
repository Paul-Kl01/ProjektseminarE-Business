const Helper = require('./Helper')
var helpers = new Helper();

class GameObject {
    
constructor(x,y,radius,color){
    this.x = x; 
    this.y = y; 
    this.radius = radius; 
    this.color = color; 
//this.objecttype = objecttype // 0 Enemy 1 Tower 2 Particle
}

create(){}

draw(){
    Helper.drawCircle(this.x, this.y, this.radius, this.color)
}
update(){}

}

module.exports = GameObject; 