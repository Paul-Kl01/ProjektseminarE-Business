// import Game from './Game';
// import Helper from './Helper';

class Map {

    constructor(roadColor, mapBackground, waypoints, initalEnemyPos) {
        this.waypoints = [];
        this.mapBackground = mapBackground; 
        this.roadColor = roadColor;
        //this.initalEnemyPos = {x,y}; // Einfügen aus Enemy
    }

    draw() {
        var canvas = document.getElementById("canvas");
        var ctx = canvas.getContext("2d");

        ctx.fillStyle = this.mapBackground;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Vereinfachten Path zeichnen
        ctx.beginPath();
        ctx.strokeStyle = this.roadColor;
        ctx.moveTo(0,60);
        ctx.lineTo(800, 60);
        ctx.moveTo(800, 60);
        ctx.lineTo(800, 200);
        ctx.moveTo(800, 200);
        ctx.lineTo(200, 200);
        ctx.moveTo(200, 500);
        ctx.lineTo(200, 200);
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.fill();
        // Waypoints (800,60),(800,200),(200,500)
 
    }
}

const map = new Map("#F08080", "#eee");
map.draw();
console.log(map);