/*
 * Eventlistener für Turm-Bau
 * @author Constantin
 *
 */
class events {
  constructor(canvas, context) {
    this.canvas = canvas;
    this.context = context;
    this.rect = canvas.getBoundingClientRect();
    this.scaleX = this.canvas.width / this.rect.width;
    this.scaleY = this.canvas.height / this.rect.height;
    this.mouse = {
      x: 0,
      y: 0,
      clicked: false,
    };
  }
  onmove = (e) => {
    this.mouse.x = (e.clientX - this.rect.left) * this.scaleX;
    this.mouse.y = (e.clientY - this.rect.top) * this.scaleY;
  };

  onclick = (e) => {
    this.mouse.clicked = true;
  };

  update = () => {
    this.mouse.clicked = false;
  };
}

module.exports = events;
