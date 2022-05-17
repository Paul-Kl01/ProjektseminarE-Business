import Entities from '/.Entities'
// import alle klassen

class Game {

    constructor() {
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getcontext('2d');
        this.waveCounter = 0;
        // DrawList enthält alle Elemente die gezeichnet werden sollen
        this.drawList = [];

        //Zukunft
        this.timer;
        this.mode = 0;
        this.score = 0;
        this.remainingLifes = 0;
        this.ressources = 0;

    }

    initialise() {
        // Aufruf der draw() Methoden der anderen Klassen
        setInterval(Game.update(), 1000/30);

        this.draw();
        
        
    }
    
    drawCircle(x, y, radius, color)
    {
        game.ctx.beginPath();
        
        //Kreis zeichnen
        game.ctx.arc(x, y, r, 0 , 2*Math.PI);
        //Kreis ausmalen
        game.ctx.fillStyle = color;
        game.ctx.fill();
    }
    
    draw() 
    {
        window.requestAnimationFrame(Game.draw);
        
        // Clear Canvas
        Game.ctx.clearRect(0, 0, game.canvs.width, game.canvas.height);
        
        Map.draw();
        Tower.draw();
        Enemy.draw();
        Entities.draw();
        Entities.detectCollision();

    }

    // Trigger für das Hinzufügen der Elemente in die DrawList
    trigger(event) 
    {
        
    }
}