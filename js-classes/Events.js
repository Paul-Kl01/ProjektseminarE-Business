class events {
  constructor(canvas, context) {
    this.canvas = canvas;
    this.context = context;
    // this.mouse = {
    //   x: 0,
    //   y: 0,
    //   clicked: false    
    // }
  }
    // onmove = (event) => {
    //   this.mouse.x = event.offsetX;
    //   this.mouse.y = event.offsetY;
    // }

    //  onclick = (e) => {
    //   this.mouse.clicked = true;
    // }

    // update = () => {
    //   this.mouse.clicked = false;
    // }
  


  getMousePosition = () => {
    canvas.addEventListener("mousemove", function (e) {
      console.log("Test");
      var cRect = canvas.getBoundingClientRect(); // Gets CSS pos, and width/height
      var canvasX = Math.round(e.clientX - cRect.left); // Subtract the 'left' of the canvas
      var canvasY = Math.round(e.clientY - cRect.top); // from the X/Y positions to make
      ctx.clearRect(0, 0, canvas.width, canvas.height); // (0,0) the top left of the canvas
      ctx.fillText("X: " + canvasX + ", Y: " + canvasY, 10, 20);
      console.log(canvasX, canvasY);
    });
  };
}

module.exports = events;
