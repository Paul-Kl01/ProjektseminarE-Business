
class Helper{
    
static detectDistance(x1,y1,x2,y2){

    //Abstand zwischen zwei Punkten d = Wurzel( (x1-x2)^2 + (y1-y2)^2 )
    var a = x1-x2; 
    var b = y1-y2; 
    return Math.sqrt(a*a + b*b)
}

}